import axios from "axios";
import store from "../store/store";

const axiosInstance = axios.create({
  baseURL: `https://salesworkqa.godeskless.com/api/`,
});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.auth.access_token;
  // config.params = config.params || {};
  // config.params["auth"] = token;

  return config;
});

export default axiosInstance;
