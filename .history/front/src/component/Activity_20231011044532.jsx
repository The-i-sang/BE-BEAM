import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ActivityCard from "./ActivityCard";

import { AiFillSmile } from "react-icons/ai";
import { BsSendCheck, BsSendSlash } from "react-icons/bs";

export default function Activity() {
  const {
    isLoading,
    error,
    data: activities,
  } = useQuery(["activities"], async () => {
    return axios //
      .get("/data/Toolkit.json") //
      .then((res) => res.data.items.activities);
  });

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
    const updatedCategories = categories.map((cate) => ({
      ...cate,
      isActive: cate.title === clickedCategory,
    }));
    setCategories(updatedCategories);
  };

  console.log(category);

  useEffect(() => {
    let filteredList = activities;

    if (category !== "All") {
      filteredList = filteredList.filter(
        (activity) => activity.state === category
      );
    }

    setFilteredActivities(filteredList);
  }, [category, activities]);

  return (
    <div className="w-full py-16">
      <div className="w-11/12 mx-auto">
        <div className="w-full mb-6 flex flex-col justify-center items-center">
          <div className="w-full text-[#f5aa15] text-[1.5rem] flex justify-center items-center">
            <AiFillSmile />
            <p className="ml-3 font-semibold">Activity</p>
          </div>

          <p className="mt-6 text-[2.8rem] text-center font-extrabold tracking-tighter">
            다양한 사람들이
            <br />
            다양하게 어우러지는 모임
          </p>

          <p className="mt-7 text-[#383535] text-[1.4rem] text-center tracking-tighter">
            다양한 사람들이 다양하게 어우러지는 모임,
            <br />
            관심사에 맞게 모임을 Pick 하세요!
          </p>
        </div>

        <ul className="w-full mt-36 bg-lime-500 flex items-center text-5xl font-medium text-[#f5aa15]">
          {categories.map((cate) => {
            return (
              <li
                key={cate.title}
                onClick={() => handleCategoryClick(cate.title)}
                className={`cursor-pointer pb-2 border-b-[4px] border-[rgba(196,137,18,0)] border-solid ${
                  cate.isActive
                    ? "text-[rgba(196,137,18,100)] border-[rgba(196,137,18,100)]"
                    : ""
                } hover:border-[rgba(196,137,18,100)] hover:text-[rgba(196,137,18,100)] transition-all duration-700`}
              >
                <div>
                  <div className="w-[65px] h-[65px] rounded-full border-[1px] border-solid border-[#282828]">
                    {cate.title === "All" ? (
                      <p>ALL</p>
                    ) : cate.title === "모집 중" ? (
                      <p>
                        <BsSendCheck />
                      </p>
                    ) : (
                      <BsSendSlash />
                    )}
                  </div>
                  <p>{cate.title}</p>
                </div>
              </li>
            );
          })}
        </ul>

        {filteredActivities?.filter((activity) => activity.state === "모집 중")
          ?.length === 0 &&
        filteredActivities?.filter((activity) => activity.state === "모집 마감")
          ?.length === 0 &&
        category === "All" ? (
          <p className="text-[1.1rem] mt-14">모임이 없어요...!</p>
        ) : filteredActivities?.filter(
            (activity) => activity.state === "모집 중"
          )?.length === 0 && category === "모집 중" ? (
          <p className="text-[1.1rem] mt-14">
            현재 모집 중인 활동이 없어요...!
          </p>
        ) : filteredActivities?.filter(
            (activity) => activity.state === "모집 마감"
          )?.length === 0 && category === "모집 마감" ? (
          <p className="text-[1.1rem] mt-14">모집 마감된 활동이 없어요...!</p>
        ) : (
          ""
        )}
      </div>

      {isLoading && "Loading..."}
      {error && "An error has occurred...!"}

      <ul className="w-11/12 mx-auto pt-12 mb-28s flex flex-col [&>*:last-child]:ml-0 min-h-[500px]">
        {filteredActivities &&
          filteredActivities.map((activity) => {
            return <ActivityCard key={activity.id} activity={activity} />;
          })}
      </ul>
    </div>
  );
}
