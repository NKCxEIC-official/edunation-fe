// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const TeacherNavConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Schedule',
    path: '/dashboard/Schedule',
    icon: getIcon('icon-park-outline:classroom'),
  },
  {
    title: 'MyCourses',
    path: '/dashboard/MyCourses',
    icon: getIcon('ant-design:question-circle-outlined'),
  },
  {
    title: 'Reports',
    path: '/dashboard/Reports',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'Settings',
    path: '/dashboard/Settings',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'Profile',
    path: 'dashboard/Profile',
    icon: getIcon('eva:person-add-fill'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default TeacherNavConfig;
