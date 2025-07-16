"use client";
import React, { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "../store/atoms";
import { getTrainerBatches } from "../api/trainerApi";
import dayjs from "dayjs";

const Batches = () => {
  const user = useAtomValue(userAtom);
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const trainerId = user?.TrainerId;
        if (!trainerId) return;

        const data = await getTrainerBatches(trainerId);
        setBatches(data);
      } catch (err) {
        console.error("Failed to fetch batches:", err);
      }
    };

    fetchBatches();
  }, [user]);

  return (
    <div className="mt-10">
      <h1 className="text-lg font-bold text-neutral-600 mb-2">
        Current Schedule Batches
      </h1>

      {/* Scrollable container */}
      <div
        className="max-h-70 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 space-y-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {batches.map((item, index) => {
          const process = item.process?.toLowerCase() || "schedule";
          let processTextColor = "";
          let processBgColor = "";

          if (process === "done") {
            processTextColor = "text-green-600";
            processBgColor = "bg-green-50";
          } else if (process === "ongoing") {
            processTextColor = "text-orange-200";
            processBgColor = "bg-blue-900";
          } else {
            processTextColor = "text-blue-600";
            processBgColor = "bg-blue-100";
          }

          return (
            <div
              key={item._id}
              className={`w-120 p-2 m-5 rounded-xl shadow-md 
                ${processBgColor} text-gray-900
                transition duration-200 transform hover:scale-102 hover:shadow-lg cursor-pointer`}
            >
              <div className={`text-sm font-semibold mb-2 capitalize ${processTextColor}`}>
                {item.process || "Schedule"}
              </div>

              <div className="flex justify-between items-center text-md">
                <span className="font-medium">
                  {item.meetingTitle || "Untitled Batch"}
                </span>
                <span className="text-sm text-gray-900">
                  {dayjs(item.startingTime).format("hh:mm A")} -{" "}
                  {dayjs(item.endingTime).format("hh:mm A")}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Button as link to open in new tab */}
      <div className="flex justify-center pr-5">
        <a
          href="http://localhost:5174/new-meeting"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            className="w-10 h-10 flex items-center pb-1 justify-center font-semibold text-2xl text-white bg-gradient-to-tr from-gray-800 to-gray-600 rounded-full shadow-md mt-2 hover:scale-110 hover:shadow-lg hover:from-gray-700 hover:to-gray-500 transition-all duration-200"
            aria-label="Add"
          >
            +
          </button>
        </a>
      </div>
    </div>
  );
};

export default Batches;
