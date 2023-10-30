import React from "react";
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

export default function ActivityDetail() {
  const navigate = useNavigate();

  const {
    state: { activity },
  } = useLocation();
  console.log(activity);

  return (
    <div className="w-full pt-10 dark:bg-black dark:text-white">
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="w-full flex items-center gap-x-2 text-[1.1rem] text-[#f5aa15]">
          <IoPeopleCircle className="text-[1.5rem]" />
          <p>{activity.type}</p>
        </div>

        <h1 className="mt-3 text-[1.8rem] font-semibold">{activity.title}</h1>

        <ul className="w-full mt-8 flex items-center text-[1.2rem] text-[#616161] dark:text-[rgba(255,255,255,0.7)]">
          <li className="w-1/4 flex items-center gap-x-4 border-r-[1px] border-solid border-[#DADCE0]">
            <FaLocationDot className="text-[1.8rem] text-[#282828] dark:text-white" />
            <p>{activity.place}</p>
          </li>
          <li className="w-1/4 px-6 box-border border-r-[1px] border-solid border-[#DADCE0] flex items-center gap-x-4">
            <BsFillCalendarCheckFill className="text-[1.8rem] text-[#282828] dark:text-white" />
            <p>{activity.schedule}</p>
          </li>
          <li className="w-1/4 border-r-[1px] border-solid border-[#DADCE0] flex items-center gap-x-4">
            <BsPersonFill className="w-1/4 text-[1.8rem] text-[#282828] dark:text-white" />
            <p className="w-3/4">{activity.member}</p>
          </li>
          <li className="w-1/4 px-6 box-border flex items-center gap-x-4">
            <ImPriceTag className="text-[1.8rem] text-[#282828] dark:text-white" />
            <p>{activity.price === 0 ? "무료" : activity.price + "원"}</p>
          </li>
        </ul>
      </div>

      <div className="w-11/12 mx-auto mt-16 mb-12 flex">
        <img
          className="w-[46%] object-cover object-center"
          src={process.env.PUBLIC_URL + `/../${activity.thumbnail}`}
          alt="img"
        />
        <div className="w-[54%] px-10 box-border">
          <p className="font-semibold">모임의 host, {activity.host}</p>
          <p className="mt-4 whitespace-pre-line">{activity.host_desc}</p>
        </div>
      </div>

      <div className="w-full bg-[#f6f6f6] dark:bg-[#191919]">
        <div className="w-11/12 mx-auto py-14 flex flex-col items-start">
          <h1 className="text-[1.5rem] text-[#282828] dark:text-white font-semibold">
            모임소개
          </h1>
          <div className="w-full mt-3 flex justify-between">
            <p className="w-2/5 ">{activity.description}</p>
            <img
              className="w-96 rounded-lg shadow-[24px_22px_10px_-15px_rgba(0,0,0,0.2)]"
              src={process.env.PUBLIC_URL + `/../${activity.image[0]}`}
              alt="comunity_desc_img"
            />
          </div>
        </div>
      </div>

      <div className="w-full border-b-[1px] border-solid border-[#d0d0d0] dark:border-[#444] flex gap-x-10">
        <div className="w-11/12 mx-auto py-14 flex ">
          <h1 className="w-1/5 text-[1.5rem] text-[#282828] dark:text-white font-semibold">
            모임 상세
          </h1>

          <ul>
            {activity.summary && (
              <li className="flex gap-x-2 dark:text-white">
                <AiFillPushpin className="text-[1.8rem]" />
                <div className="text-[#111111] dark:text-white text-[1.12rem]">
                  <p className="font-semibold">모집 개요</p>
                  <p className="mt-2 text-[1rem] dark:text-[rgba(255,255,255,0.7)]">
                    {activity.summary}
                  </p>
                </div>
              </li>
            )}

            <li className="mt-10 flex items-center gap-x-2 text-[#282828] dark:text-white text-[1.12rem]">
              <FaLocationDot className="text-[1.8rem]" />
              <p className="font-semibold">{activity.place}</p>
            </li>

            <li className="mt-10 flex items-center gap-x-2 text-[#282828] text-[1.12rem] dark:text-white">
              <BsFillCalendarCheckFill className="text-[1.8rem]" />
              <p className="font-semibold">{activity.schedule}</p>
            </li>

            <li className="mt-10 flex items-center gap-x-2 text-[#282828] dark:text-white text-[1.12rem]">
              <BsPersonFill className="text-[1.8rem]" />
              <p className="font-semibold">{activity.member}</p>
            </li>

            <li className="mt-10 flex gap-x-2 text-[#282828] dark:text-white text-[1.12rem]">
              <ImPriceTag className="text-[1.8rem]" />
              <div>
                <p className="font-semibold">{activity.detail_price}</p>
                <p className="dark:text-[rgba(255,255,255,0.7)]">
                  {activity.price !== 0 &&
                    "입금계좌 : 참가 인원으로 뽑힐시, 토스뱅크 1000-5552-9626(비빔모임용_김성원)으로 입금."}
                </p>
              </div>
            </li>

            {activity.activitySchedule && (
              <li className="mt-10 flex gap-x-2 dark:text-white">
                <BsFillCalendarDateFill className="text-[1.8rem]" />

                <div className="text-[#111111] dark:text-white text-[1.12rem]">
                  <p className="font-semibold">활동일정</p>
                  <ul className="mt-2 text-[1rem] dark:text-[rgba(255,255,255,0.7)]">
                    {activity.activitySchedule?.map((a) => {
                      return <li>· {a}</li>;
                    })}
                  </ul>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="w-full bg-transparent dark:bg-transparent relative">
        <div className="w-full h-1/2 bg-[#f6f6f6] dark:bg-[#282828] absolute bottom-0 left-0 z-[-999]" />

        <div className="w-11/12 mx-auto py-14 text-[0.9rem] text-[#666]">
          <h1 className="text-[1.5rem] text-[#282828] dark:text-white font-semibold">
            우리 모임은 이렇게 즐겨요
          </h1>
          <p className="mt-2 dark:text-[rgba(255,255,255,0.7)]">
            사진을 통해서 모임과 한 발자국 더 가까워지기!
          </p>

          <ul className="w-full mt-8 grid grid-cols-5 gap-x-3 gap-y-3">
            {activity.image &&
              activity.image?.map((i) => {
                return (
                  <li className="">
                    <img
                      className="w-full object-cover rounded-lg"
                      src={process.env.PUBLIC_URL + `/../${i}`}
                      alt="comunity_img"
                    />
                  </li>
                );
              })}
          </ul>
        </div>
      </div>

      <div className="w-full bg-transparent border-b-[1px] border-solid border-[#d0d0d0] dark:border-[#444]">
        <div className="w-11/12 mx-auto py-14">
          <h1 className="text-[1.5rem] text-[#282828] font-semibold">
            안내사항
          </h1>

          <ul className="mt-3">
            {activity.info &&
              activity.info?.map((i) => {
                return <li>- {i}</li>;
              })}
          </ul>
        </div>
      </div>

      <div className="w-11/12 mx-auto py-14 text-[0.9rem] text-[#666]">
        <h1 className="text-[1.5rem] text-[#282828] font-semibold">문의사항</h1>
        <p className="mt-2">문의사항은 여기로 보내주세요.</p>

        <p className="mt-4 text-[1rem] text-[#000000]">{activity.request}</p>
      </div>

      {/* <h1 className="mb-[40px] text-[2.25rem] font-semibold">신청 링크</h1>
        <p className="text-[1.125rem] text-[#454545] whitespace-pre-wrap">
          {activity.request}
        </p>

        <div className="w-full mt-[120px] flex justify-between">
          <button
            onClick={() => {
              navigate("/activity");
            }}
            className="w-[48%] py-3 bg-black bg-opacity-0 border-[1px] border-solid border-black flex items-center justify-center hover:bg-opacity-100 hover:border-black hover:text-white transition-all duration-700"
            type="button"
          >
            목록보기
          </button>
          <button
            className="w-[48%] py-3 bg-black bg-opacity-100 text-white border-[1px] border-solid border-black flex items-center justify-center hover:bg-opacity-0 hover:border-black hover:text-black transition-all duration-700"
            type="button"
          >
            <a href="https://www.instagram.com/bebeam_busan/" target="_blank">
              신청하기
            </a>
          </button>
        </div> */}

      <div className="w-full fixed bottom-6 left-0 flex justify-center items-center">
        <div className="w-full max-w-[760px] p-4 box-border bg-white border-[1px] border-solid border-[#b0b0b0] rounded-lg flex">
          <div className="mr-[10px] flex-1">
            <h1 className="text-[#282828] font-semibold">
              월{" "}
              <span className="text-[1.5rem]">
                {activity.price === 0 ? 0 : activity.price}
              </span>
              원
            </h1>
            <p className="text-[#999999]">
              월 {activity.price === 0 ? 0 : activity.price}원
            </p>
          </div>

          <button className="w-full flex-1 bg-[#282828] rounded-lg round text-white">
            <p>{activity.state === "모집 마감" ? "모집 마감" : "모집 중"}</p>
          </button>
          <button className="w-[60px] h-[60px] p-2 box-border ml-[6px] border-[1px] border-solid border-[#b0b0b0] rounded-lg flex flex-col items-center justify-center text-[0.7rem] font-semibold">
            <BsHeart className="text-[1.2rem]" />
            <p className="mt-1 leading-none">찜 0</p>
          </button>
        </div>
      </div>
    </div>
  );
}
