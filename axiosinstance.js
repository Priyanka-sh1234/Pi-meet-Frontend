import axios from 'axios';

const getSecretKey = () => localStorage.getItem('secretKey');
const getRole = () => localStorage.getItem('role');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5050/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getSecretKey();
  const role = getRole();

  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  if (role) config.headers['X-User-Role'] = role;

  return config;
});

export default axiosInstance;
