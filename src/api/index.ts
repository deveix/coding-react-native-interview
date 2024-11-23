import axios from 'axios';
import {TMDB_BASE_URL, TMDB_ACCESS_TOKEN} from '@env';

// Request interceptor
axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${TMDB_ACCESS_TOKEN}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Response interceptor
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axios.defaults.baseURL = TMDB_BASE_URL;
export const apiClient = axios;
