import MeetingDetailSmallContent from "./MeetingDetailSmallContent";
import SubTitle from "./SubTitle";

import { FaLocationDot } from "react-icons/fa6";
import {
  BsFillCalendarCheckFill,
  BsPersonFill,
  BsFillCalendarDateFill,
} from "react-icons/bs";
import { ImPriceTag } from "react-icons/im";
import { AiFillPushpin } from "react-icons/ai";

export default function MeetingDetailContent({ activity }) {
  return (
    <div>
      <div className="w-11/12 sm:max-w-[90%] mx-auto md:mt-16 sm:mt-8 mt-8 sm:mb-12 mb-5 flex md:flex-row sm:flex-col flex-col">
        <img
          className="lg:w-[600px] md:w-[460px] sm:w-full object-cover object-center rounded-lg"
          src={process.env.PUBLIC_URL + activity.thumbnail.replace("./", "/")}
          alt="img"
        />
        <div className="md:px-10 sm:px-0 sm:py-5 py-5 box-border sm:text-[1rem] text-[0.875rem]">
          <p className="font-semibold">모임의 host, {activity.host}</p>
          <p className="sm:mt-4 mt-2 whitespace-pre-line">
            {activity.host_desc}
          </p>
        </div>
      </div>

      <div className="w-full bg-[#f6f6f6] dark:bg-[#191919]">
        <div className="w-11/12 sm:max-w-[90%] mx-auto sm:py-14 pt-5 pb-10 flex flex-col items-start">
          <h1 className="sm:text-[1.5rem] text-[1.2rem] text-[#282828] dark:text-white font-semibold">
            모임소개
          </h1>
          <div className="w-full sm:mt-3 mt-2 flex sm:flex-row flex-col justify-between sm:text-[1rem] text-[0.875rem]">
            <p className="md:w-2/5 sm:w-3/5 w-full sm:mb-0 mb-5 sm:pr-4 box-border">
              {activity.description}
            </p>
            <img
              className="md:w-[384px] sm:w-[320px] w-full rounded-lg shadow-[24px_22px_10px_-15px_rgba(0,0,0,0.2)]"
              src={
                process.env.PUBLIC_URL + activity.image[0].replace("./", "/")
              }
              alt="comunity_desc_img"
            />
          </div>
        </div>
      </div>

      <div className="w-full border-b-[1px] border-solid border-[#d0d0d0] dark:border-[#444] flex gap-x-10">
        <div className="w-11/12 sm:max-w-[90%] mx-auto sm:py-14 pt-5 pb-10 flex sm:flex-row sm:gap-x-4 flex-col">
          <SubTitle title="모임 상세" />

          <ul className="sm:mt-0 mt-4">
            <MeetingDetailSmallContent
              hiddenBoolean={!activity.summary}
              firstContent={true}
              icon={<AiFillPushpin />}
              subTitle="모집 개요"
              des={activity.summary}
            />

            <MeetingDetailSmallContent
              icon={<FaLocationDot />}
              subTitle={activity.place}
            />

            <MeetingDetailSmallContent
              icon={<BsFillCalendarCheckFill />}
              subTitle={activity.schedule}
            />

            <MeetingDetailSmallContent
              icon={<BsPersonFill />}
              subTitle={activity.member}
            />

            <MeetingDetailSmallContent
              icon={<ImPriceTag />}
              subTitle={activity.detail_price}
              des={
                activity.price !== 0
                  ? "입금계좌 : 참가 인원으로 뽑힐시, 토스뱅크 1000-5552-9626(비빔모임용_김성원)으로 입금."
                  : null
              }
            />

            <MeetingDetailSmallContent
              icon={<BsFillCalendarDateFill />}
              subTitle="활동일정"
              des={activity.activitySchedule}
            />
          </ul>
        </div>
      </div>

      <div className="w-full bg-transparent dark:bg-black relative dark:shadow-[0_35px_60px_-15px_rgba(255,255,255,0.2)]">
        <div className="w-full h-1/2 bg-[#f6f6f6] dark:bg-[#282828] absolute bottom-0 left-0 z-[-999]" />

        <div className="w-11/12 sm:max-w-[90%] mx-auto sm:py-14 pt-5 pb-10 text-[0.9rem] text-[#666]">
          <SubTitle
            title="우리 모임은 이렇게 즐겨요"
            des="사진을 통해서 모임과 한 발자국 더 가까워지기!"
          />

          <ul className="w-full sm:mt-8 mt-6 sm:grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-3 gap-y-3">
            {activity.image?.map((i) => (
              <li className="sm:mb-0 mb-3">
                <img
                  className="w-full object-cover rounded-lg"
                  src={process.env.PUBLIC_URL + i.replace("./", "/")}
                  alt="community_img"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full bg-transparent border-b-[1px] border-solid border-[#d0d0d0] dark:border-[#444]">
        <div className="w-11/12 sm:max-w-[90%] mx-auto sm:py-14 pt-5 pb-10">
          <SubTitle title="안내사항" />

          <ul className="sm:mt-3 mt-1 sm:text-[1rem] text-[0.875rem]">
            {activity.info?.map((i) => (
              <li>- {i}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-11/12 sm:max-w-[90%] mx-auto sm:py-14 pt-5 pb-10 text-[0.9rem] text-[#666]">
        <SubTitle title="문의사항" des="문의사항은 여기로 보내주세요." />

        <p className="sm:mt-4 mt-2 sm:text-[1rem] text-[0.875rem] text-black dark:text-white">
          {activity.request}
        </p>
      </div>
    </div>
  );
}
