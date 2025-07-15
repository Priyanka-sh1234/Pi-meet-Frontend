import axiosInstance from '../../axiosinstance';

export const addTrainer = async (trainerData) => {
  const response = await axiosInstance.post('/trainer/addTrainer', trainerData);
  return response.data;
};

export const getAllTrainers = async () => {
  const response = await axiosInstance.get('/trainer/GetAllTrainers');
  return response.data;
};

export const deleteTrainer = async (TrainerId) => {
  const response = await axiosInstance.delete(`/trainer/deleteTrainer/${TrainerId}`);
  return response.data;
};


export const updateTrainer = async (trainerId, updatedData) => {
  const response = await axiosInstance.put(`/trainer/updateTrainer/${trainerId}`, updatedData);
  return response.data;
};

export const resetTrainerPassword = async (trainerId, newPassword) => {
  const response = await axiosInstance.post('/trainer/reset-password', {
    trainerId: trainerId.trim(),
    newPassword,
  });
  return response.data;
};


