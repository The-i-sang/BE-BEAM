import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { IoPeopleCircle } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import {
  BsFillCalendarCheckFill,
  BsPersonFill,
  BsFillCalendarDateFill,
  BsHeart,
} from "react-icons/bs";
import { ImPriceTag } from "react-icons/im";
import { AiFillPushpin } from "react-icons/ai";
import MeetingApplyReasonModal from "./MeetingApplyReasonModal";

export default function MeetingDetail() {
  const navigate = useNavigate();

  const {
    state: { activity },
  } = useLocation();
  console.log(activity);

  const [meetingApplyReasonModal, setMeetingApplyReasonModal] = useState(false);
  //false : 모달 안보임
  //모임 신청이유를 입력받는 모달 : 상태관리

  return (
    <div className="w-full pt-10 dark:bg-black dark:text-white font-light">
      <div className="w-11/12 max-w-[1400px] mx-auto">
        <div className="w-full flex items-center gap-x-2 sm:text-[1.1rem] text-[0.9rem] text-[#f5aa15] font-medium">
          <IoPeopleCircle className="text-[1.5rem]" />
          <p>{activity.type}</p>
        </div>

        <h1 className="sm:mt-3 mt-1 sm:text-[1.8rem] text-[1.5rem] font-semibold">
          {activity.title}
        </h1>

        <ul className="w-full mt-8 sm:grid md:grid-cols-4 sm:grid-cols-2 sm:text-[1.2rem] text-[1rem] text-[#616161] dark:text-[rgba(255,255,255,0.7)] font-medium">
          <li className="md:h-auto sm:h-[60px] md:mb-0 sm:mb-4 sm:p-0 py-4 box-border flex items-center gap-x-4 sm:border-r-[1px] sm:border-b-0 border-b-[1px] border-solid border-[#DADCE0]">
            <FaLocationDot className="sm:text-[1.8rem] text-[1.4rem] text-[#282828] dark:text-white" />
            <p>{activity.place}</p>
          </li>
          <li className="md:h-auto sm:h-[60px] md:mb-0 sm:mb-4 sm:px-3 sm:py-0 py-3 box-border md:border-r-[1px] sm:border-b-0 border-b-[1px] border-solid border-[#DADCE0] flex items-center gap-x-4">
            <BsFillCalendarCheckFill className="sm:text-[1.8rem] text-[1.4rem] text-[#282828] dark:text-white" />
            <p className="w-3/4">{activity.schedule}</p>
          </li>
          <li className="md:h-auto sm:h-[60px] md:mb-0 sm:mb-4 md:px-3 sm:pr-3 px-0 sm:py-0 py-3 box-border sm:border-r-[1px] sm:border-b-0 border-b-[1px] border-solid border-[#DADCE0] flex items-center gap-x-4">
            <BsPersonFill className="sm:text-[1.8rem] text-[1.4rem] text-[#282828] dark:text-white" />
            <p className="w-3/4">{activity.member}</p>
          </li>
          <li className="md:h-auto sm:h-[60px] md:mb-0 sm:mb-4 sm:pl-3 px-0 sm:py-0 py-3 box-border flex items-center gap-x-4">
            <ImPriceTag className="sm:text-[1.8rem] text-[1.4rem] text-[#282828] dark:text-white" />
            <p>{activity.price === 0 ? "무료" : activity.price + "원"}</p>
          </li>
        </ul>
      </div>

      <div className="w-11/12 mx-auto md:mt-16 sm:mt-8 mt-8 sm:mb-12 mb-5 flex md:flex-row sm:flex-col flex-col">
        <img
          className="lg:w-[600px] md:w-[460px] sm:w-full object-cover object-center"
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
        <div className="w-11/12 mx-auto sm:py-14 pt-5 pb-10 flex flex-col items-start">
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
        <div className="w-11/12 mx-auto sm:py-14 pt-5 pb-10 flex sm:flex-row flex-col">
          <h1 className="sm:w-1/5 w-full sm:mb-0 mb-4 sm:text-[1.5rem] text-[1.2rem] text-[#282828] dark:text-white font-semibold">
            모임 상세
          </h1>

          <ul>
            {activity.summary && (
              <li className="flex gap-x-2 dark:text-white sm:text-[1.12rem] text-[0.9rem]">
                <AiFillPushpin className="text-[1.8rem]" />
                <div className="text-[#111111] dark:text-white">
                  <p className="font-semibold">모집 개요</p>
                  <p className="mt-2 dark:text-[rgba(255,255,255,0.7)] sm:text-[1rem] text-[0.875rem]">
                    {activity.summary}
                  </p>
                </div>
              </li>
            )}

            <li className="sm:mt-10 mt-5 flex items-center gap-x-2 text-[#282828] dark:text-white sm:text-[1.12rem] text-[0.9rem]">
              <FaLocationDot className="sm:text-[1.8rem] text-[1.4rem]" />
              <p className="font-semibold">{activity.place}</p>
            </li>

            <li className="sm:mt-10 mt-5 flex items-center gap-x-2 text-[#282828] sm:text-[1.12rem] text-[0.9rem] dark:text-white">
              <BsFillCalendarCheckFill className="sm:text-[1.8rem] text-[1.4rem]" />
              <p className="font-semibold">{activity.schedule}</p>
            </li>

            <li className="sm:mt-10 mt-5 flex items-center gap-x-2 text-[#282828] dark:text-white sm:text-[1.12rem] text-[0.9rem]">
              <BsPersonFill className="sm:text-[1.8rem] text-[1.4rem]" />
              <p className="font-semibold">{activity.member}</p>
            </li>

            <li className="sm:mt-10 mt-5 flex gap-x-2 text-[#282828] dark:text-white sm:text-[1.12rem] text-[0.9rem]">
              <ImPriceTag className="sm:text-[1.8rem] text-[1.4rem]" />
              <div>
                <p className="font-semibold">{activity.detail_price}</p>
                <p className="dark:text-[rgba(255,255,255,0.7)] sm:text-[1rem] text-[0.875rem]">
                  {activity.price !== 0 &&
                    "입금계좌 : 참가 인원으로 뽑힐시, 토스뱅크 1000-5552-9626(비빔모임용_김성원)으로 입금."}
                </p>
              </div>
            </li>

            {activity.activitySchedule && (
              <li className="sm:mt-10 mt-5 flex gap-x-2 dark:text-white sm:text-[1.12rem] text-[0.9rem]">
                <BsFillCalendarDateFill className="sm:text-[1.8rem] text-[1.4rem]" />

                <div className="text-[#111111] dark:text-white">
                  <p className="font-semibold">활동일정</p>
                  <ul className="mt-2 sm:text-[1rem] text-[0.875rem] dark:text-[rgba(80,59,59,0.7)]">
                    {activity.activitySchedule?.map((a) => {
                      return <li className="sm:mb-0 mb-1">· {a}</li>;
                    })}
                  </ul>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="w-full bg-transparent dark:bg-black relative dark:shadow-[0_35px_60px_-15px_rgba(255,255,255,0.2)]">
        <div className="w-full h-1/2 bg-[#f6f6f6] dark:bg-[#282828] absolute bottom-0 left-0 z-[-999]" />

        <div className="w-11/12 mx-auto sm:py-14 pt-5 pb-10 text-[0.9rem] text-[#666]">
          <h1 className="sm:text-[1.5rem] text-[1.2rem] text-[#282828] dark:text-white font-semibold">
            우리 모임은 이렇게 즐겨요
          </h1>
          <p className="sm:mt-2 mt-1 dark:text-[rgba(255,255,255,0.7)] sm:text-[1rem] text-[0.875rem] font-medium">
            사진을 통해서 모임과 한 발자국 더 가까워지기!
          </p>

          <ul className="w-full sm:mt-8 mt-6 sm:grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-3 gap-y-3">
            {activity.image &&
              activity.image?.map((i) => {
                return (
                  <li className="sm:mb-0 mb-3">
                    <img
                      className="w-full object-cover rounded-lg"
                      src={process.env.PUBLIC_URL + i.replace("./", "/")}
                      alt="comunity_img"
                    />
                  </li>
                );
              })}
          </ul>
        </div>
      </div>

      <div className="w-full bg-transparent border-b-[1px] border-solid border-[#d0d0d0] dark:border-[#444]">
        <div className="w-11/12 mx-auto sm:py-14 pt-5 pb-10">
          <h1 className="sm:text-[1.5rem] text-[1.2rem] text-[#282828] dark:text-white font-semibold">
            안내사항
          </h1>

          <ul className="sm:mt-3 mt-1 sm:text-[1rem] text-[0.875rem]">
            {activity.info &&
              activity.info?.map((i) => {
                return <li>- {i}</li>;
              })}
          </ul>
        </div>
      </div>

      <div className="w-11/12 mx-auto sm:py-14 pt-5 pb-10 text-[0.9rem] text-[#666]">
        <h1 className="sm:text-[1.5rem] text-[1.2rem] text-[#282828] dark:text-white font-semibold">
          문의사항
        </h1>
        <p className="sm:mt-2 mt-1 dark:text-[rgba(255,255,255,0.7)] sm:text-[1rem] text-[0.875rem] font-medium">
          문의사항은 여기로 보내주세요.
        </p>

        <p className="sm:mt-4 mt-2 sm:text-[1rem] text-[0.875rem] text-black dark:text-white">
          {activity.request}
        </p>
      </div>

      <div className="w-full fixed bottom-6 left-0 flex justify-center items-center">
        <div className="w-11/12 max-w-[760px] p-4 box-border bg-white border-[1px] border-solid border-[#b0b0b0] rounded-lg flex">
          <div className="mr-[10px] flex-1">
            <h1 className="text-[#282828] font-semibold sm:text-[1rem] text-[0.875rem]">
              월{" "}
              <span className="sm:text-[1.5rem] text-[1.2rem]">
                {activity.price === 0 ? 0 : activity.price}
              </span>
              원
            </h1>
            <p className="text-[#999999] sm:text-[1rem] text-[0.875rem]">
              월 {activity.price === 0 ? 0 : activity.price}원
            </p>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();

              if (activity.state === "모집 마감") {
                return;
              } else {
                // navigate("/applyForm");
                setMeetingApplyReasonModal(true);
              }
            }}
            className="w-full flex-1 bg-[#282828] rounded-lg round text-white sm:text-[1rem] text-[0.875rem]"
          >
            <p>
              {activity.state === "모집 마감"
                ? "모집 마감"
                : "모집 중 [신청폼으로 이동]"}
            </p>
          </button>
          <button className="w-[60px] h-[60px] p-2 box-border ml-[6px] border-[1px] border-solid border-[#b0b0b0] rounded-lg flex flex-col items-center justify-center text-[0.7rem] font-semibold dark:text-black">
            <BsHeart className="text-[1.2rem]" />
            <p className="mt-1 leading-none">찜 0</p>
          </button>
        </div>
      </div>

      <MeetingApplyReasonModal
        meetingApplyReasonModal={meetingApplyReasonModal}
        setMeetingApplyReasonModal={setMeetingApplyReasonModal}
      />
    </div>
  );
}
