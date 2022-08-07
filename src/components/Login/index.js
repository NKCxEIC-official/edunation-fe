import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import applicationConstants from "../../utils/stringConstants";
import { getPrivateRouteEndpoint } from "../../utils/privateRoutesHelper";
import { useSelector } from "react-redux";

const Login = (props) => {
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

  return <div className={styles.loginContainer}>Login</div>;
};

export default Login;
