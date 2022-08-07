import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from 'react-redux';
import Login from "./components/Login";
import Signup from "./components/Signup";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import applicationConstants, { routeConstants } from "./utils/stringConstants";

const App = () => {
  const { user, appData } = useSelector((state) => {
    return {
      user: state.user,
      appData: state.appData,
    };
  });
  const dispatch = useDispatch();

  const privateRoutes = [
    // append private routes under this array in the format
    // { path: endpoint, element: React.Element, role: targetUserRole, fallbackURL: default fallback url }
    {
      path: routeConstants.DASHBOARD,
      element: <Dashboard role={applicationConstants.STUDENT} />,
      role: applicationConstants.STUDENT,
      fallbackURL: routeConstants.LOGIN,
    },
    {
      path: routeConstants.TEACHER_DASHBOARD,
      element: <Dashboard role={applicationConstants.TEACHER} />,
      role: applicationConstants.TEACHER,
      fallbackURL: routeConstants.TEACHER_LOGIN,
    },
    {
      path: routeConstants.NGO_DASHBOARD,
      element: <Dashboard role={applicationConstants.NGO} />,
      role: applicationConstants.NGO,
      fallbackURL: routeConstants.NGO_LOGIN,
    },
  ];

  return (
    <Router basename={""}>
      <Routes>
        <Route path={routeConstants.DEFAULT_ENDPOINT} element={<LandingPage />} />
        <Route
          exact
          path={routeConstants.LOGIN}
          element={<Login role={applicationConstants.STUDENT} />}
        />
        <Route
          exact
          path={routeConstants.REGISTER}
          element={<Signup role={applicationConstants.STUDENT} />}
        />
        <Route
          exact
          path={routeConstants.NGO_LOGIN}
          element={<Login role={applicationConstants.NGO} />}
        />
        <Route
          exact
          path={routeConstants.NGO_REGISTER}
          element={<Signup role={applicationConstants.NGO} />}
        />
        <Route
          exact
          path={routeConstants.TEACHER_LOGIN}
          element={<Login role={applicationConstants.TEACHER} />}
        />
        <Route
          exact
          path={routeConstants.TEACHER_REGISTER}
          element={<Signup role={applicationConstants.TEACHER} />}
        />
        {privateRoutes &&
          privateRoutes.map((privateRoute) => (
            <Route
              key={privateRoute.path}
              path={privateRoute.path}
              element={
                user?.uid && user?.role.includes(privateRoute.role) ? (
                  privateRoute.element
                ) : (
                  <Navigate to={privateRoute.fallbackURL} />
                )
              }
            />
          ))}
      </Routes>
    </Router>
  );
};

export default App;
