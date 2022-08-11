import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import StudentsList from './pages/ngo/StudentsList';
import RedSpots from './pages/ngo/RedSpots';
import TeachersList from './pages/ngo/TeachersList';
import NgoDashboard from './pages/ngo/NgoDashboard';
import CourseDetails from './pages/CourseDetails';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        // { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'classroom/:id', element: <CourseDetails /> },
      ],
    },
    {
      path: '/dashboard/ngo',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <NgoDashboard /> },
        { path: 'teachers-list', element: <TeachersList /> },
        { path: 'students-list', element: <StudentsList /> },
        { path: 'red-spots', element: <RedSpots /> },
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
