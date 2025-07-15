"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { Drawer, Modal, message } from "antd";
import image from "../../assets/boy.png";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "../lib/utils";
import { getAllClasses } from "../../api/allclasses";
import dayjs from "dayjs";

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>
);

const AllClasses = () => {
  const [selectedBatch, setSelectedBatch] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteBatch, setDeleteBatch] = useState("");
  const [scheduleData, setScheduleData] = useState({});
  const [batchList, setBatchList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSchedule = async () => {
    try {
      const data = await getAllClasses();
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
    } catch (err) {
      message.error("Failed to load schedule.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const confirmDelete = (batchName, index) => {
    setDeleteBatch(batchName);
    setDeleteIndex(index);
    setDeleteModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditData({
      ...item,
      guests: item.addGuest || [],
      newGuestEmail: "",
    });
    setDrawerOpen(true);
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
      {/* Batch Selector */}
      <div className="flex overflow-x-auto space-x-4 pb-4 border-b border-gray-300 mb-6 scrollbar-hide"
       style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}>
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

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="max-h-[270px] overflow-y-scroll pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
         style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedBatch}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {displayedSchedules.map((sched, idx) => {
                const process = sched.process?.toLowerCase();
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
                    key={`${sched.name}-${sched.time}-${idx}`}
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
                        {selectedBatch === "All" && (
                          <p className="text-xs text-gray-500 italic">
                            ({sched.batchName})
                          </p>
                        )}
                      </div>
                    </div>

                    <div className={`text-xs flex justify-between mb-2 ${process === "ongoing" ? "text-white" : "text-gray-700"}`}>
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
                      {selectedBatch !== "All" && (
                        <button
                          onClick={() => confirmDelete(selectedBatch, idx)}
                          className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-700 shadow"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Drawer */}
      <Drawer
        title={<div className="text-xl font-semibold text-blue-300">✏️ Edit Schedule</div>}
        placement="right"
        width={600}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closeIcon={<span className="text-white hover:text-red-400">✖</span>}
        bodyStyle={{ padding: 24, backgroundColor: "#111827", backdropFilter: "blur(10px)" }}
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
          </form>
        )}
      </Drawer>

      {/* Modal */}
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
        <p>
          Are you sure you want to delete this schedule from <strong>{deleteBatch}</strong>?
        </p>
      </Modal>
    </div>
  );
};

export default AllClasses;