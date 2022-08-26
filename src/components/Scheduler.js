import * as React from 'react';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  DragDropProvider,
  MonthView,
  DayView,
  Toolbar,
  DateNavigator,
  TodayButton,
  ViewSwitcher,
  CurrentTimeIndicator,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
import { useDispatch, useSelector } from 'react-redux';
import { pink, purple, teal, amber, deepOrange } from '@mui/material/colors';
import { loadingToggleAction } from '../store/actions/AuthActions';
import {
  addDocument,
  addDocumentInDb,
  getClassEvents,
  getEventsForTeacher,
  getTeachingClasses,
} from '../services/AuthService';
import { appointments, resourcesData } from '../_mock/event';
import { owners } from '../_mock/tasks';

const PREFIX = 'Demo';
export const classes = {
  container: `${PREFIX}-container`,
  text: `${PREFIX}-text`,
  formControlLabel: `${PREFIX}-formControlLabel`,
};
const StyledDiv = styled('div')(({ theme }) => ({
  [`&.${classes.container}`]: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  [`& .${classes.text}`]: theme.typography.h6,
  [`& .${classes.formControlLabel}`]: {
    ...theme.typography.caption,
    fontSize: '1rem',
  },
}));

const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
const date = `${yyyy}-${mm}-${dd}`;

const initialCurrentDate = date;
const editingOptionsList = [
  { id: 'allowAdding', text: 'Adding' },
  { id: 'allowDeleting', text: 'Deleting' },
  { id: 'allowUpdating', text: 'Updating' },
  { id: 'allowResizing', text: 'Resizing' },
  { id: 'allowDragging', text: 'Dragging' },
];
const colors = [pink, purple, teal, amber, deepOrange];

const EditingOptionsSelector = ({ options, onOptionsChange }) => (
  <StyledDiv className={classes.container}>
    <Typography className={classes.text}>Enabled Options</Typography>
    <FormGroup row>
      {editingOptionsList.map(({ id, text }) => (
        <FormControlLabel
          control={<Checkbox checked={options[id]} onChange={onOptionsChange} value={id} color="primary" />}
          classes={{ label: classes.formControlLabel }}
          label={text}
          key={id}
          disabled={(id === 'allowDragging' || id === 'allowResizing') && !options.allowUpdating}
        />
      ))}
    </FormGroup>
  </StyledDiv>
);
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
const getMyCreatedClassList = (user) => {
  const classArraylist = [];
  const classResourcelist = [];
  getTeachingClasses(user.uid).then((querySnapshot) => {
    console.log(querySnapshot.docs);
    querySnapshot.docs.forEach((doc, idx) => {
      const userData = doc.data();
      const formatedData = {
        CourseMaterialCount: userData.CourseMaterialCount,
        bannerUrl: userData.bannerUrl,
        classDescription: userData.classDescription,
        classFee: userData.classFee,
        courseMaterial: userData.courseMaterial,
        createdAt: userData.createdAt,
        creator: {
          uid: userData.creator.uid,
          name: userData.creator.name,
        },
        days: userData.days,
        name: userData.name,
        studentCount: userData.studentCount,
        studentList: userData.studentList,
        subject: userData.subject,
        videos: userData.videos,
      };
      const classRes = {
        bannerUrl: userData.bannerUrl,
        text: userData.name,
        id: idx + 1,
        classId: doc.id,
        color: colors[getRandomInt(0, querySnapshot.docs.length)],
      };
      classArraylist.push(formatedData);
      classResourcelist.push(classRes);
    });
  });
  return classResourcelist;
};

const addEventToDb = (event, dispatch, classList) => {
  console.log('banchod', classList);
  const filteredClass = classList[0].instances.filter(checkClassId);
  function checkClassId(classItem) {
    return classItem.id === event.roomId;
  }

  const payload = {
    allDay: event.allDay,
    endDate: event.endDate,
    id: event.id,
    members: event.members.length > 0 && event.members[0] ? event.members : [],
    startDate: event.startDate,
    title: event.title,
    class: {
      className: filteredClass[0].text,
      classId: filteredClass[0].classId,
      classBanarUrl: filteredClass[0].bannerUrl,
    },
    notes: event.notes,
  };
  dispatch(loadingToggleAction(true));
  addDocumentInDb(payload, 'events').then(() => {
    dispatch(loadingToggleAction(false));
  });
};

const updateEventToDb = (event) => {};

const removeEventToDb = (event) => {};

export default () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [classList, updateClassList] = React.useState([]);
  const [eventList, setEventlist] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [editingOptions, setEditingOptions] = React.useState({
    allowAdding: true,
    allowDeleting: true,
    allowUpdating: true,
    allowDragging: true,
    allowResizing: true,
  });
  const [addedAppointment, setAddedAppointment] = React.useState({});
  const [currentViewName, setCurrentViewName] = React.useState('work-week');
  const [currentDate, setCurrentDate] = React.useState(initialCurrentDate);
  const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] = React.useState(false);
  const [resources, setResources] = React.useState([
    {
      fieldName: 'roomId',
      title: 'Room',
      instances: classList,
    },
    {
      fieldName: 'members',
      title: 'Members',
      instances: owners,
      allowMultiple: true,
    },
  ]);

  React.useEffect(() => {
    const classListData = getMyCreatedClassList(user);

    const eventList = [];

    getTeachingClasses(user.uid).then((querySnapshot) => {
      querySnapshot.docs.forEach((doc, idx) => {
        const course = doc.data();
        getClassEvents(doc.id).then((queryEventSnapshot) => {
          queryEventSnapshot.docs.forEach((dock, idy) => {
            eventList.push({
              ...dock.data(),
              startDate: new Date(dock.data().startDate.seconds * 1000),
              endDate: new Date(dock.data().endDate.seconds * 1000),
            });

            if (idy === queryEventSnapshot.docs.length - 1) {
              console.log('randi', eventList);
              setData(eventList);
            }
          });
        });
      });
    });
    const localData = [...resources];
    localData[0].instances = classListData;
    setResources(localData);
  }, []);

  console.log(resources);
  console.log('🚀 ~ file: Scheduler.js ~ line 165 ~ data', data);

  const { allowAdding, allowDeleting, allowUpdating, allowResizing, allowDragging } = editingOptions;

  const onCommitChanges = React.useCallback(
    ({ added, changed, deleted }) => {
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        const addedEventObj = { id: startingAddedId, ...added };
        setData([...data, addedEventObj]);
        // add new evant:
        addEventToDb(addedEventObj, dispatch, [...resources]);
      }
      if (changed) {
        // change event:
        setData(
          data.map((appointment) =>
            changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
          )
        );
      }
      if (deleted !== undefined) {
        // dekete eveny:

        setData(data.filter((appointment) => appointment.id !== deleted));
      }
      setIsAppointmentBeingCreated(false);
    },
    [setData, setIsAppointmentBeingCreated, data]
  );
  const onAddedAppointmentChange = React.useCallback((appointment) => {
    setAddedAppointment(appointment);
    setIsAppointmentBeingCreated(true);
  });
  const handleEditingOptionsChange = React.useCallback(({ target }) => {
    const { value } = target;
    const { [value]: checked } = editingOptions;
    setEditingOptions({
      ...editingOptions,
      [value]: !checked,
    });
  });

  const TimeTableCell = React.useCallback(
    React.memo(({ onDoubleClick, ...restProps }) => (
      <WeekView.TimeTableCell {...restProps} onDoubleClick={allowAdding ? onDoubleClick : undefined} />
    )),
    [allowAdding]
  );

  const CommandButton = React.useCallback(
    ({ id, ...restProps }) => {
      if (id === 'deleteButton') {
        return <AppointmentForm.CommandButton id={id} {...restProps} disabled={!allowDeleting} />;
      }
      return <AppointmentForm.CommandButton id={id} {...restProps} />;
    },
    [allowDeleting]
  );

  const allowDrag = React.useCallback(() => allowDragging && allowUpdating, [allowDragging, allowUpdating]);
  const allowResize = React.useCallback(() => allowResizing && allowUpdating, [allowResizing, allowUpdating]);

  React.useEffect(() => {
    console.log('loggg', eventList);
  }, [eventList]);
  return (
    <>
      {/* <EditingOptionsSelector options={editingOptions} onOptionsChange={handleEditingOptionsChange} /> */}
      <Paper>
        {console.log('bokachoda', data)}

        <Scheduler data={data} height={600}>
          <ViewState
            defaultCurrentDate="2022-08-24"
            currentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentDateChange={setCurrentDate}
            onCurrentViewNameChange={setCurrentViewName}
          />
          <EditingState
            onCommitChanges={onCommitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={onAddedAppointmentChange}
          />
          <IntegratedEditing />
          <WeekView startDayHour={9} endDayHour={19} timeTableCellComponent={TimeTableCell} />
          <WeekView name="work-week" displayName="Work Week" excludedDays={[0, 6]} startDayHour={9} endDayHour={19} />
          <MonthView />
          <DayView />
          <Appointments />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <AppointmentTooltip showOpenButton showDeleteButton={allowDeleting} />
          <AppointmentForm
            commandButtonComponent={CommandButton}
            readOnly={isAppointmentBeingCreated ? false : !allowUpdating}
          />
          <Resources data={[...resources]} mainResourceName="roomId" />
          <DragDropProvider allowDrag={allowDrag} allowResize={allowResize} />
          <CurrentTimeIndicator updateInterval="10000" />
        </Scheduler>
      </Paper>
    </>
  );
};
