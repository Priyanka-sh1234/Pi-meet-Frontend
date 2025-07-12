import axiosInstance from '../../axiosinstance';

export const loginUser = async (id, password) => {
  const response = await axiosInstance.post('/auth/login', { id, password });
  return response.data; // { token, user, message }
};
