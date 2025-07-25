"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, X } from "lucide-react";
import { Drawer, Modal, message } from "antd";
import image from "../../assets/boy.png";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "../lib/utils";
import {
  getAllClasses,
  deleteClassByMeetingLink,
  getTrainerClasses,
  addGuestToClass,
  updateClassById,
} from "../../api/allclasses";
import { useAtomValue } from "jotai";
import { userAtom } from "../../store/atoms";
import dayjs from "dayjs";

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>
);

const AllClasses = () => {
  const user = useAtomValue(userAtom);
  const [selectedBatch, setSelectedBatch] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteBatch, setDeleteBatch] = useState("");
  const [scheduleData, setScheduleData] = useState({});
  const [batchList, setBatchList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newGuestEmail, setNewGuestEmail] = useState("");
  const [newGuestStartDate, setNewGuestStartDate] = useState("");
  const [newGuestEndDate, setNewGuestEndDate] = useState("");
  const [newGuestCategory, setNewGuestCategory] = useState("online");
  const [newGuests, setNewGuests] = useState([]);
  const [existingGuests, setExistingGuests] = useState([]);

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      let data = [];

      if (user?.role?.toLowerCase() === "admin") {
        data = await getAllClasses();
      } else if (user?.role?.toLowerCase() === "trainer") {
        data = await getTrainerClasses(user?.TrainerId);
      }

      const grouped = {};
      const batches = [];

      data.forEach((item) => {
        const batch = item.technology || "Unknown";
        const mappedItem = {
          name: item.meetingTitle,
          time: `${dayjs(item.startingTime).format("hh:mm A")} - ${dayjs(item.endingTime).format("hh:mm A")}`,
          process: "schedule",
          ...item,
          batchName: batch,
        };

        if (!grouped[batch]) grouped[batch] = [];
        grouped[batch].push(mappedItem);
        if (!batches.includes(batch)) batches.push(batch);
      });

      setScheduleData(grouped);
      setBatchList(batches);
    } catch {
      message.error("Failed to load schedule.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role) fetchSchedule();
  }, [user]);

  const confirmDelete = (batchName, index) => {
    setDeleteBatch(batchName);
    setDeleteIndex(index);
    setDeleteModalOpen(true);
  };

  const handleEdit = async (item) => {
    setEditData({ ...item });
    setNewGuests([]);
    setDrawerOpen(true);

    if (item?.guests && Array.isArray(item.guests)) {
      setExistingGuests(item.guests);
    } else {
      setExistingGuests([]);
    }
  };

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const updateTime = (field, value) => {
    const existingDate = dayjs(editData[field]);
    const [hours, minutes] = value.split(":").map(Number);
    const updated = existingDate.hour(hours).minute(minutes).second(0).millisecond(0);
    handleEditChange(field, updated.toISOString());
  };

  const handleAddNewGuest = async () => {
    if (!newGuestEmail.trim()) return message.error("Enter email.");
    if (!newGuestStartDate || !newGuestEndDate) return message.error("Choose both dates.");
    if (dayjs(newGuestEndDate).isBefore(dayjs(newGuestStartDate)))
      return message.error("End date can't be before start.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newGuestEmail.trim())) return message.error("Invalid email.");

    try {
      const payload = {
        name: newGuestEmail.trim(),
        startDateOfGuest: newGuestStartDate,
        endDateOfGuest: newGuestEndDate,
        classId: editData._id,
        TrainerID: editData.TrainerID,
        studentCategory: newGuestCategory,
      };
      const res = await addGuestToClass(payload);
      message.success(res.message || "Guest added.");

      setNewGuests((prev) => [
        ...prev,
        {
          email: newGuestEmail.trim(),
          startDate: newGuestStartDate,
          endDate: newGuestEndDate,
          studentCategory: newGuestCategory,
        },
      ]);

      setNewGuestEmail("");
      setNewGuestStartDate("");
      setNewGuestEndDate("");
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to add guest.";
      message.error(msg);
    }
  };

  const handleRemoveGuest = (index) => {
    const updated = [...existingGuests];
    updated.splice(index, 1);
    setExistingGuests(updated);
  };

  const saveChanges = async () => {
    try {
      const {
        _id,
        meetingTitle,
        nameOfTrainer,
        technology,
        meetingLink,
        startingTime,
        endingTime,
      } = editData;

      const updatedData = {
        meetingTitle,
        nameOfTrainer,
        technology,
        meetingLink,
        startingTime,
        endingTime,
      };

      await updateClassById(_id, updatedData);
      message.success("Class details updated.");
      setDrawerOpen(false);
      await fetchSchedule();
    } catch (err) {
      console.error("Save error:", err);
      message.error("Failed to save class changes.");
    }
  };

  const uniqueBatches = ["All", ...batchList];
  const displayedSchedules =
    selectedBatch === "All"
      ? Object.entries(scheduleData).flatMap(([batchName, items]) =>
          items.map((i) => ({ ...i, batchName }))
        )
      : scheduleData[selectedBatch] || [];

  return (
    <div className="mt-10 px-4">
      <div className="flex overflow-x-auto space-x-4 pb-4 border-b border-gray-300 mb-6 scrollbar-hide">
        {uniqueBatches.map((batch) => (
          <button
            key={batch}
            onClick={() => setSelectedBatch(batch)}
            className={`whitespace-nowrap px-4 py-2 rounded-full transition text-sm font-medium border ${
              selectedBatch === batch
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-100"
            }`}
          >
            {batch}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="max-h-[270px] overflow-y-auto pr-2 scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedBatch}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {displayedSchedules.map((sched, idx) => (
                <div
                  key={`${sched.name}-${sched.time}-${idx}`}
                  className="p-4 rounded-xl shadow-md hover:shadow-lg transition bg-blue-100"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <img src={image} alt="Avatar" className="h-10 w-10 rounded-full border object-cover" />
                    <div>
                      <h3 className="text-sm font-semibold text-blue-700">{sched.name}</h3>
                      <p className="text-xs text-blue-700">{sched.process}</p>
                      {selectedBatch === "All" && (
                        <p className="text-xs text-gray-500 italic">({sched.batchName})</p>
                      )}
                    </div>
                  </div>
                  <div className="text-xs flex justify-between mb-2 text-gray-700">
                    <span>Time:</span>
                    <span>{sched.time}</span>
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(sched)}
                      className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-700 shadow"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => confirmDelete(sched.batchName, idx)}
                      className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-700 shadow"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      <Drawer
        title="Edit Class"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={520}
        closeIcon={<X className="text-gray-600 hover:text-red-500" />}
      >
        {editData && (
          <div className="space-y-6">
            <LabelInputContainer><Label>Meeting Title</Label><Input value={editData.meetingTitle} onChange={(e) => handleEditChange("meetingTitle", e.target.value)} /></LabelInputContainer>
            <LabelInputContainer><Label>Trainer</Label><Input value={editData.nameOfTrainer} onChange={(e) => handleEditChange("nameOfTrainer", e.target.value)} /></LabelInputContainer>
            <LabelInputContainer><Label>Technology</Label><Input value={editData.technology} onChange={(e) => handleEditChange("technology", e.target.value)} /></LabelInputContainer>
            <LabelInputContainer><Label>Meeting Link</Label><Input value={editData.meetingLink} onChange={(e) => handleEditChange("meetingLink", e.target.value)} /></LabelInputContainer>

            <div className="grid grid-cols-2 gap-4">
              <LabelInputContainer>
                <Label>Start Time</Label>
                <Input
                  type="time"
                  value={dayjs(editData.startingTime).format("HH:mm")}
                  onChange={(e) => updateTime("startingTime", e.target.value)}
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label>End Time</Label>
                <Input
                  type="time"
                  value={dayjs(editData.endingTime).format("HH:mm")}
                  onChange={(e) => updateTime("endingTime", e.target.value)}
                />
              </LabelInputContainer>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <button
                onClick={saveChanges}
                className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
              >
                Save Class Changes
              </button>
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-semibold text-blue-600 mb-2">Add Guest</h3>
              <LabelInputContainer>
                <Label>Email</Label>
                <Input
                  value={newGuestEmail}
                  onChange={(e) => setNewGuestEmail(e.target.value)}
                  placeholder="guest@example.com"
                />
              </LabelInputContainer>
              <div className="grid grid-cols-2 gap-4">
                <LabelInputContainer>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={newGuestStartDate}
                    onChange={(e) => setNewGuestStartDate(e.target.value)}
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={newGuestEndDate}
                    onChange={(e) => setNewGuestEndDate(e.target.value)}
                  />
                </LabelInputContainer>
              </div>
              <LabelInputContainer>
                <Label>Category</Label>
                <select
                  value={newGuestCategory}
                  onChange={(e) => setNewGuestCategory(e.target.value)}
                  className="border rounded px-2 py-1 mt-1"
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </LabelInputContainer>
              <div className="mt-3">
                <button
                  onClick={handleAddNewGuest}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Add Guest
                </button>
              </div>
            </div>

            {newGuests.length > 0 && (
              <div className="mt-4 border-t pt-4 space-y-2">
                <h4 className="text-blue-600 font-semibold">New Guests:</h4>
                {newGuests.map((guest, index) => (
                  <div key={index} className="text-sm text-gray-700">
                    • {guest.email} ({guest.startDate} → {guest.endDate}, {guest.studentCategory})
                  </div>
                ))}
              </div>
            )}

            {existingGuests.length > 0 && (
              <div className="mt-4 border-t pt-4 space-y-2">
                <h4 className="text-red-600 font-semibold">Existing Guests:</h4>
                {existingGuests.map((guest, index) => (
                  <div key={index} className="text-sm text-gray-700 flex justify-between items-center">
                    <span>
                      • {guest.name} ({dayjs(guest.startDateOfGuest).format("YYYY-MM-DD")} → {dayjs(guest.endDateOfGuest).format("YYYY-MM-DD")}, {guest.studentCategory})
                    </span>
                    <button
                      onClick={() => handleRemoveGuest(index)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Drawer>

      <Modal
        title="Confirm Delete"
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onOk={async () => {
          try {
            const item = scheduleData[deleteBatch]?.[deleteIndex];
            if (!item?.meetingLink) {
              message.error("Meeting link is missing. Cannot delete.");
              return;
            }
            const res = await deleteClassByMeetingLink(item.meetingLink);
            const updated = { ...scheduleData };
            updated[deleteBatch] = updated[deleteBatch].filter((_, i) => i !== deleteIndex);
            if (!updated[deleteBatch].length) delete updated[deleteBatch];
            setScheduleData(updated);
            message.success(res.message || "Class deleted successfully.");
          } catch (err) {
            console.error("Delete failed:", err);
            message.error(err?.response?.data?.message || "Delete failed");
          } finally {
            setDeleteModalOpen(false);
          }
        }}
        okText="Yes, Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
        centered
      >
        <p>Are you sure you want to delete this schedule from <strong>{deleteBatch}</strong>?</p>
      </Modal>
    </div>
  );
};

export default AllClasses;
