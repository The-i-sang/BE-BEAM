// 소모임, 정기모임

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ActivityCard from "../component/ActivityCard";
import Typewriter from "typewriter-effect";

import { AiFillSmile } from "react-icons/ai";
import { BsSendCheck, BsSendSlash } from "react-icons/bs";
import { GiTalk } from "react-icons/gi";

export default function Meeting() {
  const location = useLocation();
  const content = location.state?.content || "";

  const {
    isLoading,
    error,
    data: meetings,
  } = useQuery(["activities"], async () => {
    return axios //
      .get(process.env.PUBLIC_URL + "/data/Toolkit.json") //
      .then((res) => res.data.items.activities);
  });

  const activities = meetings?.filter((meeting) =>
    content === "small_meeting"
      ? meeting.type === "소모임"
      : meeting.type === "정기모임"
  );

  const [categories, setCategories] = useState([
    { title: "All", isActive: false },
    { title: "모집 중", isActive: true },
    { title: "모집 마감", isActive: false },
  ]);

  const [category, setCategory] = useState("모집 중");
  const [filteredActivities, setFilteredActivities] = useState([]);

  const handleCategoryClick = (clickedCategory) => {
    setCategory(clickedCategory);

    // Update isActive for each category based on the clicked category
    const updatedCategories = categories?.map((cate) => ({
      ...cate,
      isActive: cate.title === clickedCategory,
    }));
    setCategories(updatedCategories);
  };

  useEffect(() => {
    let filteredList = activities;

    if (category !== "All") {
      filteredList = filteredList?.filter(
        (activity) => activity.state === category
      );
    }

    setFilteredActivities(filteredList);
  }, [category, activities]);

  useEffect(() => {
    setCategories([
      { title: "All", isActive: false },
      { title: "모집 중", isActive: true },
      { title: "모집 마감", isActive: false },
    ]);
  }, [content]);

  const recruiting =
    filteredActivities?.filter((activity) => activity.state === "모집 중")
      ?.length === 0;

  const recruitDeadline =
    filteredActivities?.filter((activity) => activity.state === "모집 마감")
      ?.length === 0;

  return (
    <div className="w-full pt-16 dark:bg-black">
      <div className="w-11/12 mx-auto">
        <div className="w-full mb-6 flex flex-col justify-center items-center">
          <div
            className={`${
              content === "small_meeting" ? "text-[#f5aa15]" : "text-[#d68484]"
            } w-full sm:text-[1.5rem] text-[1.2rem] flex justify-center items-center`}
          >
            {content === "small_meeting" ? <AiFillSmile /> : <GiTalk />}

            <p className="ml-3 font-semibold">
              {content === "small_meeting" ? "소모임" : "정기모임"}
            </p>
          </div>

          <div className="sm:mt-6 mt-3 sm:text-[2.8rem] text-[2.2rem] dark:text-white text-center font-extrabold">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("다양한 사람들이")
                  .pauseFor(200)
                  .typeString("<br/>다양하게 어우러지는 모임")
                  .start()
                  .pauseFor(200);
              }}
            />
          </div>

          <p className="sm:mt-7 mt-3 text-[#383535] dark:text-white sm:text-[1.4rem] text-[1.1rem] sm:font-normal font-light text-center tracking-tighter">
            다양한 사람들이 다양하게 어우러지는 모임,
            <br />
            관심사에 맞게 모임을 Pick 하세요!
          </p>
        </div>

        <ul
          className={`${
            content === "small_meeting" ? "text-[#f5aa15]" : "text-[#d68484]"
          } w-full sm:mt-36 mt-24 pb-6 flex items-center sm:text-[3rem] text-[2.4rem] font-medium`}
        >
          {categories.map((cate) => {
            return (
              <li
                key={cate.title}
                onClick={() => handleCategoryClick(cate.title)}
                className="cursor-pointer xl:mr-4 sm:mr-2 mr-1 group"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`${
                      cate.isActive
                        ? "bg-black dark:bg-white"
                        : "bg-transparent"
                    } xl:w-[65px] xl:h-[65px] sm:w-[56px] sm:h-[56px] w-[52px] h-[52px] rounded-full border-[1px] group-hover:bg-black dark:group-hover:bg-white border-solid border-[#393939] dark:border-white flex justify-center items-center transition-all duration-700`}
                  >
                    {cate.title === "All" ? (
                      <p
                        className={`${
                          cate.isActive
                            ? `${
                                content === "small_meeting"
                                  ? "text-[#f5aa15]"
                                  : "text-[#d68484]"
                              }`
                            : "text-[#393939] dark:text-white"
                        } ${
                          content === "small_meeting"
                            ? "group-hover:text-[#F5AA15]"
                            : "group-hover:text-[#d68484]"
                        } sm:text-[1.2rem] text-[1rem] `}
                      >
                        ALL
                      </p>
                    ) : cate.title === "모집 중" ? (
                      <p
                        className={`${
                          cate.isActive
                            ? `${
                                content === "small_meeting"
                                  ? "text-[#f5aa15]"
                                  : "text-[#d68484]"
                              }`
                            : "text-[#393939] dark:text-white"
                        } ${
                          content === "small_meeting"
                            ? "group-hover:text-[#F5AA15]"
                            : "group-hover:text-[#d68484]"
                        } sm:text-[1.2rem] text-[1rem] `}
                      >
                        <BsSendCheck />
                      </p>
                    ) : (
                      <p
                        className={`${
                          cate.isActive
                            ? `${
                                content === "small_meeting"
                                  ? "text-[#f5aa15]"
                                  : "text-[#d68484]"
                              }`
                            : "text-[#393939] dark:text-white"
                        } ${
                          content === "small_meeting"
                            ? "group-hover:text-[#F5AA15]"
                            : "group-hover:text-[#d68484]"
                        } sm:text-[1.2rem] text-[1rem] `}
                      >
                        <BsSendSlash />
                      </p>
                    )}
                  </div>

                  <p
                    className={`${
                      cate.isActive
                        ? `${
                            content === "small_meeting"
                              ? "text-[#f5aa15]"
                              : "text-[#d68484]"
                          }`
                        : "text-[#393939] dark:text-white"
                    } ${
                      content === "small_meeting"
                        ? "group-hover:text-[#f58515]"
                        : "group-hover:text-[#d68484]"
                    } mt-2 xl:text-[1rem] sm:text-[0.9rem] text-[0.8rem] font-medium  transition-all duration-700 group-hover:transition-all group-hover:duration-700`}
                  >
                    {cate.title}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className={`${
          content === "small_meeting" ? "bg-[#FDBA74]" : "bg-[#d68484]"
        } w-full dark:bg-[#191919]`}
      >
        <ul className="w-11/12 mx-auto sm:py-10 py-6 sm:grid sm:grid-cols-2 sm:gap-x-6 gap-y-6">
          <p className="lg:text-[1.1rem] sm:text-[1rem] text-[0.875rem]">
            {recruiting && recruitDeadline && category === "All"
              ? "모임이 없어요...!"
              : recruiting && category === "모집 중"
              ? "현재 모집 중인 활동이 없어요...!"
              : recruitDeadline && category === "모집 마감"
              ? "모집 마감된 활동이 없어요...!"
              : ""}
          </p>

          {isLoading && "Loading..."}
          {error && "An error has occurred...!"}

          {filteredActivities &&
            filteredActivities.map((activity) => {
              return <ActivityCard key={activity.id} activity={activity} />;
            })}
        </ul>
      </div>
    </div>
  );
}
