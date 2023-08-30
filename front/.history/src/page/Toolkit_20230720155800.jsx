import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Toolkit() {
  const [categories, setCategories] = useState([
    { title: "All", isActive: true },
    { title: "Work", isActive: false },
    { title: "Life", isActive: false },
  ]);

  const {
    isLoading,
    error,
    data: toolkits,
  } = useQuery(["toolkits"], async () => {
    return axios //
      .get("/data/Toolkit.json") //
      .then((res) => res.data.items.toolkits);
  });

  const [category, setCategory] = useState("All");

  const navigate = useNavigate();

  const handleCategoryClick = (clickedCategory) => {
    setCategory(clickedCategory);

    // Update isActive for each category based on the clicked category
    const updatedCategories = categories.map((cate) => ({
      ...cate,
      isActive: cate.title === clickedCategory,
    }));
    setCategories(updatedCategories);
  };

  console.log(categories);
  console.log(toolkits);

  return (
    <div className="w-full bg-[#ffeaa6] pt-40 min-h-[920px]">
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

        {isLoading && "Loading..."}
        {error && "An error has occurred...!"}

        <ul className="flex flex-wrap justify-between mt-20">
          {toolkits &&
            category === "All" &&
            toolkits.map((toolkit) => {
              return (
                <li
                  onClick={() => {
                    navigate(`/detail/${toolkit.id}`, { state: { toolkit } });
                  }}
                  className="w-[24%] mb-26 cursor-pointer"
                >
                  <img
                    className="w-full object-cover mx-auto rounded-2xl"
                    src={process.env.PUBLIC_URL + `${toolkit.thumbnail}`}
                    alt="toolkit_img"
                  />
                  <p className="mt-8 text-[#282828] text-[1.8rem] font-bold">
                    {toolkit.title}
                  </p>
                  <p className="mt-6 text-[1.2rem] font-normal">
                    {toolkit.description}
                  </p>
                </li>
              );
            })}

          {toolkits &&
            category !== "All" &&
            toolkits
              .filter((toolkit) => toolkit.type === category)
              .map((toolkit) => {
                return (
                  <li>
                    <img
                      className="w-1/12 h-full object-cover mx-auto"
                      src={process.env.PUBLIC_URL + `${toolkit.thumbnail}`}
                      alt="toolkit_img"
                    />
                    <p>{toolkit.title}</p>
                  </li>
                );
              })}
        </ul>
      </div>
    </div>
  );
}
