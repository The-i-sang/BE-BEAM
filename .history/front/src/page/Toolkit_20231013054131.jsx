import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import ToolkitCard from "../component/ToolkitCard";
import Typewriter from "typewriter-effect";

import { CiPen } from "react-icons/ci";

export default function Toolkit() {
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

  // const {
  //   isLoading,
  //   error,
  //   data: toolkits,
  // } = useQuery(["toolkits"], async () => {
  //   const res = await axios.get(TOOLKIT_URL);
  //   console.log(res.data)
  //     return res.data;
  // });

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
    <div className="w-full bg-[#ffffff] pt-16">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col justify-between items-center font-medium">
        <div className="w-full mb-6 flex flex-col justify-center items-center">
          <div className="w-full text-[#79B1FF] text-[1.5rem] flex justify-center items-center">
            <CiPen className="text-[1.8rem]" />
            <p className="ml-3 font-semibold">Toolkit</p>
          </div>

          <p className="mt-6 text-[2.8rem] text-[#282828] text-center font-extrabold leading-normal">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("다양한 사회 문제들을")
                  .pauseFor(200)
                  .typeString("<br/>다양하게 풀어내는 툴킷")
                  .start()
                  .pauseFor(200);
                // .callFunction(function (state) {
                //   state.elements.cursor.style.display = "none";
                // });
              }}
            />
          </p>

          <p className="mt-7 text-[#383535] text-[1.4rem] text-center tracking-tighter">
            다양한 사회 문제들을 다양하게 풀어내는 툴킷,
            <br />
            관심사에 맞게 툴킷을 Pick 하세요!
          </p>
        </div>

        <input
          className="w-full max-w-[760px] p-8 box-border mt-4 rounded-full border-[1px] border-solid border-[#222] outline-none text-[1.2rem] placeholder:text-[1.2rem] placeholder:text-[#79B1FF]"
          type="text"
          placeholder="툴킷을 검색하세요."
        />

        <ul className="mt-32 flex flex-wrap items-center">
          {categories.map((cate) => {
            return (
              <li
                key={cate.title}
                onClick={() => handleCategoryClick(cate.title)}
                className={`cursor-pointer xl:mr-3 md:mr-2 sm:mr-1 mr-1 2xl:px-10 xl:px-8 lg:px-7 md:px-4 sm:px-3 px-[0.6rem] xl:py-4 lg:py-3 md:py-3 sm:py-1 py-1 border-[1px] border-solid border-[#79b1ff] rounded-full ${
                  cate.isActive ? "bg-[#79b1ff] text-[white]" : ""
                } hover:bg-[#79b1ff] hover:text-[white] transition-all duration-700 text-[#79b1ff] 2xl:text-[1rem] xl:text-[0.9rem] sm:text-[0.9rem] text-[0.9rem]`}
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
                className={`cursor-pointer xl:mr-3 md:mr-2 sm:mr-1 mr-1 2xl:px-10 xl:px-8 lg:px-7 md:px-4 sm:px-3 px-[0.6rem] xl:py-4 lg:py-3 md:py-3 sm:py-1 py-1 border-[1px] border-solid border-[#ff5252] rounded-full ${
                  cate.isActive ? "bg-[#ff5252] !text-[white]" : ""
                } hover:bg-[#ff5252] hover:text-[white] transition-all duration-700 text-[#ff5252] 2xl:text-[1rem] xl:text-[0.9rem] sm:text-[0.9rem] text-[0.9rem]`}
              >
                {cate.title}
              </li>
            );
          })}
        </ul>

        {isLoading && "Loading..."}
        {error && "An error has occurred...!"}

        <ul className="2xl:w-full xl:w-11/12 lg:w-full md:w-[94%] sm:w-[97%] w-[86%] mx-auto md:pt-14 sm:pt-10 pt-10 flex flex-wrap [&>*:last-child]:ml-0">
          {filteredToolkits &&
            filteredToolkits.map((toolkit, index) => {
              return (
                <ToolkitCard
                  toolkit={toolkit}
                  key={toolkit}
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
