/* eslint-disable */
import actions from "./constants";

const initialState = {
  uid: "",
  name: "",
  role: "",
  email: "",
  avatar: "",
  authorized: false,
  loading: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOGIN_STARTED:
      return { ...state, loading: true };
    case actions.LOGIN_SUCCESS:
      return { ...state, ...action.payload, authorized: true, loading: false };
    case actions.LOGIN_FAILED:
      return initialState;
    case actions.SIGNUP_STARTED:
      return { ...state, loading: true };
    case actions.SIGNUP_SUCCESS:
      return { ...state, ...action.payload, authorized: true, loading: false };
    case actions.SIGNUP_FAILED:
      return initialState;
    case actions.SET_USER:
      return { ...state, ...action.payload };
    case actions.LOGOUT_STARTED:
      return { ...state, loading: true };
    case actions.LOGOUT_SUCCESS:
      return initialState;
    case actions.LOGOUT_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
}
