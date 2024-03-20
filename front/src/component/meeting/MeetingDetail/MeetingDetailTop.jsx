import React from "react";
import TopSmallContent from "./TopSmallContent";

import { IoPeopleCircle } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillCalendarCheckFill, BsPersonFill } from "react-icons/bs";
import { ImPriceTag } from "react-icons/im";

export default function MeetingDetailTop({ activity }) {
  const price = activity.price === 0 ? "무료" : activity.price + "원";

  return (
    <div className="w-11/12 max-w-[90%] mx-auto">
      <div className="w-full flex items-center gap-x-2 sm:text-[1.1rem] text-[0.9rem] text-[#f5aa15] font-medium">
        <IoPeopleCircle className="text-[1.5rem]" />
        <p>{activity.type}</p>
      </div>

      <h1 className="sm:mt-3 mt-1 sm:text-[1.8rem] text-[1.5rem] font-semibold">
        {activity.title}
      </h1>

      <ul className="w-full mt-8 sm:grid md:grid-cols-4 sm:grid-cols-2 sm:text-[1.2rem] text-[1rem] text-[#616161] dark:text-[rgba(255,255,255,0.7)] font-medium">
        <TopSmallContent
          icon={<FaLocationDot />}
          title={activity.place}
          mdStyle="md:mb-0"
          smStyle="sm:mb-4 sm:border-r-[1px] sm:border-b-0"
          basicStyle="border-b-[1px]"
        />
        <TopSmallContent
          icon={<BsFillCalendarCheckFill />}
          title={activity.schedule}
          mdStyle="md:mb-0 md:border-r-[1px]"
          smStyle="sm:mb-4 sm:px-4 sm:border-b-0"
          basicStyle="border-b-[1px]"
        />
        <TopSmallContent
          icon={<BsPersonFill />}
          title={activity.member}
          mdStyle="md:px-4"
          smStyle="sm:border-r-[1px] sm:border-b-0"
          basicStyle="border-b-[1px]"
        />
        <TopSmallContent
          icon={<ImPriceTag />}
          title={price}
          smStyle="sm:px-4 sm:border-b-0"
        />
      </ul>
    </div>
  );
}
