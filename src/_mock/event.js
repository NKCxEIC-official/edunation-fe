import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const EVENT_NAME = ['Physics Class', 'Math Exam', 'English Test', 'Study Time', 'Group Study'];
const EVENT_COLOR = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107'];

// ----------------------------------------------------------------------

const events = [...Array(4)].map((_, index) => ({
    id: faker.datatype.uuid(),
    title: EVENT_NAME[index],
    type: `order${index + 1}`,
    time: faker.date.past(),
  }));

export default events;
