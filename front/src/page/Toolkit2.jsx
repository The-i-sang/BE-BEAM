import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import ToolkitCard from "../component/ToolkitCard";
import ToolkitCategory from "../component/ToolkitCategory";
import TypeWriter from "../component/TypeWriter";

import { CiPen } from "react-icons/ci";
import { GoX } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { ToolkitDataFetch } from "../api/toolkit";
import SwipeToSlide from "../component/category/SwipeToSlide";
import Category from "../component/category/Category";
import { SlidesToShowState } from "../recoil/contentState";
import { useRecoilValue } from "recoil";

export default function Toolkit2() {
  const [filteredToolkits, setFilteredToolkits] = useState([]);
  const [text, setText] = useState("");
  const [searchToolkits, setSearchToolkits] = useState([]);
  const [errorMessage, setErrorMessage] = useState("검색결과가 없습니다.");
  const [category1, setCategory1] = useState("ALL");
  const [category2, setCategory2] = useState("ALL");
  const [category3, setCategory3] = useState("ALL");

  const slidesToShow = useRecoilValue(SlidesToShowState);

  const toolkitType = [
    { title: "ALL", icon: "image/toolkit_category_icon12.png" },
    { title: "청년", icon: "image/toolkit_category_icon1.png" },
    { title: "퀴어", icon: "image/toolkit_category_icon2.png" },
    { title: "시각장애", icon: "image/toolkit_category_icon3.png" },
    { title: "청각장애", icon: "image/toolkit_category_icon4.png" },
    { title: "이동약자", icon: "image/toolkit_category_icon5.png" },
    { title: "비진학", icon: "image/toolkit_category_icon6.png" },
    { title: "여성·젠더", icon: "image/toolkit_category_icon7.png" },
  ];

  const personType = [
    { title: "ALL", icon: "image/toolkit_category_icon13.png" },
    { title: "커뮤니티 구성원", icon: "image/toolkit_category_icon8.png" },
    { title: "커뮤니티 기획자", icon: "image/toolkit_category_icon9.png" },
  ];

  const creator = [
    { title: "ALL", icon: "image/toolkit_category_icon14.png" },
    { title: "비빔", icon: "image/toolkit_category_icon10.png" },
    { title: "아카이브", icon: "image/toolkit_category_icon11.png" },
  ];

  const { isLoading, error, data } = useQuery(["toolkits"], async () => {
    const result = await ToolkitDataFetch();
    return result;
  });

  const handleSearchToolkit = (e) => {
    e.preventDefault();

    const trimmedText = text.trim();

    if (trimmedText !== "") {
      setSearchToolkits(
        data.filter((toolkit) => {
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
    } else if (trimmedText === "" || searchToolkits.length === 0) {
      setSearchToolkits([]);
      setErrorMessage("검색결과가 없습니다.");
    }
  };

  return (
    <div className="w-full bg-[#ffffff] dark:bg-black pt-16 flex flex-col justify-between items-center font-medium">
      <div className="w-full flex flex-col items-center">
        <div className="w-11/12 mx-auto">
          <div className="w-full mb-10 flex lg:flex-row flex-col lg:justify-between items-center">
            <TypeWriter
              type="Toolkit"
              icon={<CiPen />}
              titleFirst="다양한 사회 문제들을"
              titleBack="<br/>다양하게 풀어내는 툴킷"
              subTitleFirst="다양한 사회 문제들을 다양하게 풀어내는 툴킷,"
              subTitleBack="관심사에 맞게 툴킷을 Pick 하세요!"
              textColor="text-[#79B1FF]"
            />
            <img
              className="w-full lg:max-w-[450px] max-w-[600px] aspect-square animate-fadeIn"
              src="image/toolkit_main_img.png"
              alt="main_img"
            />
          </div>

          <form onSubmit={handleSearchToolkit} className="w-full relative">
            <input
              onChange={(e) => {
                setText(e.target.value);
              }}
              value={text}
              className="w-full sm:p-8 p-5 box-border mt-4 rounded-full dark:bg-transparent border-[1px] border-solid border-[#79B1FF] outline-none sm:text-[1.2rem] text-[0.9rem] dark:text-white sm:placeholder:text-[1.2rem] placeholder:text-[0.9rem] placeholder:text-[#79B1FF]"
              type="text"
              placeholder="툴킷을 검색하세요."
            />
            <button
              onClick={() => {}}
              className={`${
                text.length > 0 ? "opacity-1" : "opacity-0"
              } sm:text-[2.4rem] text-[1.5rem] dark:text-white absolute sm:right-20 right-12 sm:top-[40%] top-[45%] transition-all duration-700`}
              type="button"
            >
              <GoX />
            </button>
            <button
              type="submit"
              className="sm:text-[2.4rem] text-[1.5rem] dark:text-white absolute sm:right-7 right-4 sm:top-[40%] top-[45%]"
            >
              <CiSearch />
            </button>
          </form>
        </div>

        <div className="w-full mt-10">
          <SwipeToSlide slidesToShow={slidesToShow}>
            <Category
              title="Toolkit Type"
              iconImg={"/image/toolkit_icon1.png"}
              bgColor="bg-[#79B1FF]"
              arr={toolkitType}
              category={category1}
              setCategory={setCategory1}
            />
            <Category
              title="Person Type"
              iconImg={"/image/toolkit_icon2.png"}
              bgColor="bg-[#79B1FF]"
              arr={personType}
              category={category2}
              setCategory={setCategory2}
            />
            <Category
              title="Creator"
              iconImg={"/image/toolkit_icon3.png"}
              bgColor="bg-[#79B1FF]"
              arr={creator}
              category={category3}
              setCategory={setCategory3}
            />
          </SwipeToSlide>
        </div>
      </div>
    </div>
  );
}
