import axiosInstance from "../../axiosinstance";

export const getAllClasses = async () => {
  const response = await axiosInstance.get("/Classes/GetAllClasses");
  return response.data.classes; 
};

export const getTrainerClasses = async (trainerId) => {
  const response = await axiosInstance.get("/Classes/GetClassesByTrainerID", {
    params: { trainerID: trainerId },
  });
  return response.data.classes;
};

export const deleteClassByMeetingLink = async (meetingLink) => {
  const encodedLink = encodeURIComponent(meetingLink); // Ensure URL safety
  const response = await axiosInstance.delete(`/Classes/DeleteaClass/${encodedLink}`);
  return response.data;
};

// POST: Add Guest
export const addGuestToClass = async (guestData) => {
  const response = await axiosInstance.post("/trainer/AddGuest", guestData);
  return response.data;
};

// DELETE: Guest by ID
export const deleteGuestById = async (guestId) => {
  const response = await axiosInstance.delete(`/guests/${guestId}`);
  return response.data;
};

// PUT: Update Class by ID
export const updateClassById = async (id, updatedData) => {
  const response = await axiosInstance.put(`/Classes/Updateclasses/${id}`, updatedData);
  return response.data;
};