import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ToolkitCard from "../component/toolkit/ToolkitCard";
import TypeWriter from "../component/TypeWriter";
import { ToolkitDataFetch } from "../api/toolkit";
import SwipeToSlide from "../component/category/SwipeToSlide";
import Category from "../component/category/Category";
import { SlidesToShowState } from "../recoil/contentState";
import { useRecoilValue } from "recoil";
import useInput from "../customhook/useInput";

import { CiPen, CiSearch } from "react-icons/ci";
import { GoX } from "react-icons/go";

export default function Toolkit() {
  const { isLoading, error, data } = useQuery(["toolkits"], async () => {
    const result = await ToolkitDataFetch();
    return result;
  });

  const [filteredToolkits, setFilteredToolkits] = useState([]);
  const [searchToolkitText, onSearchToolkitTextChange, setSearchToolkitText] =
    useInput("");
  const [category1, setCategory1] = useState("ALL");
  const [category2, setCategory2] = useState("ALL");
  const [category3, setCategory3] = useState("ALL");
  const categories = [category1, category2, category3];
  const setCategories = [setCategory1, setCategory2, setCategory3];

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

  const handleSearchToolkit = (e) => {
    e.preventDefault();

    if (!Array.isArray(data)) return;

    let filtered = data;

    const trimmedSearchTerm = searchToolkitText.trim();

    if (searchToolkitText.length > 0 && trimmedSearchTerm === "") {
      setFilteredToolkits([]);
    } else {
      const refinedSearchTerm = searchToolkitText
        .replace(/\s+/g, "")
        .toLowerCase();

      const filteredResults = filtered.filter(
        (toolkit) =>
          toolkit?.title
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes(refinedSearchTerm) ||
          toolkit?.description
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes(refinedSearchTerm)
      );

      setFilteredToolkits(filteredResults);
    }
  };

  useEffect(() => {
    if (searchToolkitText.length === 0) {
      if (!Array.isArray(data)) return;

      /**
       * @type {{ type: string; type2: string; creator : string; }[]}
       */
      let filtered = data;

      if (category1 !== "ALL") {
        filtered = filtered.filter((toolkit) => toolkit.type === category1);
      }

      if (category2 !== "ALL") {
        filtered = filtered.filter((toolkit) => toolkit.type2 === category2);
      }

      if (category3 !== "ALL") {
        filtered = filtered.filter((toolkit) => toolkit.creator === category3);
      }

      setFilteredToolkits(filtered);
    }
    return;
  }, [
    searchToolkitText,
    category1,
    category2,
    category3,
    setFilteredToolkits,
    data,
  ]);

  useEffect(() => {
    if (searchToolkitText.length === 0) {
      categories.forEach((category, i) => {
        if (category === "") {
          setCategories[i]("ALL");
        }
      });
    }
  }, [searchToolkitText, ...categories, ...setCategories]);

  const comment = isLoading
    ? "Loading..."
    : error
    ? "An error has occurred...!"
    : searchToolkitText.length > 0 && filteredToolkits.length === 0
    ? "검색 결과가 없습니다."
    : searchToolkitText.length === 0 && filteredToolkits.length === 0
    ? "툴킷이 없습니다."
    : null;

  const onClickCategoryMenu = () => {
    setSearchToolkitText("");
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
                onSearchToolkitTextChange(e);

                setCategory1("");
                setCategory2("");
                setCategory3("");
              }}
              value={searchToolkitText}
              className="w-full sm:p-8 p-5 box-border mt-4 rounded-full dark:bg-transparent border-[1px] border-solid border-[#79B1FF] outline-none sm:text-[1.2rem] text-[0.9rem] dark:text-white sm:placeholder:text-[1.2rem] placeholder:text-[0.9rem] placeholder:text-[#79B1FF]"
              type="text"
              placeholder="툴킷을 검색하세요."
            />
            <button
              onClick={() => {
                setSearchToolkitText("");
              }}
              className={`${
                searchToolkitText.length > 0 ? "opacity-1" : "opacity-0"
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
              onClickCategoryMenu={onClickCategoryMenu}
            />
            <Category
              title="Person Type"
              iconImg={"/image/toolkit_icon2.png"}
              bgColor="bg-[#79B1FF]"
              arr={personType}
              category={category2}
              setCategory={setCategory2}
              onClickCategoryMenu={onClickCategoryMenu}
            />
            <Category
              title="Creator"
              iconImg={"/image/toolkit_icon3.png"}
              bgColor="bg-[#79B1FF]"
              arr={creator}
              category={category3}
              setCategory={setCategory3}
              onClickCategoryMenu={onClickCategoryMenu}
            />
          </SwipeToSlide>
        </div>

        <div className="w-full px-4 pt-6 py-24 box-border dark:bg-[#191919]">
          <p className="lg:text-[1.1rem] sm:text-[1rem] text-[0.875rem] text-center">
            {comment}
          </p>

          <ul className="w-full sm:grid sm:grid-cols-2 gap-x-5">
            {filteredToolkits.map((data, idx) => (
              <ToolkitCard
                toolkit={data}
                key={data.id}
                bgColor="bg-[#79B1FF]"
                hoverBgColor="hover:bg-[rgba(121,177,255,0.8)]"
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
