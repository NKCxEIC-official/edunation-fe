import axios from 'axios';
import store from '../store';

const axiosInstance = axios.create({
  baseURL: `https://hrms-godeskless.herokuapp.com/`,
});

export default axiosInstance;
