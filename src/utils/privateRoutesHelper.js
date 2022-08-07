import applicationConstants, { routeConstants } from "./stringConstants";

export const getPrivateRouteEndpoint = (role, type) => {
  if (type === applicationConstants.DASHBOARD) {
    return role === applicationConstants.STUDENT
      ? routeConstants.DASHBOARD
      : role === applicationConstants.TEACHER
      ? routeConstants.TEACHER_DASHBOARD
      : routeConstants.NGO_DASHBOARD;
  }
  return routeConstants.DEFAULT_ENDPOINT;
};
