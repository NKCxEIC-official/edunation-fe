/* eslint-disable */
import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

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
import RedSpotList from './pages/ngo/RedSpotList';

import Dashboard from './pages/superAdmin/Dashboard';
import AcceptApproval from './pages/superAdmin/AcceptApproval';

import NewCourses from './pages/student/NewCourses';
import OngoingClasses from './pages/student/OngoingClasses';
import ExamDashboard from './pages/ExamDashboard';
import ExamDashboardLayout from './layouts/examDashboard';
import ExamInfo from './pages/ExamInfo';
import QuestionSet from './pages/QuestionSets';
import AddQuestionSet from './pages/AddQuestionSet';
import ReadSpotDashboardApp from './pages/redspot/RedSpotDashboardApp';

import { observeLiveClass } from './utils';
import LoadingAnimationLayout from './layouts/LoadingAnimationLayout';
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
        // SUPER routs:
        { path: 'super/app', element: <Dashboard /> },
        { path: 'super/accept-approval', element: <AcceptApproval /> },

        // RED-Spot routs:
        {
          path: 'red-spot/app',
          element: (
            <ObserveLiveSession>
              <LoadingAnimationLayout />
            </ObserveLiveSession>
          ),
        },

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
        { path: 'teacher/classroom/:id/assignment/:assignmentId', element: <AssignmentDetails /> },
        { path: 'teacher/classroom/:id/assignment/:assignmentId/check', element: <CheckAssignments /> },
        { path: 'teacher/classroom/:id/course-materials/:fileId', element: <CourseMaterialDetails /> },
        { path: 'teacher/reports', element: <Reports /> },
        { path: 'teacher/profile', element: <Profile /> },
        { path: 'teacher/settings', element: <Settings /> },
        { path: 'teacher/messages', element: <ChatApp /> },
        { path: 'teacher/set-question', element: <QuestionSet /> },
        { path: 'teacher/set-question/add-question-set', element: <AddQuestionSet /> },

        // Student:
        { path: 'student/app', element: <StudentDashboardApp /> },
        { path: 'student/user', element: <User /> },
        { path: 'student/schedule', element: <Schedule /> },
        { path: 'student/new-courses', element: <NewCourses /> },
        { path: 'student/ongoing-classes', element: <OngoingClasses /> },
        { path: 'student/classroom/:id', element: <CourseDetails /> },
        { path: 'student/classroom/:id/assignment/:assignmentId', element: <AssignmentDetails /> },
        { path: 'student/classroom/:id/assignment/:assignmentId/check', element: <CheckAssignments /> },
        { path: 'student/profile', element: <Profile /> },
        { path: 'student/community', element: <Community /> },
        { path: 'student/settings', element: <Settings /> },
        { path: 'student/classroom/:id/course-materials/:fileId', element: <CourseMaterialDetails /> },
        { path: 'student/messages', element: <ChatApp /> },
      ],
    },
    {
      path: '/exam',
      element: (
          <ExamDashboardLayout />
      ),
      children: [
        { path: 'student/:examId/dashboard/', element: <ExamDashboard /> },
        { path: 'student/examInfo/', element: <ExamInfo /> },
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
    { path: 'red-spot/live/session', element: <ReadSpotDashboardApp /> },
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

const ObserveLiveSession = ({ children }) => {
  const db = getDatabase();
  const documentId = `liveClass/8HbwxSFDQCe6gNgzuYRF/`;
  const documentRef = ref(db, documentId);
  const navigate = useNavigate();

  onValue(documentRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const isLive = data?.isLive;
      console.log('🚀 ~ file: utils.js ~ line 14 ~ observeLiveClass ~ isLive', isLive);
      if (isLive === true) {
        navigate('dashboard/red-spot/app');
      } else {
        navigate('dashboard/red-spot/live');
      }
    }
  });
  return children;
};
