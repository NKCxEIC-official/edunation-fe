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
    path: '/dashboard/Settings',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'Profile',
    path: 'dashboard/teacher/profile',
    icon: getIcon('eva:person-add-fill'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

const StudentNavConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/student/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'classrooms',
    path: '/dashboard/student/classroom',
    icon: getIcon('mdi:google-classroom'),
  },
  {
    title: 'profile',
    path: '/dashboard/student/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'settings',
    path: '/dashboard/blog',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'messages',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'schedule',
    path: '/register',
    icon: getIcon('eva:person-add-fill'),
  },
];

export { NGONavConfig, TeacherNavConfig, StudentNavConfig };
