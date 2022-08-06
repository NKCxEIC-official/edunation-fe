import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import LandingPage from "./components/LandingPage";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const basename = document.querySelector('base')?.getAttribute('href') ?? '/'
  const { user, appData } = useSelector((state) => {
    return {
      user: state.user,
      appData: state.appData
    };
  });
  const dispatch = useDispatch();

  const privateRoutes = [
    // append private routes under this array in the format
    // { path: endpoint, element: React.Element}
  ];

  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Signup />} />
        {privateRoutes &&
          privateRoutes.map((privateRoute) => (
            <Route
              key={privateRoute.path}
              path={privateRoute.path}
              element={user?.uid ? privateRoute.element : <Navigate to="/login" />}
            />
          ))}
      </Routes>
    </Router>
  );
};

export default App;
