import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://readjourney.b.goit.study/api',
});

export const setAuthHeader = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  delete api.defaults.headers.common.Authorization;
};
