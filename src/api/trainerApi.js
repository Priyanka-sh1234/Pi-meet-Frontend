import axiosInstance from '../../axiosinstance';

// ✅ Add a new trainer
export const addTrainer = async (trainerData) => {
  const response = await axiosInstance.post('/trainer/addTrainer', trainerData);
  return response.data;
};

// ✅ Get all trainers
export const getAllTrainers = async () => {
  const response = await axiosInstance.get('/trainer/GetAllTrainers'); // case-sensitive match
  return response.data;
};

// ✅ Delete trainer by TrainerId
export const deleteTrainer = async (TrainerId) => {
  const response = await axiosInstance.delete(`/trainer/deleteTrainer/${TrainerId}`);
  return response.data;
};

// ✅ Update trainer details (TrainerId in URL, data in body)
export const updateTrainer = async (TrainerId, updatedData) => {
  const response = await axiosInstance.put(`/trainer/updateTrainer/${TrainerId}`, updatedData);
  return response.data;
};

// ✅ Change trainer active/inactive status
export const changeTrainerStatus = async (TrainerId, status) => {
  const response = await axiosInstance.patch(`/trainer/TrainerStatus/${TrainerId}`, { status });
  return response.data;
};

// ✅ Reset password for trainer (backend will send mail link)
export const resetTrainerPassword = async (trainerId, newPassword) => {
  const response = await axiosInstance.post('/trainer/reset-password', {
    trainerId: trainerId.trim(),
    newPassword,
  });
  return response.data;
};

// ✅ Get details of a single trainer by TrainerId or email
export const getTrainerDetails = async ({ TrainerId, email }) => {
  const params = {};
  if (TrainerId) params.TrainerId = TrainerId;
  if (email) params.email = email;

  // ✅ FIXED: Match backend route exactly - case-sensitive
  const response = await axiosInstance.get('/trainer/GetTrainer', { params });

  // ✅ Extract the 'trainer' object from response
  return response.data.trainer;
};
// ✅ Get all classes (batches) assigned to a specific trainer
export const getTrainerBatches = async (trainerId) => {
  const response = await axiosInstance.get('/Classes/GetClassesByTrainerID', {
    params: { trainerID: trainerId }, // key name matches backend
  });

  const classes = response.data.classes || [];

  // Optionally mark status for UI purposes
  return classes.map((cls, i) => ({
    ...cls,
    process: i === 0 ? 'done' : i === 1 ? 'ongoing' : 'schedule',
  }));
};
