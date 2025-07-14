"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import image from "../assets/boy.png";

export function Infocard() {
  return (
    <CardContainer className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
      <CardBody
        className="relative group/card w-full rounded-xl border p-4 sm:p-6 
        bg-white dark:bg-gray-900 
        border-gray-200 dark:border-gray-700 
        shadow-md dark:shadow-md 
        transition-all duration-300"
      >
        {/* Image */}
        <CardItem translateZ="40" className="w-full flex justify-center">
          <img
            src={image}
            alt="thumbnail"
            className="h-24 w-24 sm:h-28 sm:w-28 object-cover rounded-full group-hover/card:shadow-lg transition-all duration-300"
          />
        </CardItem>

        {/* Name */}
        <CardItem
          translateZ="40"
          className="text-lg sm:text-xl font-semibold mt-6 text-center text-gray-800 dark:text-white"
        >
          Name: Amrit Pal Singh
        </CardItem>

        {/* Role */}
        <CardItem
          as="p"
          translateZ="40"
          className="mt-2 text-sm sm:text-base text-center text-gray-600 dark:text-gray-300"
        >
          MERN Stack Developer
        </CardItem>

        {/* Employee ID */}
        <CardItem
          as="p"
          translateZ="40"
          className="mt-2 text-sm sm:text-base text-center text-gray-600 dark:text-gray-300"
        >
          Employee ID: 235345
        </CardItem>

        {/* Email */}
        <CardItem
          as="p"
          translateZ="40"
          className="mt-2 text-sm sm:text-base text-center text-gray-600 dark:text-gray-300"
        >
          Email: amritpalsingh87@gmail.com
        </CardItem>

        {/* Mobile No. */}
        <CardItem
          as="p"
          translateZ="40"
          className="mt-2 text-sm sm:text-base text-center text-gray-600 dark:text-gray-300"
        >
          Mobile No.: 9134959293
        </CardItem>

        {/* Batches */}
        <CardItem
          as="p"
          translateZ="40"
          className="mt-2 text-sm sm:text-base text-center text-gray-600 dark:text-gray-300"
        >
          Current Batches: 4
        </CardItem>

        {/* Experience */}
        <CardItem
          as="p"
          translateZ="40"
          className="mt-2 text-sm sm:text-base text-center text-gray-600 dark:text-gray-300"
        >
          Experience: 4 Years
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
