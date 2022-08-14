import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/student/TopRatedCourses';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';

// import DashboardApp from './pages/DashboardApp';
import StudentDashboardLayout from './layouts/student';
import StudentDashboardApp from './pages/student/DashboardApp';
import Classroom from './pages/student/Classroom';

import StudentsList from './pages/ngo/StudentsList';
import RedSpots from './pages/ngo/RedSpots';
import TeachersList from './pages/ngo/TeachersList';
import NgoDashboard from './pages/ngo/NgoDashboard';
import CourseDetails from './pages/CourseDetails';
import Profile from './pages/Profile';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: (
        <RequireAuth>
          <DashboardLayout />
        </RequireAuth>
      ),
      children: [
        // { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'classroom/:id', element: <CourseDetails /> },
        { path: 'ngo-overview', element: <NgoDashboard /> },
        { path: 'teachers-list', element: <TeachersList /> },
        { path: 'students-list', element: <StudentsList /> },
        { path: 'red-spots', element: <RedSpots /> },
        { path: 'profile', element: <Profile /> },
        { path: 'student-overview', element: <StudentDashboardApp /> },
        { path: 'classrooms', element: <Classroom /> },
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

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (!('uid' in user)) {
      navigate('/login');
    }
  }, [user, navigate]);

  return children;
};
