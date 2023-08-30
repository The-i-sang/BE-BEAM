import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Activity({ setCategoryOn }) {
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

  useEffect(() => {
    setCategoryOn(false);
  }, []);

  return (
    <div className="w-full bg-[#ffffff] pt-40">
      <div className="w-11/12 mx-auto py-10">
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
      </div>

      {isLoading && "Loading..."}
      {error && "An error has occurred...!"}

      <ul className="w-full pt-20 flex flex-col [&>*:last-child]:ml-0">
        {activities &&
          activities
            .filter((activity) => activity.state === category)
            .map((activity, index) => {
              return (
                <li className="w-full h-[720px] mt-10 relative">
                  <img
                    className="w-full h-full object-cover object-center absolute top-0 left-0 z-[0]"
                    src={process.env.PUBLIC_URL + `${activity.thumbnail}`}
                    alt="activity_img"
                  />
                  <div className="w-full h-full bg-[rgba(0,0,0,0.6)] absolute top-0 left-0 flex flex-col items-center justify-center z-[99]">
                    <p className="z-[9999] whitespace-pre-wrap text-center text-[4rem]">
                      {activity.title}
                    </p>
                  </div>

                  <div>
                    <button type="button">자세히 보기</button>
                    <button type="button">인스타 보러가기</button>
                  </div>
                </li>
              );
            })}
      </ul>
    </div>
  );
}
