import axios from 'axios';

let currentToken = '';
let currentRole = '';

export const setAuthHeader = (token, role) => {
  currentToken = token;
  currentRole = role;
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5050/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (currentToken) config.headers['Authorization'] = `Bearer ${currentToken}`;
  if (currentRole) config.headers['X-User-Role'] = currentRole;
  return config;
});

export default axiosInstance;
