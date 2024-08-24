import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Card from "../component/toolkit/Card";
import TypeWriter from "../component/typeWriter/TypeWriter";
import SwipeToSlide from "../component/category/SwipeToSlide";
import Category from "../component/category/Category";
import { SlidesToShowState } from "../recoil/contentState";
import { useRecoilValue } from "recoil";
import useInput from "../customhook/useInput";
import { MeetingAndToolkitDataFetch } from "../api/meetingAndToolkit";
import SearchInputForm from "../component/input/SearchInputForm";
import { useNavigate } from "react-router-dom";

import { CiPen } from "react-icons/ci";

export default function Toolkit() {
  const navigate = useNavigate();

  const {
    isLoading,
    error,
    data: datas,
  } = useQuery(["data"], async () => {
    const result = await MeetingAndToolkitDataFetch();
    return result;
  });

  const data = datas?.toolkits;

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

  const onHandleSearchTextChange = (e) => {
    onSearchToolkitTextChange(e);

    setCategory1("");
    setCategory2("");
    setCategory3("");
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

  const onClickCategoryMenu = () => {
    setSearchToolkitText("");
  };

  const handleSearchData = (e) => {
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
        (data) =>
          data?.title
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes(refinedSearchTerm) ||
          data?.description
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes(refinedSearchTerm)
      );

      setFilteredToolkits(filteredResults);
    }
  };

  const comment = isLoading
    ? "Loading..."
    : error
    ? "An error has occurred...!"
    : (searchToolkitText.length > 0 || searchToolkitText.length === 0) &&
      filteredToolkits.length === 0
    ? "검색 결과가 없습니다."
    : null;

  return (
    <div className="flex flex-col items-center justify-between w-full pt-16 font-medium">
      <div className="w-full mx-auto max-w-[91.666667%]">
        <div className="flex flex-col items-center w-full mb-10 lg:flex-row lg:justify-between">
          <TypeWriter
            type="Toolkit"
            icon={<CiPen />}
            titleFirst="다양한 사회 문제들을"
            titleBack="<br/>다양하게 풀어내는 툴킷"
            subTitleFirst="다양한 사회 문제들을 다양하게 풀어내는 툴킷,"
            subTitleBack="관심사에 맞게 툴킷을 Pick 하세요!"
            textColor="text-toolkit"
          />
          <img
            className="w-full lg:max-w-[450px] max-w-[600px] aspect-square animate-fadeIn"
            src="image/toolkit_main_img.png"
            alt="main_img"
          />
        </div>

        <SearchInputForm
          placeholder="툴킷을 검색하세요."
          searchText={searchToolkitText}
          onChange={onHandleSearchTextChange}
          setSearchText={setSearchToolkitText}
          handleSearchData={handleSearchData}
          formStyle="w-full rounded-full text-text-light-90 dark:text-text-dark-default sm:text-[1.2rem] text-[0.9rem]"
          inputStyle="w-full sm:p-8 p-5 rounded-full border-toolkit placeholder:text-toolkit sm:placeholder:text-[1.2rem] placeholder:text-[0.9rem]"
          deleteBtnStyle="sm:text-[2.4rem] text-[1.5rem] sm:top-[30%] top-[36%] sm:right-20 right-12"
          searchBtnStyle="sm:text-[2.4rem] text-[1.5rem] sm:right-7 right-4 sm:top-[30%] top-[36%]"
        />
      </div>

      <div className="w-full mt-10">
        <SwipeToSlide slidesToShow={slidesToShow}>
          <Category
            title="Toolkit Type"
            iconImg={"/image/toolkit_icon1.png"}
            bgColor="bg-toolkit"
            arr={toolkitType}
            category={category1}
            setCategory={setCategory1}
            onClickCategoryMenu={onClickCategoryMenu}
          />
          <Category
            title="Person Type"
            iconImg={"/image/toolkit_icon2.png"}
            bgColor="bg-toolkit"
            arr={personType}
            category={category2}
            setCategory={setCategory2}
            onClickCategoryMenu={onClickCategoryMenu}
          />
          <Category
            title="Creator"
            iconImg={"/image/toolkit_icon3.png"}
            bgColor="bg-toolkit"
            arr={creator}
            category={category3}
            setCategory={setCategory3}
            onClickCategoryMenu={onClickCategoryMenu}
          />
        </SwipeToSlide>
      </div>

      <div className="box-border w-full px-4 py-24 pt-6 lg:text-[1.1rem] sm:text-[1rem] text-[0.875rem] text-center">
        {comment}

        <ul className="w-full md:grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-x-5">
          {filteredToolkits.map((data) => (
            <Card
              data={data}
              key={data.id}
              onClick={() => {
                navigate(`/toolkit/detail/${data.id}`, {
                  state: { toolkit: data },
                });
              }}
              thumbnailImg={data.squareImage}
              bgColor="bg-toolkit"
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
