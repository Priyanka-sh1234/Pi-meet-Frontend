"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import image from "../assets/boy.png";
import { getAllClasses } from "../api/allclasses"; // Adjust path if needed

export function Batchcard() {
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [batchData, setBatchData] = useState([]);
  const [scheduleData, setScheduleData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classes = await getAllClasses();

        const grouped = {};
        const trainers = {};
        classes.forEach((cls) => {
          const batch = cls.technology;
          const trainer = cls.nameOfTrainer;

          if (!grouped[batch]) grouped[batch] = [];

          const startTime = new Date(cls.startingTime);
          const endTime = new Date(cls.endingTime);

          const timeSlot = `${startTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })} - ${endTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`;

          grouped[batch].push({
            name: batch,
            time: timeSlot,
            process: "schedule", // or infer logic based on time if needed
          });

          trainers[batch] = trainer; // Store trainer per batch
        });

        const uniqueTrainerBatches = Object.keys(grouped).map((batch) => ({
          name: trainers[batch],
          batchname: batch,
        }));

        setScheduleData(grouped);
        setBatchData(uniqueTrainerBatches);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchData();
  }, []);

  const toggleBatch = (batchname) => {
    setSelectedBatch((prev) => (prev === batchname ? null : batchname));
  };

  return (
    <div
      className="max-h-[70vh] overflow-y-auto mt-20 py-4"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div className="flex flex-wrap justify-center gap-6 px-3 ">
        {batchData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col w-full sm:w-[calc(50%-0.75rem)] bg-white rounded-xl border border-gray-200 shadow-md transition hover:scale-[1.02] overflow-hidden"
            style={{ alignSelf: "flex-start" }}
          >
            {/* Header */}
            <div
              onClick={() => toggleBatch(item.batchname)}
              className="flex items-center space-x-3 px-4 py-3 cursor-pointer hover:bg-blue-100 hover:shadow-lg rounded-t-xl"
            >
              <img
                alt="Avatar"
                src={image}
                className="h-10 w-10 rounded-full border object-cover"
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-900">
                  {item.name}
                </p>
                <p className="text-xs text-gray-900">{item.batchname}</p>
              </div>
            </div>

            {/* Expandable Schedule */}
            <AnimatePresence initial={false}>
              {selectedBatch === item.batchname && (
                <motion.div
                  key="schedule"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-2 px-4 py-3 bg-gray-50 rounded-b-xl max-h-64 overflow-y-auto">
                    <h2 className="text-sm font-semibold text-gray-900 mb-1">
                      Schedule for {item.batchname}
                    </h2>
                    {scheduleData[item.batchname]?.map((sched, idx) => {
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
                          ? "text-orange-200"
                          : "text-blue-700";

                      return (
                        <div
                          key={idx}
                          className={`w-full p-3 rounded-lg shadow-sm transition hover:scale-[1.01] hover:shadow-md text-xs ${bgColor}`}
                        >
                          <div className={`font-medium mb-1 ${textColor}`}>
                            {sched.process}
                          </div>
                          <div className="flex justify-between text-xs text-gray-900">
                            <span>{sched.name}</span>
                            <span>{sched.time}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
