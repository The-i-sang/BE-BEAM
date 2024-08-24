import TopSmallContent from "./TopSmallContent";

import { IoPeopleCircle } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillCalendarCheckFill, BsPersonFill } from "react-icons/bs";
import { ImPriceTag } from "react-icons/im";

export default function MeetingDetailTop({ activity }) {
  const price = activity.price === 0 ? "무료" : activity.price + "원";

  const basicStyle =
    "md:h-auto sm:h-[60px] md:mb-0 sm:mb-4 sm:p-0 py-4 border-[#DADCE0]";
  const iconStyle = "lg:w-auto md:w-[20%] sm:text-[1.8rem] text-[1.4rem]";
  const textStyle = "lg:w-auto md:w-[80%]";

  return (
    <div className="w-11/12 max-w-[90%] mx-auto sm:text-[1.2rem] text-[1rem]">
      <div className="w-full flex items-center gap-x-2 text-[1.5rem] text-[#f5aa15] font-medium">
        <IoPeopleCircle />
        <p className="sm:text-[1.1rem] text-[0.9rem]">{activity.type}</p>
      </div>

      <h1 className="sm:mt-3 mt-1 sm:text-[1.8rem] text-[1.5rem] font-semibold">
        {activity.title}
      </h1>

      <ul className="w-full mt-8 font-medium sm:grid md:grid-cols-4 sm:grid-cols-2 text-text-light-80 dark:text-text-dark-10">
        <TopSmallContent
          icon={<FaLocationDot />}
          title={activity.place}
          styles={`${basicStyle} sm:border-r-[1px] sm:border-b-0 border-b-[1px]`}
          iconStyle={iconStyle}
          textStyle={textStyle}
          type="meetingDetail"
        />
        <TopSmallContent
          icon={<BsFillCalendarCheckFill />}
          title={activity.schedule}
          styles={`${basicStyle} md:border-r-[1px] sm:px-4 sm:border-b-0 border-b-[1px]`}
          iconStyle={iconStyle}
          textStyle={textStyle}
          type="meetingDetail"
        />
        <TopSmallContent
          icon={<BsPersonFill />}
          title={activity.member}
          styles={`${basicStyle} md:px-4 sm:border-r-[1px] sm:border-b-0 border-b-[1px]`}
          iconStyle={iconStyle}
          textStyle={textStyle}
          type="meetingDetail"
        />
        <TopSmallContent
          icon={<ImPriceTag />}
          title={price}
          styles={`${basicStyle} sm:px-4 sm:border-b-0`}
          iconStyle={iconStyle}
          textStyle={textStyle}
          type="meetingDetail"
        />
      </ul>
    </div>
  );
}
