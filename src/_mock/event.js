import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import moment from 'moment';
// ----------------------------------------------------------------------
import { pink, purple, teal, amber, deepOrange } from '@mui/material/colors';

const EVENT_NAME = ['Physics Class', 'Math Exam', 'English Test', 'Study Time', 'Group Study'];
const EVENT_COLOR = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107'];

// ----------------------------------------------------------------------

const events = [...Array(5)].map((_, index) => ({
    id: faker.datatype.uuid(),
    title: EVENT_NAME[index],
    type: `order${index + 1}`,
    time: faker.date.past(),
}));
  
const appointments = [
  {
    title: 'Website Re-Design Plan',
    startDate: new Date(2022, 5, 25, 9, 35),
    endDate: new Date(2022, 5, 25, 11, 30),
    id: 0,
    location: 'Room 1',
  },
  {
    title: 'Book Flights to San Fran for Sales Trip',
    startDate: new Date(2022, 5, 25, 12, 11),
    endDate: new Date(2022, 5, 25, 13, 0),
    id: 1,
    location: 'Room 1',
  },
  {
    title: 'Install New Router in Dev Room',
    startDate: new Date(2022, 5, 25, 14, 30),
    endDate: new Date(2022, 5, 25, 15, 35),
    id: 2,
    location: 'Room 2',
  },
  {
    title: 'Approve Personal Computer Upgrade Plan',
    startDate: new Date(2022, 5, 26, 10, 0),
    endDate: new Date(2022, 5, 26, 11, 0),
    id: 3,
    location: 'Room 2',
  },
  {
    title: 'Final Budget Review',
    startDate: new Date(2022, 5, 26, 12, 0),
    endDate: new Date(2022, 5, 26, 13, 35),
    id: 4,
    location: 'Room 2',
  },
  {
    title: 'New Brochures',
    startDate: new Date(2022, 5, 26, 14, 30),
    endDate: new Date(2022, 5, 26, 15, 45),
    id: 5,
    location: 'Room 2',
  },
  {
    title: 'Install New Database',
    startDate: new Date(2022, 5, 27, 9, 45),
    endDate: new Date(2022, 5, 27, 11, 15),
    id: 6,
    location: 'Room 1',
  },
  {
    title: 'Approve New Online Marketing Strategy',
    startDate: new Date(2022, 5, 27, 12, 0),
    endDate: new Date(2022, 5, 27, 14, 0),
    id: 7,
    location: 'Room 3',
  },
  {
    title: 'Upgrade Personal Computers',
    startDate: new Date(2022, 5, 27, 15, 15),
    endDate: new Date(2022, 5, 27, 16, 30),
    id: 8,
    location: 'Room 3',
  },
  {
    title: 'Customer Workshop',
    startDate: new Date(2022, 5, 28, 11, 0),
    endDate: new Date(2022, 5, 28, 12, 0),
    id: 9,
    location: 'Room 3',
  },
  {
    title: 'Prepare 2015 Marketing Plan',
    startDate: new Date(2022, 5, 28, 11, 0),
    endDate: new Date(2022, 5, 28, 13, 30),
    id: 10,
    location: 'Room 1',
  },
  {
    title: 'Brochure Design Review',
    startDate: new Date(2022, 5, 28, 14, 0),
    endDate: new Date(2022, 5, 28, 15, 30),
    id: 11,
    location: 'Room 2',
  },
  {
    title: 'Create Icons for Website',
    startDate: new Date(2022, 5, 29, 10, 0),
    endDate: new Date(2022, 5, 29, 11, 30),
    id: 12,
    location: 'Room 2',
  },
  {
    title: 'Upgrade Server Hardware',
    startDate: new Date(2022, 5, 29, 14, 30),
    endDate: new Date(2022, 5, 29, 16, 0),
    id: 13,
    location: 'Room 3',
  },
  {
    title: 'Submit New Website Design',
    startDate: new Date(2022, 5, 29, 16, 30),
    endDate: new Date(2022, 5, 29, 18, 0),
    id: 14,
    location: 'Room 3',
  },
  {
    title: 'Launch New Website',
    startDate: new Date(2022, 5, 29, 12, 20),
    endDate: new Date(2022, 5, 29, 14, 0),
    id: 15,
    location: 'Room 2',
  },
  {
    title: 'Website Re-Design Plan',
    startDate: new Date(2022, 6, 2, 9, 30),
    endDate: new Date(2022, 6, 2, 15, 30),
    id: 16,
    location: 'Room 1',
  },
  {
    title: 'Book Flights to San Fran for Sales Trip',
    startDate: new Date(2022, 6, 2, 12, 0),
    endDate: new Date(2022, 6, 2, 13, 0),
    id: 17,
    location: 'Room 3',
  },
  {
    title: 'Install New Router in Dev Room',
    startDate: new Date(2022, 6, 2, 14, 30),
    endDate: new Date(2022, 6, 2, 17, 30),
    id: 18,
    location: 'Room 2',
  },
  {
    title: 'Approve Personal Computer Upgrade Plan',
    startDate: new Date(2022, 6, 2, 16, 0),
    endDate: new Date(2022, 6, 3, 9, 0),
    id: 19,
    location: 'Room 2',
  },
  {
    title: 'Final Budget Review',
    startDate: new Date(2022, 6, 3, 10, 15),
    endDate: new Date(2022, 6, 3, 13, 35),
    id: 20,
    location: 'Room 1',
  },
  {
    title: 'New Brochures',
    startDate: new Date(2022, 6, 3, 14, 30),
    endDate: new Date(2022, 6, 3, 15, 45),
    id: 21,
    location: 'Room 3',
  },
  {
    title: 'Install New Database',
    startDate: new Date(2022, 6, 3, 15, 45),
    endDate: new Date(2022, 6, 4, 12, 15),
    id: 22,
    location: 'Room 3',
  },
  {
    title: 'Approve New Online Marketing Strategy',
    startDate: new Date(2022, 6, 4, 12, 35),
    endDate: new Date(2022, 6, 4, 14, 15),
    id: 23,
    location: 'Room 3',
  },
  {
    title: 'Upgrade Personal Computers',
    startDate: new Date(2022, 6, 4, 15, 15),
    endDate: new Date(2022, 6, 4, 20, 30),
    id: 24,
    location: 'Room 2',
  },
  {
    title: 'Customer Workshop',
    startDate: new Date(2022, 6, 5, 6, 0),
    endDate: new Date(2022, 6, 5, 14, 20),
    id: 25,
    location: 'Room 1',
  },
  {
    title: 'Customer Workshop',
    startDate: new Date(2022, 6, 5, 14, 35),
    endDate: new Date(2022, 6, 5, 16, 20),
    id: 26,
    location: 'Room 1',
  },
  {
    title: 'Customer Workshop 2',
    startDate: new Date(2022, 6, 5, 10, 0),
    endDate: new Date(2022, 6, 5, 11, 20),
    id: 27,
    location: 'Room 2',
  },
  {
    title: 'Prepare 2015 Marketing Plan',
    startDate: new Date(2022, 6, 5, 20, 0),
    endDate: new Date(2022, 6, 6, 13, 30),
    id: 28,
    location: 'Room 3',
  },
  {
    title: 'Brochure Design Review',
    startDate: new Date(2022, 6, 6, 14, 10),
    endDate: new Date(2022, 6, 6, 15, 30),
    id: 29,
    location: 'Room 3',
  },
  {
    title: 'Create Icons for Website',
    startDate: new Date(2022, 6, 6, 10, 0),
    endDate: new Date(2022, 6, 7, 14, 30),
    id: 30,
    location: 'Room 1',
  },
  {
    title: 'Upgrade Server Hardware',
    startDate: new Date(2022, 6, 3, 9, 30),
    endDate: new Date(2022, 6, 3, 12, 25),
    id: 31,
    location: 'Room 2',
  },
  {
    title: 'Submit New Website Design',
    startDate: new Date(2022, 6, 3, 12, 30),
    endDate: new Date(2022, 6, 3, 18, 0),
    id: 32,
    location: 'Room 2',
  },
  {
    title: 'Launch New Website',
    startDate: new Date(2022, 6, 3, 12, 20),
    endDate: new Date(2022, 6, 3, 14, 10),
    id: 33,
    location: 'Room 2',
  },
  {
    title: 'Book Flights to San Fran for Sales Trip',
    startDate: new Date(2022, 5, 26, 0, 0),
    endDate: new Date(2022, 5, 27, 0, 0),
    id: 34,
    location: 'Room 1',
  },
  {
    title: 'Customer Workshop',
    startDate: new Date(2022, 5, 29, 10, 0),
    endDate: new Date(2022, 5, 30, 14, 30),
    id: 35,
    location: 'Room 1',
  },
  {
    title: 'Google AdWords Strategy',
    startDate: new Date(2022, 6, 3, 0, 0),
    endDate: new Date(2022, 6, 4, 10, 30),
    id: 36,
    location: 'Room 3',
  },
  {
    title: 'Rollout of New Website and Marketing Brochures',
    startDate: new Date(2022, 6, 5, 10, 0),
    endDate: new Date(2022, 6, 9, 14, 30),
    id: 37,
    location: 'Room 3',
  },
  {
    title: 'Update NDA Agreement',
    startDate: new Date(2022, 6, 1, 10, 0),
    endDate: new Date(2022, 6, 3, 14, 30),
    id: 38,
    location: 'Room 2',
  },
  {
    title: 'Customer Workshop',
    startDate: new Date(2022, 6, 1),
    endDate: new Date(2022, 6, 2),
    allDay: true,
    id: 39,
    location: 'Room 1',
  },
  {
    title: 'Website Re-Design Plan',
    startDate: new Date(2022, 6, 23, 9, 30),
    endDate: new Date(2022, 6, 23, 11, 30),
  },
  {
    title: 'Book Flights to San Fran for Sales Trip',
    startDate: new Date(2022, 6, 23, 12, 0),
    endDate: new Date(2022, 6, 23, 13, 0),
  },
  {
    title: 'Install New Router in Dev Room',
    startDate: new Date(2022, 6, 23, 14, 30),
    endDate: new Date(2022, 6, 23, 15, 30),
  },
  {
    title: 'Approve Personal Computer Upgrade Plan',
    startDate: new Date(2022, 6, 24, 10, 0),
    endDate: new Date(2022, 6, 24, 11, 0),
  },
  {
    title: 'Final Budget Review',
    startDate: new Date(2022, 6, 24, 12, 0),
    endDate: new Date(2022, 6, 24, 13, 35),
  },
  {
    title: 'New Brochures',
    startDate: new Date(2022, 6, 24, 14, 30),
    endDate: new Date(2022, 6, 24, 15, 45),
  },
  {
    title: 'Install New Database',
    startDate: new Date(2022, 6, 25, 9, 45),
    endDate: new Date(2022, 6, 25, 11, 15),
  },
  {
    title: 'Approve New Online Marketing Strategy',
    startDate: new Date(2022, 6, 25, 12, 0),
    endDate: new Date(2022, 6, 25, 14, 0),
  },
  {
    title: 'Upgrade Personal Computers',
    startDate: new Date(2022, 6, 25, 15, 15),
    endDate: new Date(2022, 6, 25, 16, 30),
  },
  {
    title: 'Customer Workshop',
    startDate: new Date(2022, 6, 26, 11, 0),
    endDate: new Date(2022, 6, 26, 12, 0),
  },
  {
    title: 'Prepare 2015 Marketing Plan',
    startDate: new Date(2022, 6, 26, 11, 0),
    endDate: new Date(2022, 6, 26, 13, 30),
  },
  {
    title: 'Brochure Design Review',
    startDate: new Date(2022, 6, 26, 14, 0),
    endDate: new Date(2022, 6, 26, 15, 30),
  },
  {
    title: 'Create Icons for Website',
    startDate: new Date(2022, 6, 27, 10, 0),
    endDate: new Date(2022, 6, 27, 11, 30),
  },
  {
    title: 'Upgrade Server Hardware',
    startDate: new Date(2022, 6, 27, 14, 30),
    endDate: new Date(2022, 6, 27, 16, 0),
  },
  {
    title: 'Submit New Website Design',
    startDate: new Date(2022, 6, 27, 16, 30),
    endDate: new Date(2022, 6, 27, 18, 0),
  },
  {
    title: 'Launch New Website',
    startDate: new Date(2022, 6, 26, 12, 20),
    endDate: new Date(2022, 6, 26, 14, 0),
  },
  {
    title: 'Website Re-Design Plan',
    startDate: new Date(2022, 6, 16, 9, 30),
    endDate: new Date(2022, 6, 16, 15, 30),
  },
  {
    title: 'Book Flights to San Fran for Sales Trip',
    startDate: new Date(2022, 6, 16, 12, 0),
    endDate: new Date(2022, 6, 16, 13, 0),
  },
  {
    title: 'Install New Database',
    startDate: new Date(2022, 6, 17, 15, 45),
    endDate: new Date(2022, 6, 18, 12, 15),
  },
  {
    title: 'Approve New Online Marketing Strategy',
    startDate: new Date(2022, 6, 18, 12, 35),
    endDate: new Date(2022, 6, 18, 14, 15),
  },
  {
    title: 'Upgrade Personal Computers',
    startDate: new Date(2022, 6, 19, 15, 15),
    endDate: new Date(2022, 6, 20, 20, 30),
  },
  {
    title: 'Prepare 2015 Marketing Plan',
    startDate: new Date(2022, 6, 20, 20, 0),
    endDate: new Date(2022, 6, 20, 13, 30),
  },
  {
    title: 'Brochure Design Review',
    startDate: new Date(2022, 6, 20, 14, 10),
    endDate: new Date(2022, 6, 20, 15, 30),
  },
  {
    title: 'Vacation',
    startDate: new Date(2022, 5, 22),
    endDate: new Date(2022, 6, 1),
  },
  {
    title: 'Vacation',
    startDate: new Date(2022, 6, 28),
    endDate: new Date(2022, 7, 7),
  },
  {
    id: 0,
    title: 'Watercolor Landscape',
    roomId: 1,
    members: [1],
    startDate: new Date(2017, 4, 1, 9, 30),
    endDate: new Date(2017, 4, 1, 11),
    rRule: 'FREQ=WEEKLY;BYDAY=TU,FR;COUNT=10',
  },
  {
    id: 1,
    title: 'Oil Painting for Beginners',
    roomId: 2,
    members: [2],
    startDate: new Date(2017, 4, 1, 9, 30),
    endDate: new Date(2017, 4, 1, 11),
    rRule: 'FREQ=WEEKLY;BYDAY=MO,TH;COUNT=10',
  },
  {
    id: 2,
    title: 'Testing',
    roomId: 3,
    members: [3],
    startDate: new Date(2017, 4, 1, 12, 0),
    endDate: new Date(2017, 4, 1, 13, 0),
    rRule: 'FREQ=WEEKLY;BYDAY=MO;WKST=TU;INTERVAL=2;COUNT=2',
  },
  {
    id: 3,
    title: 'Meeting of Instructors',
    roomId: 4,
    members: [4, 1],
    startDate: new Date(2017, 4, 1, 9, 0),
    endDate: new Date(2017, 4, 1, 9, 15),
    rRule: 'FREQ=DAILY;BYDAY=WE;UNTIL=20170601',
  },
  {
    id: 4,
    title: 'Recruiting students',
    roomId: 5,
    members: [3, 4, 5],
    startDate: new Date(2017, 4, 26, 10, 0),
    endDate: new Date(2017, 4, 26, 11, 0),
    rRule: 'FREQ=YEARLY;BYWEEKNO=23',
    exDate: '20170611T100000',
  },
  {
    id: 5,
    title: 'Final exams',
    roomId: 3,
    members: [2, 3],
    startDate: new Date(2017, 4, 26, 12, 0),
    endDate: new Date(2017, 4, 26, 13, 35),
    rRule: 'FREQ=YEARLY;BYWEEKNO=24;BYDAY=TH,FR',
  },
  {
    id: 6,
    title: 'Monthly Planning',
    roomId: 4,
    members: [1, 3],
    startDate: new Date(2017, 4, 26, 14, 30),
    endDate: new Date(2017, 4, 26, 15, 45),
    rRule: 'FREQ=MONTHLY;BYMONTHDAY=27;COUNT=1',
  },
  {
    id: 7,
    title: 'Open Day',
    roomId: 5,
    members: [1, 3, 5],
    startDate: new Date(2017, 4, 1, 9, 30),
    endDate: new Date(2017, 4, 1, 13),
    rRule: 'FREQ=YEARLY;BYYEARDAY=148',
  },
];

const currentDate = moment();
let date = currentDate.date();

const makeTodayAppointment = (startDate, endDate) => {
  const days = moment(startDate).diff(endDate, 'days');
  const nextStartDate = moment(startDate)
    .year(currentDate.year())
    .month(currentDate.month())
    .date(date);
  const nextEndDate = moment(endDate)
    .year(currentDate.year())
    .month(currentDate.month())
    .date(date + days);

  return {
    startDate: nextStartDate.toDate(),
    endDate: nextEndDate.toDate(),
  };
};

const todayaAppoinments = appointments.map(({ startDate, endDate, ...restArgs }) => {
  const result = {
    ...makeTodayAppointment(startDate, endDate),
    ...restArgs,
  };
  date += 1;
  if (date > 31) date = 1;
  return result;
});

const resourcesData = [
  {
    text: 'React.js',
    id: 1,
    color: amber,
  },
  {
    text: 'Physics',
    id: 2,
    color: pink,
  },
  {
    text: 'Math',
    id: 3,
    color: purple,
  },
  {
    text: 'Geography',
    id: 4,
    color: deepOrange,
  },
  {
    text: 'Django',
    id: 5,
    color: teal,
  },
];


export { events, appointments, todayaAppoinments, resourcesData };
