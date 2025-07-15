// src/api/auth.js
import axiosInstance from '../../axiosinstance';
import axios from 'axios';

export const loginUser = async (id, password) => {
  const response = await axios.post('http://localhost:5050/api/auth/login', {
    id,
    password,
  });

  return response.data;
};
