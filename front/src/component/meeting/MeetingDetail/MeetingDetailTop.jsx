import TopSmallContent from "./TopSmallContent";

import { IoPeopleCircle } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillCalendarCheckFill, BsPersonFill } from "react-icons/bs";
import { ImPriceTag } from "react-icons/im";
import { formatDateAndTime } from "../../../common";

export default function MeetingDetailTop({ data }) {
  const price =
    data?.paymentAmount === 0 ? "무료" : `월 ${data?.paymentAmount}원`;

  const basicStyle =
    "md:h-auto sm:h-[60px] md:mb-0 sm:mb-4 sm:p-0 py-4 border-[#DADCE0]";
  const iconStyle = "lg:w-auto md:w-[20%] sm:text-[1.8rem] text-[1.4rem]";
  const textStyle = "lg:w-auto md:w-[80%]";

  return (
    <div className="w-11/12 max-w-[90%] mx-auto sm:text-[1.2rem] text-[1rem]">
      <p className="mb-6 animate-blink">
        현재
        <span className="text-[1.5rem] text-mainColor">
          {` ${data?.participantCount}명`}
        </span>
        이 모임에 참여 중이에요!
      </p>

      <div className="w-full flex items-center gap-x-2 text-[1.5rem] text-mainColor font-medium">
        <IoPeopleCircle />
        <p className="sm:text-[1.1rem] text-[0.9rem]">{data?.finish_type}</p>
      </div>

      <h1 className="sm:mt-3 mt-1 sm:text-[1.8rem] text-[1.5rem] font-semibold">
        {data?.name}
      </h1>

      <ul className="w-full mt-8 font-medium sm:grid md:grid-cols-4 sm:grid-cols-2 text-text-light-80 dark:text-text-dark-10">
        <TopSmallContent
          icon={<FaLocationDot />}
          title={data?.location}
          styles={`${basicStyle} sm:border-r-[1px] sm:border-b-0 border-b-[1px]`}
          iconStyle={iconStyle}
          textStyle={textStyle}
          type="meetingDetail"
        />
        <TopSmallContent
          icon={<BsFillCalendarCheckFill />}
          title={`${formatDateAndTime(data?.meetingDatetime)} 모집 마감`}
          styles={`${basicStyle} md:border-r-[1px] sm:px-4 sm:border-b-0 border-b-[1px]`}
          iconStyle={iconStyle}
          textStyle={textStyle}
          type="meetingDetail"
        />
        <TopSmallContent
          icon={<BsPersonFill />}
          title={`최소 ${data?.minParticipants}명, 최대 ${data?.maxParticipants}명`}
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
