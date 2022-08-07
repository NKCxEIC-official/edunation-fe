import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPrivateRouteEndpoint } from "../../utils/privateRoutesHelper";
import applicationConstants from '../../utils/stringConstants';
import styles from "./Signup.module.scss";

const Signup = (props) => {
  const { role } = props;
  const navigate = useNavigate();
  const { user } = useSelector((state) => {
    return {
      user: state.user,
    };
  });

  useEffect(() => {
    if (user?.uid && role.includes(user.role)) {
      const dashboardPrivateURL = getPrivateRouteEndpoint(role, applicationConstants.DASHBOARD);
      navigate(dashboardPrivateURL);
    }
  }, [user]);

  return <div className={styles.signupContainer}>Signup</div>;
};

export default Signup;
