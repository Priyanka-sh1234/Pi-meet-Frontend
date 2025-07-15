// src/api/allclasses.js
import axiosInstance from '../../axiosinstance';

export const getAllClasses = async () => {
  try {
    const res = await axiosInstance.get('/Classes/GetAllClasses');
    return res.data.classes; // ✅ FIXED: Extract only the array
  } catch (err) {
    console.error("Error fetching class data:", err);
    throw err;
  }
};
