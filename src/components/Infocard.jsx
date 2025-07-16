"use client";
import React, { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "../store/atoms";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import image from "../assets/boy.png";
import axiosInstance from "../../axiosinstance";

export default function Infocard() {
  const user = useAtomValue(userAtom);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user || user.role === "Admin") return; // ❌ Don't fetch if Admin
      try {
        const res = await axiosInstance.get(
          `/trainer/getTrainerDetails?TrainerId=${user.TrainerId}`
        );
        setProfile(res.data.trainer);
      } catch (error) {
        console.error("Error fetching trainer profile:", error);
      }
    };

    fetchProfile();
  }, [user]);

  const isAdmin = user?.role === "Admin";

  return (
    <CardContainer className="w-full min-w-[250px] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">

      <CardBody
        className="relative group/card w-full rounded-xl border p-4 sm:p-6 
        bg-white dark:bg-gray-900 
        border-gray-200 dark:border-gray-700 
        shadow-md dark:shadow-md 
        transition-all duration-300"
      >
        <CardItem translateZ="40" className="w-full flex justify-center">
          <img
            src={image}
            alt="Profile"
            className="h-24 w-24 sm:h-28 sm:w-28 object-cover rounded-full group-hover/card:shadow-lg transition-all duration-300"
          />
        </CardItem>

        <CardItem
          translateZ="40"
          className="text-lg sm:text-xl font-semibold mt-6 text-center text-gray-800 dark:text-white"
        >
          {isAdmin ? "Admin Panel" : `Name: ${profile?.name}`}
        </CardItem>

        {isAdmin ? (
          <CardItem
            as="p"
            translateZ="40"
            className="mt-2 text-sm sm:text-base text-center text-gray-600 dark:text-gray-300"
          >
            Welcome, Admin!
          </CardItem>
        ) : profile ? (
          <>
            <CardItem
              as="p"
              translateZ="40"
              className="mt-1 text-sm sm:text-base text-center text-gray-600 dark:text-gray-300"
            >
              Role: {profile.role}
            </CardItem>
            <CardItem
              as="p"
              translateZ="40"
              className="mt-1 text-sm sm:text-base text-center text-gray-600 dark:text-gray-300"
            >
              Employee ID: {profile.TrainerId}
            </CardItem>
            <CardItem
              as="p"
              translateZ="40"
              className="mt-1 text-sm sm:text-base text-center text-gray-600 dark:text-gray-300"
            >
              Email: {profile.email}
            </CardItem>
            <CardItem
              as="p"
              translateZ="40"
              className="mt-1 text-sm sm:text-base text-center text-gray-600 dark:text-gray-300"
            >
              Mobile No.: {profile.phone || profile.mobile || "N/A"}
            </CardItem>
            <CardItem
              as="p"
              translateZ="40"
              className="mt-1 text-sm sm:text-base text-center text-gray-600 dark:text-gray-300"
            >
              Current Batches: {profile.batch?.length || 0}
            </CardItem>
            <CardItem
              as="p"
              translateZ="40"
              className="mt-1 text-sm sm:text-base text-center text-gray-600 dark:text-gray-300"
            >
              Experience: {profile.experience || "N/A"}
            </CardItem>
          </>
        ) : (
          <p className="text-center text-white mt-2">Loading profile...</p>
        )}
      </CardBody>
    </CardContainer>
  );
}
