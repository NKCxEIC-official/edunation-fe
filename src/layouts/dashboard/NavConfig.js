// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const NGONavConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/ngo-overview',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: "Teacher's List",
    path: '/dashboard/teachers-list',
    icon: getIcon('wpf:administrator'),
  },
  {
    title: "Student's Lists",
    path: '/dashboard/students-list',
    icon: getIcon('ph:users-three'),
  },
];

export { NGONavConfig };
