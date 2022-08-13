import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
// import Blog from './pages/Blog';
// import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Schedule from './pages/teacher/Schedule';
import QNA from './pages/teacher/QNA';
// import Products from './pages/Products';
import DashboardTeacher from './pages/teacher/DashboardTeacher';
import TeacherDashboardLayout from './layouts/teacher';
import MyCourses from './pages/teacher/MyCourses';
import Reports from './pages/teacher/Reports';
import Settings from './pages/teacher/Settings';
import Profile from './pages/teacher/Profile';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <TeacherDashboardLayout />,
      children: [
        { path: 'app', element: <DashboardTeacher /> },
        { path: 'Schedule', element: <Schedule /> },
        { path: 'MyCourses', element: <MyCourses /> },
        { path: 'Reports', element: <Reports /> },
        { path: 'Settings', element: <Settings /> },
        { path: 'Profile', element: <Profile /> },

      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
