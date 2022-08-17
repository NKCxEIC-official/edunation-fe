import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

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
import DashboardTeacher from './pages/teacher/DashboardTeacher';
import TeacherDashboardLayout from './layouts/teacher';
import MyCourses from './pages/teacher/MyCourses';
import Reports from './pages/teacher/Reports';
import Settings from './pages/teacher/Settings';
import Profile from './pages/teacher/Profile';
import User from './pages/User';
import StudentDashboardApp from './pages/student/DashboardApp';
import Classroom from './pages/student/Classroom';

import StudentsList from './pages/ngo/StudentsList';
import RedSpots from './pages/ngo/RedSpots';
import TeachersList from './pages/ngo/TeachersList';
import NgoDashboard from './pages/ngo/NgoDashboard';
import CourseDetails from './pages/CourseDetails';
import AssignmentDetails from './pages/AssignmentDetails';
import CheckAssignments from './pages/CheckAssignments';

import Community from './pages/Community';
import StudentProfile from './pages/student/StudentProfile';
import AddRedSpot from './pages/ngo/AddRedSpot';

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
        // NGO routs:
        { path: 'ngo/app', element: <NgoDashboard /> },
        { path: 'ngo/teachers-list', element: <TeachersList /> },
        { path: 'ngo/students-list', element: <StudentsList /> },
        { path: 'ngo/red-spots', element: <RedSpots /> },
        { path: 'ngo/profile', element: <Profile /> },
        { path: 'ngo/redSpot', element: <AddRedSpot /> },

        // Teacher:
        { path: 'teacher/app', element: <DashboardTeacher /> },
        { path: 'teacher/schedule', element: <Schedule /> },
        { path: 'teacher/myCourses', element: <MyCourses /> },
        { path: 'teacher/reports', element: <Reports /> },
        { path: 'teacher/profile', element: <Profile /> },

        // Student:
        { path: 'student/app', element: <StudentDashboardApp /> },
        { path: 'student/user', element: <User /> },
        { path: 'student/classrooms', element: <Classroom /> },
        { path: 'student/classroom/:id', element: <CourseDetails /> },
        { path: 'student/classroom/:id/assingment/:assingmentId', element: <AssignmentDetails /> },
        { path: 'student/classroom/:id/assingment/:assingmentId/check', element: <CheckAssignments /> },
        { path: 'student/profile', element: <StudentProfile /> },
        { path: 'student/', element: <StudentDashboardApp /> },
        { path: 'student/classroom', element: <Classroom /> },
        { path: 'student/community', element: <Community /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
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
