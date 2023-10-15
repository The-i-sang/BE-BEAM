import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { IoPeopleCircle } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillCalendarCheckFill, BsPersonFill } from "react-icons/bs";
import { ImPriceTag } from "react-icons/im";

export default function ActivityDetail() {
  const navigate = useNavigate();

  const {
    state: { activity },
  } = useLocation();
  console.log(activity);

  return (
    <div className="w-11/12 mx-auto pt-2">
      <div className="w-full">
        <div className="w-full flex items-center gap-x-2 text-[1.1rem] text-[#f5aa15]">
          <IoPeopleCircle className="text-[1.5rem]" />
          <p>{activity.type}</p>
        </div>

        <h1 className="mt-3 text-[1.8rem] font-semibold">{activity.title}</h1>

        <ul className="w-full mt-6 flex items-center text-[1.2rem] text-[#616161]">
          <li className="w-1/4 flex items-center gap-x-4 border-r-[1px] border-solid border-[#DADCE0]">
            <FaLocationDot className="text-[1.8rem] text-[#282828]" />
            <p>{activity.place}</p>
          </li>
          <li className="w-1/4 px-6 box-border border-r-[1px] border-solid border-[#DADCE0] flex items-center gap-x-4">
            <BsFillCalendarCheckFill className="text-[1.8rem] text-[#282828]" />
            <p>{activity.schedule}</p>
          </li>
          <li className="w-1/4 px-6 box-border border-r-[1px] border-solid border-[#DADCE0] flex items-center gap-x-4">
            <BsPersonFill className="text-[1.8rem] text-[#282828]" />
            <p>{activity.member}</p>
          </li>
          <li className="w-1/4 px-6 box-border flex items-center gap-x-4">
            <ImPriceTag className="text-[1.8rem] text-[#282828]" />
            <p>{activity.price === 0 ? "무료" : activity.price + "원"}</p>
          </li>
        </ul>
      </div>

      <div className="w-full mt-14 flex">
        <img
          className="w-[44%] h-[360px] object-cover object-center"
          src={process.env.PUBLIC_URL + `/../${activity.thumbnail}`}
          alt="img"
        />
        <div className="w-[56%]">
          <p>{activity.subTitle}</p>
          <p className="whitespace-pre-line">{activity.description}</p>
        </div>
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
    </div>
  );
}
