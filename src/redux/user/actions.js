import actions from "./constants";

export const loginUserInit = () => {
  return {
    type: actions.LOGIN_STARTED,
  };
};

export const loginUserSuccess = (payload) => {
  return {
    type: actions.LOGIN_SUCCESS,
    payload: payload,
  };
};

export const loginUserFailure = () => {
  return {
    type: actions.LOGIN_FAILED,
  };
};

export const registerUserInit = () => {
  return {
    type: actions.SIGNUP_STARTED,
  };
};

export const registerUserSuccess = (payload) => {
  return {
    type: actions.SIGNUP_SUCCESS,
    payload: payload,
  };
};

export const registerUserFailure = () => {
  return {
    type: actions.SIGNUP_FAILURE,
  };
};

export const logoutUserInit = () => {
  return {
    type: actions.LOGOUT_STARTED,
  };
};

export const logoutUserSuccess = () => {
  return {
    type: actions.LOGOUT_SUCCESS,
  };
};

export const logoutUserFailure = () => {
  return {
    type: actions.LOGOUT_FAILED,
  };
};

export const setUserData = (payload) => {
  return {
    type: actions.SET_USER,
    payload: payload,
  };
};

export default {
  loginUserInit,
  loginUserSuccess,
  loginUserFailure,
  logoutUserInit,
  logoutUserSuccess,
  logoutUserFailure,
  setUserData,
};
