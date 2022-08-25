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
import DashboardTeacher from './pages/teacher/DashboardTeacher';
import MyCourses from './pages/teacher/MyCourses';
import Reports from './pages/teacher/Reports';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import User from './pages/User';
import StudentDashboardApp from './pages/student/DashboardApp';

import StudentsList from './pages/ngo/StudentsList';
import RedSpots from './pages/ngo/RedSpots';
import TeachersList from './pages/ngo/TeachersList';
import NgoDashboard from './pages/ngo/NgoDashboard';
import CourseDetails from './pages/CourseDetails';
import AssignmentDetails from './pages/AssignmentDetails';
import CheckAssignments from './pages/CheckAssignments';
import Community from './pages/Community';
import AddRedSpot from './pages/ngo/AddRedSpot';
import CourseMaterialDetails from './pages/CourseMaterialDetails';
import ChatApp from './components/ChatApp';
import CourseGrid from './components/CourseGrid';
import RedSpotList from './pages/ngo/RedSpotList';
import NewCourses from './pages/student/NewCourses';
import OngoingClasses from './pages/student/OngoingClasses';

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
        { path: 'ngo/red-spots', element: <AddRedSpot /> },
        { path: 'ngo/profile', element: <Profile /> },
        { path: 'ngo/redSpot', element: <AddRedSpot /> },
        { path: 'ngo/redspots-list', element: <RedSpotList /> },

        // Teacher:
        { path: 'teacher/app', element: <DashboardTeacher /> },
        { path: 'teacher/schedule', element: <Schedule /> },
        { path: 'teacher/myCourses', element: <MyCourses /> },
        { path: 'teacher/community', element: <Community /> },
        { path: 'teacher/classroom/:id', element: <CourseDetails /> },
        { path: 'teacher/classroom/:id/assingment/:assingmentId', element: <AssignmentDetails /> },
        { path: 'teacher/classroom/:id/assingment/:assingmentId/check', element: <CheckAssignments /> },
        { path: 'teacher/classroom/:id/:topic/details', element: <CourseMaterialDetails /> },
        { path: 'teacher/reports', element: <Reports /> },
        { path: 'teacher/profile', element: <Profile /> },
        { path: 'teacher/settings', element: <Settings /> },
        { path: 'teacher/messages', element: <ChatApp /> },

        // Student:
        { path: 'student/app', element: <StudentDashboardApp /> },
        { path: 'student/user', element: <User /> },
        { path: 'student/schedule', element: <Schedule /> },
        { path: 'student/new-courses', element: <NewCourses /> },
        { path: 'student/ongoing-classes', element: <OngoingClasses /> },
        { path: 'student/classroom/:id', element: <CourseDetails /> },
        { path: 'student/classroom/:id/assingment/:assingmentId', element: <AssignmentDetails /> },
        { path: 'student/classroom/:id/assingment/:assingmentId/check', element: <CheckAssignments /> },
        { path: 'student/profile', element: <Profile /> },
        { path: 'student/community', element: <Community /> },
        { path: 'student/settings', element: <Settings /> },
        { path: 'student/classroom/:id/:topic/details', element: <CourseMaterialDetails /> },
        { path: 'student/messages', element: <ChatApp /> },
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
