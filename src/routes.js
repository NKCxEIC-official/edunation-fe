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

import Blog from './pages/student/TopRatedCourses';
import User from './pages/User';
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




// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <TeacherDashboardLayout />,
      children: [

        { path: 'teacher-overview', element: <DashboardTeacher /> },
        { path: 'teacher/schedule', element: <Schedule /> },
        { path: 'teacher/myCourses', element: <MyCourses /> },
        { path: 'teacher/reports', element: <Reports /> },
        { path: 'profile', element: <Profile /> },


        // { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'classroom/:id', element: <CourseDetails /> },
        { path: 'ngo-overview', element: <NgoDashboard /> },
        { path: 'teachers-list', element: <TeachersList /> },
        { path: 'students-list', element: <StudentsList /> },
        { path: 'red-spots', element: <RedSpots /> },

      ],
    },

    {
      path: '/studentDashboard',
      element: <StudentDashboardLayout />,
      children: [
        { path: '', element: <StudentDashboardApp /> },
        { path: 'app', element: <StudentDashboardApp /> },
        { path: 'classroom', element: <Classroom /> },
        { path: 'products', element: <User /> },
        { path: 'blog', element: <Blog /> },

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
