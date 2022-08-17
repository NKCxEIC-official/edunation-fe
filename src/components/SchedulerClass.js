// import React from 'react'
// import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda} from '@syncfusion/ej2-react-schedule' 
// import Paper from '@mui/material/Paper';
// import { ViewState } from '@devexpress/dx-react-scheduler';
// import { Scheduler, DayView, Appointments, WeekView ,} from '@devexpress/dx-react-scheduler-material-ui';
// import { styled, alpha } from '@mui/material/styles';
// import appointments from '../_mock/today-appoinments';


// const PREFIX = 'Demo';

// const classes = {
//   todayCell: `${PREFIX}-todayCell`,
//   weekendCell: `${PREFIX}-weekendCell`,
//   today: `${PREFIX}-today`,
//   weekend: `${PREFIX}-weekend`,
// };


// const StyledWeekViewTimeTableCell = styled(WeekView.TimeTableCell)(({ theme }) => ({
//   [`&.${classes.todayCell}`]: {
//     backgroundColor: alpha(theme.palette.primary.main, 0.1),
//     '&:hover': {
//       backgroundColor: alpha(theme.palette.primary.main, 0.14),
//     },
//     '&:focus': {
//       backgroundColor: alpha(theme.palette.primary.main, 0.16),
//     },
//   },
//   [`&.${classes.weekendCell}`]: {
//     backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
//     '&:hover': {
//       backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
//     },
//     '&:focus': {
//       backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
//     },
//   },
// }));

// const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)(({ theme }) => ({
//   [`&.${classes.today}`]: {
//     backgroundColor: alpha(theme.palette.primary.main, 0.16),
//   },
//   [`&.${classes.weekend}`]: {
//     backgroundColor: alpha(theme.palette.action.disabledBackground, 0.06),
//   },
// }));

// const TimeTableCell = (props) => {
//   const { startDate } = props;
//   const date = new Date(startDate);

//   if (date.getDate() === new Date().getDate()) {
//     return <StyledWeekViewTimeTableCell {...props} className={classes.todayCell} />;
//   } if (date.getDay() === 0 || date.getDay() === 6) {
//     return <StyledWeekViewTimeTableCell {...props} className={classes.weekendCell} />;
//   } return <StyledWeekViewTimeTableCell {...props} />;
// };

// const DayScaleCell = (props) => {
//   const { startDate, today } = props;

//   if (today) {
//     return <StyledWeekViewDayScaleCell {...props} className={classes.today} />;
//   } if (startDate.getDay() === 0 || startDate.getDay() === 6) {
//     return <StyledWeekViewDayScaleCell {...props} className={classes.weekend} />;
//   } return <StyledWeekViewDayScaleCell {...props} />;
// };

// export default () => (
//   <Paper>
//     <Scheduler
//       data={appointments}
//       height={660}
//     >
//       <ViewState />
//       <WeekView
//         startDayHour={9}
//         endDayHour={19}
//         timeTableCellComponent={TimeTableCell}
//         dayScaleCellComponent={DayScaleCell}
//       />
//       <Appointments />
//     </Scheduler>
//   </Paper>
// );
import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { EditingState, IntegratedEditing, ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DayView,
  DateNavigator,
  TodayButton,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointments } from '../_mock/event';



export default function Demo() {

  const [data, setDate] = useState();
  const [currentViewName, setCurrentViewName] = useState('work-week');
  const [currentDate, setCurrentDate] = useState({});
  const [data, setDate] = useState({});
  const data = appointments;
  const currentViewName = ;
    
  const currentViewNameChange = (currentViewName) => {
    setCurrentViewName(currentViewName);
  };
  const currentDateChange = (currentDate) => {
    setCurrentDate({ currentDate });
  };
  
  function commitChanges ({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
  }

    const { data, currentViewName, currentDate } = this.state;

    return (
      <Paper>
        <Scheduler data={data} height={660}>
          <ViewState
            defaultCurrentDate="2018-07-25"
            currentViewName={currentViewName}
            currentDate={currentDate}
            onCurrentViewNameChange={currentViewNameChange}
            onCurrentDateChange={currentDateChange}
          />
          <EditingState onCommitChanges={commitChanges} />
          <IntegratedEditing />
          <WeekView startDayHour={10} endDayHour={19} />
          <WeekView name="work-week" displayName="Work Week" excludedDays={[0, 6]} startDayHour={9} endDayHour={19} />
          <MonthView />
          <DayView />
          <AppointmentTooltip showOpenButton showDeleteButton />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <Appointments />
        </Scheduler>
      </Paper>
    );
}
