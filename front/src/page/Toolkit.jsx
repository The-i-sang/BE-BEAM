import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import ToolkitCard from "../component/ToolkitCard";
import BestToolkitSlider from "../component/BestToolkitSlider";

export default function Toolkit({ setCategoryOn }) {
  const ToolkitPage = true;

  const [categories, setCategories] = useState([
    { title: "All", isActive: true },
    { title: "청년", isActive: false },
    { title: "퀴어", isActive: false },
    { title: "시각장애", isActive: false },
    { title: "청각장애", isActive: false },
    { title: "이동약자", isActive: false },
    { title: "비진학", isActive: false },
    { title: "여성·젠더", isActive: false },
  ]);

  const [categories2, setCategories2] = useState([
    { title: "All", isActive: true },
    { title: "커뮤니티 구성원", isActive: false },
    { title: "커뮤니티 기획자", isActive: false },
  ]);
  const [filteredToolkits, setFilteredToolkits] = useState([]);

  const {
    isLoading,
    error,
    data: toolkits,
  } = useQuery(["toolkits"], async () => {
    return axios
      .get("/data/Toolkit.json")
      .then((res) => res.data.items.toolkits);
  });

  const [category, setCategory] = useState("All");
  const [category2, setCategory2] = useState("All");

  const handleCategoryClick = (clickedCategory) => {
    setCategory(clickedCategory);

    // Update isActive for each category based on the clicked category
    const updatedCategories = categories.map((cate) => ({
      ...cate,
      isActive: cate.title === clickedCategory,
    }));
    setCategories(updatedCategories);
  };

  const handleCategoryClick2 = (clickedCategory) => {
    setCategory2(clickedCategory);

    // Update isActive for each category based on the clicked category
    const updatedCategories = categories2.map((cate) => ({
      ...cate,
      isActive: cate.title === clickedCategory,
    }));
    setCategories2(updatedCategories);
  };

  useEffect(() => {
    setCategoryOn(false);
  }, []);

  useEffect(() => {
    let filteredList = toolkits;

    if (category !== "All") {
      filteredList = filteredList.filter(
        (toolkit) => toolkit.type === category
      );
    }

    if (category2 !== "All") {
      filteredList = filteredList.filter(
        (toolkit) => toolkit.type2 === category2
      );
    }

    setFilteredToolkits(filteredList);
  }, [category, category2, toolkits]);

  return (
    <div className="w-full bg-[#ffffff] pt-40">
      {toolkits && <BestToolkitSlider toolkits={toolkits} />}

      <div className="2xl:w-9/12 lg:w-10/12 md:w-[90%] mx-auto pt-20 py-20">
        <div className="w-full mx-auto flex flex-col justify-between items-center font-medium text-[#f5aa15]">
          <ul className="flex flex-wrap items-center">
            {categories.map((cate) => {
              return (
                <li
                  key={cate.title}
                  onClick={() => handleCategoryClick(cate.title)}
                  className={`cursor-pointer xl:mr-3 md:mr-2 2xl:px-10 xl:px-8 lg:px-7 md:px-4 xl:py-4 lg:py-3 md:py-3 border-[1px] border-solid border-[#79b1ff] rounded-full ${
                    cate.isActive ? "bg-[#79b1ff] text-[white]" : ""
                  } hover:bg-[#79b1ff] hover:text-[white] transition-all duration-700 text-[#79b1ff] 2xl:text-[1rem] xl:text-[0.9rem] md:text-[0.9rem]`}
                >
                  {cate.title}
                </li>
              );
            })}
          </ul>

          <ul className="mt-4 flex flex-wrap items-center">
            {categories2.map((cate) => {
              return (
                <li
                  key={cate.title}
                  onClick={() => handleCategoryClick2(cate.title)}
                  className={`cursor-pointer  xl:mr-3 md:mr-2 2xl:px-10 xl:px-8 lg:px-7 md:px-4 xl:py-4 lg:py-3 md:py-3 border-[1px] border-solid border-[#ff5252] rounded-full ${
                    cate.isActive ? "bg-[#ff5252] !text-[white]" : ""
                  } hover:bg-[#ff5252] hover:text-[white] transition-all duration-700 text-[#ff5252] 2xl:text-[1rem] xl:text-[0.9rem] md:text-[0.9rem]`}
                >
                  {cate.title}
                </li>
              );
            })}
          </ul>
        </div>

        {isLoading && "Loading..."}
        {error && "An error has occurred...!"}

        <ul className="2xl:w-full xl:w-11/12 lg:w-full md:w-[94%] mx-auto pt-14 flex flex-wrap [&>*:last-child]:ml-0">
          {filteredToolkits &&
            filteredToolkits.map((toolkit, index) => {
              return (
                <ToolkitCard
                  toolkit={toolkit}
                  key={toolkit.id}
                  index={index}
                  ToolkitPage={ToolkitPage}
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
}
