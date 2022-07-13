import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Navigate } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Signup from './components/Signup';
import LandingPage from './components/LandingPage';
import { connect } from 'react-redux';

function App(props) {

  const { currentUser } = props;

  const privateRoutes = [
    // append private routes under this array in the format
    // { path: endpoint, element: React.Element}
  ]

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        {privateRoutes && privateRoutes.map(privateRoute => 
          <Route key={privateRoute.path} path={privateRoute.path} element={currentUser?.uid ? (privateRoute.element) : (<Navigate to="/login"/>)}/>
        )}
      </Routes>
    </Router>
  )
}

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);