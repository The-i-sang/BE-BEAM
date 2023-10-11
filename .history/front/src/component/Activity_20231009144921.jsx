import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ActivityCard from "./ActivityCard";

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
    { title: "Now", isActive: true },
    { title: "Closed", isActive: false },
  ]);

  const [category, setCategory] = useState("Now");

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

  return (
    <div className="w-full bg-[#ffffff] py-40">
      <div className="w-11/12 mx-auto pt-10">
        <ul className="w-3/12 mx-auto flex justify-between items-center text-5xl font-medium text-[#f5aa15]">
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
                {cate.title}
              </li>
            );
          })}
        </ul>

        {activities?.filter((activity) => activity.state === "Now")?.length ===
          0 && category === "Now" ? (
          <p className="text-[1.1rem] mt-14">
            현재 진행 중인 활동이 없어요...!
          </p>
        ) : activities?.filter((activity) => activity.state === "Closed")
            ?.length === 0 && category === "Closed" ? (
          <p className="text-[1.1rem] mt-14">종료된 활동이 없어요...!</p>
        ) : (
          ""
        )}
      </div>

      {isLoading && "Loading..."}
      {error && "An error has occurred...!"}

      <ul className="w-full pt-12 mb-28s flex flex-col [&>*:last-child]:ml-0 min-h-[500px]">
        {activities &&
          activities
            .filter((activity) => activity.state === category)
            .map((activity) => {
              return <ActivityCard key={activity.id} activity={activity} />;
            })}
      </ul>
    </div>
  );
}
