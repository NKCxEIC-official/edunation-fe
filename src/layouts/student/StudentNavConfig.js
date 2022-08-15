// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const StudentNavConfig = [
  {
    title: 'dashboard',
    path: '/studentDashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'classrooms',
    path: '/studentDashboard/classroom',
    icon: getIcon('mdi:google-classroom'),
  },
  {
    title: 'profile',
    path: '/studentDashboard/products',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'settings',
    path: '/studentDashboard/blog',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'messages',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'community',
    path: '/community',
    icon: getIcon('eva:person-add-fill'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
];

export {StudentNavConfig};
