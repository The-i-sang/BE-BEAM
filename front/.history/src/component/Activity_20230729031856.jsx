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
      </div>

      {isLoading && "Loading..."}
      {error && "An error has occurred...!"}

      <ul className="w-full pt-12 flex flex-col [&>*:last-child]:ml-0 min-h-[475px]">
        {activities.length === 0 && category === "Now" && (
          <p>지금 진행 중인 활동이 없어요...!</p>
        )}

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
                    <p className="z-[9999] whitespace-pre-wrap text-center text-[4rem] text-white font-semibold">
                      {activity.title}
                    </p>

                    <div className="text-white text-[1.1rem] flex mt-12">
                      <button
                        className="w-[20rem] py-3 bg-black bg-opacity-0 border-[1px] border-solid border-white flex items-center justify-center hover:bg-opacity-100 hover:border-black transition-all duration-700"
                        type="button"
                      >
                        자세히 보기
                      </button>
                      <button
                        className="w-[20rem] py-3 ml-6 bg-black bg-opacity-100 border-[1px] border-solid border-black flex items-center justify-center hover:bg-opacity-0 hover:border-white transition-all duration-700"
                        type="button"
                      >
                        <a
                          href="https://www.instagram.com/bebeam_busan/"
                          target="_blank"
                        >
                          인스타 보러가기
                        </a>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
      </ul>
    </div>
  );
}
