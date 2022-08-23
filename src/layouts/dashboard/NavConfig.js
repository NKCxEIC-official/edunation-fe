// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const NGONavConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/ngo/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: "Teacher's List",
    path: '/dashboard/ngo/teachers-list',
    icon: getIcon('wpf:administrator'),
  },
  {
    title: "Student's Lists",
    path: '/dashboard/ngo/students-list',
    icon: getIcon('ph:users-three'),
  },
];

const TeacherNavConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/teacher/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Schedule',
    path: '/dashboard/teacher/schedule',
    icon: getIcon('icon-park-outline:classroom'),
  },
  {
    title: 'MyCourses',
    path: '/dashboard/teacher/myCourses',
    icon: getIcon('ant-design:question-circle-outlined'),
  },
  {
    title: 'Reports',
    path: '/dashboard/teacher/reports',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'Settings',
    path: '/dashboard/teacher/Settings',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'Community',
    path: '/dashboard/teacher/Community',
    icon: getIcon('fluent:people-community-28-filled'),
  },
  {
    title: 'Profile',
    path: '/dashboard/teacher/profile',
    icon: getIcon('eva:person-add-fill'),
  },
  {
    title: 'messages',
    path: '/dashboard/teacher/messages',
    icon: getIcon('jam:messages-f'),
  },
  {
    title: 'Set Question',
    path: '/dashboard/teacher/set-question',
    icon: getIcon('uil:file-question-alt'),
  },
];

const StudentNavConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/student/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'classrooms',
    path: '/dashboard/student/classrooms',
    icon: getIcon('mdi:google-classroom'),
  },
  {
    title: 'profile',
    path: '/dashboard/student/profile',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'settings',
    path: '/dashboard/student/settings',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'messages',
    path: '/dashboard/student/messages',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'community',
    path: '/dashboard/student/community',
    icon: getIcon('fluent:people-community-28-filled'),
  },
  {
    title: 'Schedule',
    path: '/dashboard/student/schedule',
    icon: getIcon('icon-park-outline:classroom'),
  },
];

export { NGONavConfig, TeacherNavConfig, StudentNavConfig };
