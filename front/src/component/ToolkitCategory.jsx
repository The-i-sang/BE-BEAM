import React from "react";

import { ImManWoman, ImWoman } from "react-icons/im";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { GiHearingDisabled, GiNotebook } from "react-icons/gi";
import { RiWheelchairFill, RiTeamFill } from "react-icons/ri";
import { FaSchoolCircleXmark } from "react-icons/fa6";
import { LiaRainbowSolid } from "react-icons/lia";

export default function ToolkitCategory({
  categories,
  categories2,
  categories3,
  handleCategoryClick,
  handleCategoryClick2,
  handleCategoryClick3,
}) {
  return (
    <div className="w-full max-w-[1400px] mx-auto sm:pb-6 pb-4 sm:mt-24 mt-16 flex flex-wrap sm:gap-x-4 gap-x-4">
      <ul className="flex flex-wrap text-5xl font-medium text-[#766b55]">
        {categories.map((cate, i) => {
          return (
            <li
              key={i}
              onClick={() => handleCategoryClick(cate.title)}
              className="cursor-pointer xl:mr-4 sm:mr-2 mr-1 mb-4 flex flex-col items-center group"
            >
              <div
                className={`${
                  cate.isActive ? "bg-black dark:bg-white" : "bg-transparent"
                } xl:w-[65px] xl:h-[65px] sm:w-[56px] sm:h-[56px] w-[52px] h-[52px] rounded-full border-[1px] group-hover:bg-black dark:group-hover:bg-white border-solid border-[#393939] dark:border-white flex justify-center items-center transition-all duration-700`}
              >
                {cate.title === "All" ? (
                  <p
                    className={`${
                      cate.isActive ? "" : ""
                    } xl:text-[1.2rem] sm:text-[1.1rem] text-[0.9rem] text-[#F5AA15] group-hover:text-[#F5AA15]`}
                  >
                    ALL
                  </p>
                ) : cate.title === "청년" ? (
                  <p className="text-[#F5AA15] sm:text-[1.2rem] text-[1rem] group-hover:text-[#ead9b6]">
                    <ImManWoman />
                  </p>
                ) : cate.title === "퀴어" ? (
                  <p className="text-[#F5AA15] sm:text-[1.2rem] text-[1rem] group-hover:text-[#F5AA15]">
                    <LiaRainbowSolid />
                  </p>
                ) : cate.title === "시각장애" ? (
                  <p className="text-[#F5AA15] sm:text-[1.2rem] text-[1rem] group-hover:text-[#F5AA15]">
                    <BsFillEyeSlashFill />
                  </p>
                ) : cate.title === "청각장애" ? (
                  <p className="text-[#F5AA15] sm:text-[1.2rem] text-[1rem] group-hover:text-[#F5AA15]">
                    <GiHearingDisabled />
                  </p>
                ) : cate.title === "이동약자" ? (
                  <p className="text-[#F5AA15] sm:text-[1.2rem] text-[1rem] group-hover:text-[#F5AA15]">
                    <RiWheelchairFill />
                  </p>
                ) : cate.title === "비진학" ? (
                  <p className="text-[#F5AA15] sm:text-[1.2rem] text-[1rem] group-hover:text-[#b69a63]">
                    <FaSchoolCircleXmark />
                  </p>
                ) : (
                  <p className="text-[#F5AA15] sm:text-[1.2rem] text-[1rem] group-hover:text-[#F5AA15]">
                    <ImWoman />
                  </p>
                )}
              </div>
              <p
                className={`${
                  cate.isActive
                    ? "text-[#f58515]"
                    : "text-[#393939] dark:text-white"
                } mt-2 xl:text-[1rem] sm:text-[0.9rem] text-[0.8rem] font-medium group-hover:text-[#f58515] transition-all duration-700 group-hover:transition-all group-hover:duration-700`}
              >
                {cate.title}
              </p>
            </li>
          );
        })}
      </ul>

      <ul className="flex flex-wrap text-5xl font-medium text-[#ff3e4f]">
        {categories2.map((cate, i) => {
          return (
            <li
              key={i}
              onClick={() => handleCategoryClick2(cate.title)}
              className="cursor-pointer xl:mr-4 sm:mr-2 mr-1 mb-4 flex flex-col items-center group"
            >
              <div
                className={`${
                  cate.isActive ? "bg-black dark:bg-white" : "bg-transparent"
                } xl:w-[65px] xl:h-[65px] sm:w-[56px] sm:h-[56px] w-[52px] h-[52px] rounded-full border-[1px] group-hover:bg-black dark:group-hover:bg-white border-solid border-[#393939] dark:border-white flex justify-center items-center transition-all duration-700`}
              >
                {cate.title === "All" ? (
                  <p
                    className={`${
                      cate.isActive ? "" : ""
                    } xl:text-[1.2rem] sm:text-[1.1rem] text-[0.9rem] text-[#ff4848] group-hover:text-[#ff4848]`}
                  >
                    ALL
                  </p>
                ) : cate.title === "커뮤니티 구성원" ? (
                  <p className="text-[#ff4848] text-[1.2rem] group-hover:text-[#ff4848]">
                    <RiTeamFill />
                  </p>
                ) : (
                  <p className="text-[#ff4848] text-[1.2rem] group-hover:text-[#ff4848]">
                    <GiNotebook />
                  </p>
                )}
              </div>
              <p
                className={`${
                  cate.isActive
                    ? "text-[#ff4848]"
                    : "text-[#393939] dark:text-white"
                } mt-2 xl:text-[1rem] sm:text-[0.9rem] text-[0.8rem] font-medium group-hover:text-[#ff4848] transition-all duration-700 group-hover:transition-all group-hover:duration-700 text-center`}
              >
                {cate.title.split(" ")[0]}
              </p>
              <p
                className={`${
                  cate.isActive
                    ? "text-[#ff4848]"
                    : "text-[#393939] dark:text-white"
                } mt-2 xl:text-[1rem] sm:text-[0.9rem] text-[0.8rem] font-medium group-hover:text-[#ff4848] transition-all duration-700 group-hover:transition-all group-hover:duration-700 text-center`}
              >
                {cate.title.split(" ")[1]}
              </p>
            </li>
          );
        })}
      </ul>

      <ul className="flex flex-wrap text-5xl font-medium text-[#79B1FF]">
        {categories3.map((cate, i) => {
          return (
            <li
              key={i}
              onClick={() => handleCategoryClick3(cate.title)}
              className="cursor-pointer xl:mr-4 sm:mr-2 mr-1 flex flex-col items-center group"
            >
              <div
                className={`${
                  cate.isActive ? "bg-black dark:bg-white" : "bg-transparent"
                } xl:w-[65px] xl:h-[65px] sm:w-[56px] sm:h-[56px] w-[52px] h-[52px] rounded-full border-[1px] group-hover:bg-black dark:group-hover:bg-white border-solid border-[#393939] dark:border-white flex justify-center items-center transition-all duration-700`}
              >
                {cate.title === "All" ? (
                  <p
                    className={`${
                      cate.isActive ? "" : ""
                    } xl:text-[1.2rem] sm:text-[1.1rem] text-[0.9rem] text-[#79B1FF] group-hover:text-[#79B1FF]`}
                  >
                    ALL
                  </p>
                ) : cate.title === "비빔" ? (
                  <p className="text-[#79B1FF] text-[1.2rem] group-hover:text-[#79B1FF]">
                    <ImManWoman />
                  </p>
                ) : (
                  <p className="text-[#79B1FF] text-[1.2rem] group-hover:text-[#79B1FF]">
                    <ImManWoman />
                  </p>
                )}
              </div>
              <p
                className={`${
                  cate.isActive
                    ? "text-[#79B1FF]"
                    : "text-[#393939] dark:text-white"
                } mt-2 xl:text-[1rem] sm:text-[0.9rem] text-[0.8rem] font-medium group-hover:text-[#79B1FF] transition-all duration-700 group-hover:transition-all group-hover:duration-700`}
              >
                {cate.title}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
