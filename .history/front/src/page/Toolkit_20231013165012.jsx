import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import ToolkitCard from "../component/ToolkitCard";
import Typewriter from "typewriter-effect";

import { CiPen } from "react-icons/ci";
import { GoX } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { ImManWoman, ImWoman } from "react-icons/im";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { GiHearingDisabled } from "react-icons/gi";
import { RiWheelchairFill } from "react-icons/ri";
import { FaSchoolCircleXmark } from "react-icons/fa6";
import { LiaRainbowSolid } from "react-icons/lia";

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

  const [categories3, setCategories3] = useState([
    { title: "All", isActive: true },
    { title: "비빔", isActive: false },
    { title: "아카이브", isActive: false },
  ]);
  const [filteredToolkits, setFilteredToolkits] = useState([]);
  const [text, setText] = useState("");
  const [searchToolkits, setSearchToolkits] = useState([]);
  const [errorMessage, setErrorMessage] = useState("검색결과가 없습니다.");

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

  const handleCategoryClick3 = (clickedCategory) => {
    setCategory2(clickedCategory);

    // Update isActive for each category based on the clicked category
    const updatedCategories = categories2.map((cate) => ({
      ...cate,
      isActive: cate.title === clickedCategory,
    }));
    setCategories3(updatedCategories);
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

  const handleDeleteTitle = () => {
    setText("");
  };

  const handleSearchToolkit = (e) => {
    e.preventDefault();

    const trimmedText = text.trim();

    if (trimmedText !== "") {
      setSearchToolkits(
        toolkits.filter((toolkit) => {
          const removedSpaceTitle = toolkit.title.replace(/ /g, "");
          const removedSpaceDescription = toolkit.description.replace(/ /g, "");

          const removedSpaceText = text.replace(/ /g, "");

          return (
            removedSpaceTitle.replace(/ /g, "").includes(removedSpaceText) ||
            removedSpaceDescription.includes(removedSpaceText)
          );
        })
      );

      if (searchToolkits.length === 0) {
        setErrorMessage("검색결과가 없습니다.");
      }
    } else if (trimmedText == "" || searchToolkits.length === 0) {
      setSearchToolkits([]);
      setErrorMessage("검색결과가 없습니다.");
    }
  };

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

        <form className="w-full max-w-[760px] relative">
          <input
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
            className="w-full p-8 box-border mt-4 rounded-full border-[1px] border-solid border-[#79B1FF] outline-none text-[1.2rem] placeholder:text-[1.2rem] placeholder:text-[#79B1FF]"
            type="text"
            placeholder="툴킷을 검색하세요."
          />
          <button
            onClick={handleDeleteTitle}
            className={`${
              text.length > 0 ? "opacity-1" : "opacity-0"
            } text-[2.4rem] absolute right-20 top-[40%] transition-all duration-700`}
            type="button"
          >
            <GoX />
          </button>
          <button
            type="submit"
            className="text-[2.4rem] absolute right-7 top-[40%]"
          >
            <CiSearch />
          </button>
        </form>

        <div className="w-full pb-6 mt-36 flex">
          <ul className="flex-1 flex text-5xl font-medium text-[#f5aa15]">
            {categories.map((cate) => {
              return (
                <li
                  key={cate.title}
                  onClick={() => handleCategoryClick(cate.title)}
                  className="cursor-pointer mr-4 flex flex-col items-center group"
                >
                  <div
                    className={`${
                      cate.isActive ? "bg-black" : "bg-transparent"
                    } w-[65px] h-[65px] rounded-full border-[1px] group-hover:bg-black border-solid border-[#393939] flex justify-center items-center transition-all duration-700`}
                  >
                    {cate.title === "All" ? (
                      <p
                        className={`${
                          cate.isActive ? "" : ""
                        } text-[1.2rem] text-[#F5AA15] group-hover:text-[#F5AA15]`}
                      >
                        ALL
                      </p>
                    ) : cate.title === "청년" ? (
                      <p className="text-[#F5AA15] text-[1.2rem] group-hover:text-[#F5AA15]">
                        <ImManWoman />
                      </p>
                    ) : cate.title === "퀴어" ? (
                      <p className="text-[#F5AA15] text-[1.2rem] group-hover:text-[#F5AA15]">
                        <LiaRainbowSolid />
                      </p>
                    ) : cate.title === "시각장애" ? (
                      <p className="text-[#F5AA15] text-[1.2rem] group-hover:text-[#F5AA15]">
                        <BsFillEyeSlashFill />
                      </p>
                    ) : cate.title === "청각장애" ? (
                      <p className="text-[#F5AA15] text-[1.2rem] group-hover:text-[#F5AA15]">
                        <GiHearingDisabled />
                      </p>
                    ) : cate.title === "이동약자" ? (
                      <p className="text-[#F5AA15] text-[1.2rem] group-hover:text-[#F5AA15]">
                        <RiWheelchairFill />
                      </p>
                    ) : cate.title === "비진학" ? (
                      <p className="text-[#F5AA15] text-[1.2rem] group-hover:text-[#F5AA15]">
                        <FaSchoolCircleXmark />
                      </p>
                    ) : (
                      <p className="text-[#F5AA15] text-[1.2rem] group-hover:text-[#F5AA15]">
                        <ImWoman />
                      </p>
                    )}
                  </div>
                  <p
                    className={`${
                      cate.isActive ? "text-[#f58515]" : "text-[#393939]"
                    } mt-2 text-[1rem] font-medium group-hover:text-[#f58515] transition-all duration-700 group-hover:transition-all group-hover:duration-700`}
                  >
                    {cate.title}
                  </p>
                </li>
              );
            })}
          </ul>

          <ul className="ml-4 flex-1 flex text-5xl font-medium text-[#ff3e4f]">
            {categories2.map((cate) => {
              return (
                <li
                  key={cate.title}
                  onClick={() => handleCategoryClick2(cate.title)}
                  className="cursor-pointer mr-4 flex flex-col items-center group"
                >
                  <div
                    className={`${
                      cate.isActive ? "bg-black" : "bg-transparent"
                    } w-[65px] h-[65px] rounded-full border-[1px] group-hover:bg-black border-solid border-[#393939] flex justify-center items-center transition-all duration-700`}
                  >
                    {cate.title === "All" ? (
                      <p
                        className={`${
                          cate.isActive ? "" : ""
                        } text-[1.2rem] text-[#F5AA15] group-hover:text-[#F5AA15]`}
                      >
                        ALL
                      </p>
                    ) : cate.title === "커뮤니티 구성원" ? (
                      <p className="text-[#F5AA15] text-[1.2rem] group-hover:text-[#F5AA15]">
                        <ImManWoman />
                      </p>
                    ) : (
                      <p className="text-[#F5AA15] text-[1.2rem] group-hover:text-[#F5AA15]">
                        <LiaRainbowSolid />
                      </p>
                    )}
                  </div>
                  <p
                    className={`${
                      cate.isActive ? "text-[#f58515]" : "text-[#393939]"
                    } mt-2 text-[1rem] font-medium group-hover:text-[#f58515] transition-all duration-700 group-hover:transition-all group-hover:duration-700 text-center`}
                  >
                    {cate.title}
                  </p>
                </li>
              );
            })}
          </ul>

          <ul className="mt-4 flex flex-wrap items-center">
            {categories3.map((cate) => {
              return (
                <li
                  key={cate.title}
                  className={`cursor-pointer xl:mr-3 md:mr-2 sm:mr-1 mr-1 2xl:px-10 xl:px-8 lg:px-7 md:px-4 sm:px-3 px-[0.6rem] xl:py-4 lg:py-3 md:py-3 sm:py-1 py-1 border-[1px] border-solid border-[#79B1FF] rounded-full ${
                    cate.isActive ? "bg-[#79B1FF] !text-[white]" : ""
                  } hover:bg-[#79B1FF] hover:text-[white] transition-all duration-700 text-[#79B1FF] 2xl:text-[1rem] xl:text-[0.9rem] sm:text-[0.9rem] text-[0.9rem]`}
                >
                  {cate.title}
                </li>
              );
            })}
          </ul>
        </div>

        {isLoading && "Loading..."}
        {error && "An error has occurred...!"}

        <ul className="2xl:w-full xl:w-11/12 lg:w-full md:w-[94%] sm:w-[97%] w-[86%] mx-auto md:pt-0 sm:pt-10 pt-10 flex flex-wrap [&>*:last-child]:ml-0">
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
