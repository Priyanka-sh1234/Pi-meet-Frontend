import axiosInstance from "../../axiosinstance";

export const getAllClasses = async () => {
  const response = await axiosInstance.get("/Classes/GetAllClasses");
  return response.data.classes; // ✅ matches backend response structure
};

export const getTrainerClasses = async (trainerId) => {
  const response = await axiosInstance.get("/Classes/GetClassesByTrainerID", {
    params: { trainerID: trainerId },
  });
  return response.data.classes;
};

export const deleteClassByMeetingLink = async (meetingLink) => {
  const response = await axiosInstance.delete("/Classes/deleteClassByMeetingLink", {
    params: { meetingLink },
  });
  return response.data;
};
