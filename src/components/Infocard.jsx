"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import image from "../assets/boy.png";

export function Infocard() {
  return (
    <CardContainer className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
      <CardBody
        className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] 
        dark:bg-black dark:border-white/[0.2] border-black/[0.1] 
        w-full rounded-xl p-4 sm:p-6 border"
      >
        <CardItem translateZ="40" className="w-full flex justify-center">
          <img
            src={image}
            className="h-24 w-24 sm:h-28 sm:w-28 object-cover rounded-full group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>

        <CardItem
          translateZ="40"
          className="text-base sm:text-lg font-bold mt-6 text-neutral-600 dark:text-white text-center"
        >
          Name: Amrit Pal Singh
        </CardItem>

        <CardItem
          as="p"
          translateZ="40"
          className="text-neutral-500 text-sm sm:text-base mt-2 dark:text-neutral-300 text-center"
        >
          MERN Stack Developer
        </CardItem>

        <CardItem
          as="p"
          translateZ="40"
          className="text-neutral-500 text-sm sm:text-base mt-2 dark:text-neutral-300 text-center"
        >
          EmployeeId: 235345
        </CardItem>

        <CardItem
          as="p"
          translateZ="40"
          className="text-neutral-500 text-sm sm:text-base mt-2 dark:text-neutral-300 text-center"
        >
          Email: amritpalsingh87@gmail.com
        </CardItem>

        <CardItem
          as="p"
          translateZ="40"
          className="text-neutral-500 text-sm sm:text-base mt-2 dark:text-neutral-300 text-center"
        >
          Mobile No.: 9134959293
        </CardItem>

        <CardItem
          as="p"
          translateZ="40"
          className="text-neutral-500 text-sm sm:text-base mt-2 dark:text-neutral-300 text-center"
        >
          Current Batches: 4
        </CardItem>

        <CardItem
          as="p"
          translateZ="40"
          className="text-neutral-500 text-sm sm:text-base mt-2 dark:text-neutral-300 text-center"
        >
          Experience: 4 Years
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
