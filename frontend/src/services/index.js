import axios from 'axios';

import { LS_KEYS } from '../constants';

export const api = axios.create({
  baseURL: process.env.ENV === 'prod' ? 'prod url' : 'http://localhost:9999',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem(LS_KEYS.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['ngrok-skip-browser-warning'] = true;
  }
  return config;
});

export default api;
