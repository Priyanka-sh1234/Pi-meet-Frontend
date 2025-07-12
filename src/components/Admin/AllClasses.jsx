"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { Drawer, Modal, message } from "antd";
import image from "../../assets/boy.png";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "../lib/utils";

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>
);

const AllClasses = () => {
  const [selectedBatch, setSelectedBatch] = useState("Mern Stack");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteBatch, setDeleteBatch] = useState("");

  const batch = [
    { name: "Amrit pal Singh", batchname: "Mern Stack" },
    { name: "Komalpreet Singh", batchname: "Python" },
    { name: "Aman Badyal", batchname: "Java" },
    { name: "Rahul", batchname: "Data Analytics" },
    { name: "Sujal", batchname: "Graphic Designing" },
    { name: "Roshan", batchname: "Digital Marketing" },
  ];

  const initialScheduleData = {
    "Mern Stack": [
      { name: "Mern Stack", time: "9Am - 11Am", process: "Done" },
      { name: "Mern Stack", time: "11Am - 1Pm", process: "ongoing" },
      { name: "Mern Stack", time: "2Pm - 4Pm", process: "schedule" },
    ],
    Python: [{ name: "Python", time: "10Am - 12Pm", process: "done" }],
    Java: [{ name: "Java", time: "8Am - 10Am", process: "ongoing" }],
    "Data Analytics": [{ name: "Data Analytics", time: "3Pm - 5Pm", process: "schedule" }],
    "Graphic Designing": [{ name: "Graphic Designing", time: "11Am - 1Pm", process: "ongoing" }],
    "Digital Marketing": [{ name: "Digital Marketing", time: "12Pm - 2Pm", process: "schedule" }],
  };

  const [scheduleData, setScheduleData] = useState(initialScheduleData);
  const uniqueBatches = [...new Set(batch.map((b) => b.batchname))];

  const confirmDelete = (batchName, index) => {
    setDeleteBatch(batchName);
    setDeleteIndex(index);
    setDeleteModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditData({
      ...item,
      guests: [],
      newGuestEmail: "",
      newGuestFrom: null,
      newGuestTo: null,
    });
    setDrawerOpen(true);
  };

  return (
    <div className="mt-10 px-4">
      {/* Batch Selector */}
      <div
        className="flex overflow-x-auto space-x-4 pb-4 border-b border-gray-300 mb-6 scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {uniqueBatches.map((batchname) => (
          <button
            key={batchname}
            onClick={() => setSelectedBatch(batchname)}
            className={`whitespace-nowrap px-4 py-2 rounded-full transition text-sm font-medium border ${
              selectedBatch === batchname
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-100"
            }`}
          >
            {batchname}
          </button>
        ))}
      </div>

      {/* Class Cards */}
      <div
        className="max-h-[270px] overflow-y-scroll pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedBatch}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {scheduleData[selectedBatch]?.map((sched, idx) => {
              const process = sched.process.toLowerCase();
              const bgColor =
                process === "done"
                  ? "bg-green-100"
                  : process === "ongoing"
                  ? "bg-blue-900"
                  : "bg-blue-100";
              const textColor =
                process === "done"
                  ? "text-green-700"
                  : process === "ongoing"
                  ? "text-white"
                  : "text-blue-700";

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl shadow-md hover:shadow-lg transition ${bgColor}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={image}
                      alt="Avatar"
                      className="h-10 w-10 rounded-full border object-cover"
                    />
                    <div>
                      <h3 className={`text-sm font-semibold ${textColor}`}>
                        {sched.name}
                      </h3>
                      <p className={`text-xs ${textColor}`}>{sched.process}</p>
                    </div>
                  </div>

                  <div
                    className={`text-xs flex justify-between mb-2 ${
                      process === "ongoing" ? "text-white" : "text-gray-700"
                    }`}
                  >
                    <span>Time:</span>
                    <span>{sched.time}</span>
                  </div>

                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(sched)}
                      className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 text-yellow-700 shadow"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => confirmDelete(selectedBatch, idx)}
                      className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-700 shadow"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Edit Drawer */}
      <Drawer
        title={<div className="text-xl font-semibold text-blue-300">✏️ Edit Schedule</div>}
        placement="right"
        width={600}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closeIcon={<span className="text-white hover:text-red-400">✖</span>}
        bodyStyle={{
          padding: 24,
          backgroundColor: "#E5E5E5",
          backdropFilter: "blur(10px)",
        }}
      >
        {editData && (
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
            <LabelInputContainer>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={editData.name} readOnly disabled />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="status">Status</Label>
              <Input id="status" value={editData.process} readOnly disabled />
            </LabelInputContainer>

            <LabelInputContainer className="md:col-span-2">
              <Label htmlFor="time">Time</Label>
              <Input id="time" value={editData.time} readOnly disabled />
            </LabelInputContainer>

            <div className="col-span-1 md:col-span-2 mt-4 border-t border-white/10 pt-4">
              <Label className="text-blue-300 font-semibold">Add Guest</Label>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  placeholder="Guest Email"
                  value={editData.newGuestEmail || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, newGuestEmail: e.target.value })
                  }
                />
                <Input
                  type="date"
                  value={
                    editData.newGuestFrom
                      ? editData.newGuestFrom.toISOString().substring(0, 10)
                      : ""
                  }
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      newGuestFrom: new Date(e.target.value),
                    })
                  }
                />
                <Input
                  type="date"
                  value={
                    editData.newGuestTo
                      ? editData.newGuestTo.toISOString().substring(0, 10)
                      : ""
                  }
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      newGuestTo: new Date(e.target.value),
                    })
                  }
                />
              </div>

              <button
                type="button"
                className="mt-3 w-full bg-gray-950 hover:bg-gray-900 text-white font-medium py-2 rounded-md transition"
                onClick={() => {
                  if (
                    editData.newGuestEmail &&
                    editData.newGuestFrom &&
                    editData.newGuestTo
                  ) {
                    const newGuest = {
                      email: editData.newGuestEmail,
                      from: editData.newGuestFrom,
                      to: editData.newGuestTo,
                    };
                    setEditData({
                      ...editData,
                      guests: [...(editData.guests || []), newGuest],
                      newGuestEmail: "",
                      newGuestFrom: null,
                      newGuestTo: null,
                    });
                  }
                }}
              >
                Add Guest
              </button>
            </div>

            {/* Guest List */}
            {editData.guests?.length > 0 && (
              <div className="col-span-1 md:col-span-2 pt-3 border-t border-white/10">
                <h4 className="text-blue-300 font-semibold mb-2">Guest List</h4>
                <ul className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  <AnimatePresence>
                    {editData.guests.map((g, i) => (
                      <motion.li
                        key={g.email}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="flex justify-between items-center bg-gray-900 px-3 py-2 rounded-md shadow-md backdrop-blur-md"
                      >
                        <div>
                          <p className="text-sm font-medium text-blue-200">{g.email}</p>
                          <p className="text-xs text-gray-300">
                            {g.from.toDateString()} → {g.to.toDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            const updatedGuests = [...editData.guests];
                            updatedGuests.splice(i, 1);
                            setEditData({ ...editData, guests: updatedGuests });
                          }}
                          className="text-red-400 hover:text-red-600 text-sm"
                          title="Remove Guest"
                        >
                          ❌
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </div>
            )}
          </form>
        )}
      </Drawer>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={deleteModalOpen}
        onCancel={() => {
          setDeleteModalOpen(false);
          setDeleteBatch("");
          setDeleteIndex(null);
        }}
        onOk={() => {
          const updated = { ...scheduleData };
          updated[deleteBatch] = updated[deleteBatch].filter((_, i) => i !== deleteIndex);
          setScheduleData(updated);
          setDeleteModalOpen(false);
          setDeleteBatch("");
          setDeleteIndex(null);
          message.success("Schedule deleted");
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
