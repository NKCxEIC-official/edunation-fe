import React from "react";
import applicationConstants from "../../utils/stringConstants";
import NgoDashboard from "./NgoDashboard";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";

const Dashboard = ({ role }) => {
  return (
    <>
      {role === applicationConstants.STUDENT && <StudentDashboard />}
      {role === applicationConstants.TEACHER && <TeacherDashboard />}
      {role === applicationConstants.NGO && <NgoDashboard />}
    </>
  );
};

export default Dashboard;
