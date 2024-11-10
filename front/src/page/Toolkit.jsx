import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SlidesToShowState } from "../recoil/contentState";
import { AccessTokenState } from "../recoil/userState";
import { dataFetch } from "../api/meetingAndToolkit";
import { handleConsoleError } from "../common";

import BasicSlider from "../component/slider/BasicSlider";
import BasicCard from "../component/card/BasicCard";
import TypeWriter from "../component/typeWriter/TypeWriter";
import Category from "../component/category/Category";
import SearchInputForm from "../component/input/SearchInputForm";

import { CiPen } from "react-icons/ci";

export default function Toolkit() {
  const navigate = useNavigate();

  const accessToken = useRecoilValue(AccessTokenState);
  const slidesToShow = useRecoilValue(SlidesToShowState);

  const [filteredToolkits, setFilteredToolkits] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [category1, setCategory1] = useState("ALL");
  const [category2, setCategory2] = useState("ALL");
  const [category3, setCategory3] = useState("ALL");
  const categories = [category1, category2, category3];
  const setCategories = [setCategory1, setCategory2, setCategory3];

  const {
    isLoading,
    error,
    data: datas,
  } = useQuery({
    queryKey: ["toolkitDatas", accessToken],
    queryFn: async () => {
      const result = await dataFetch(accessToken, "toolkits");
      return result.toolkits;
    },
  });

  const comment = handleConsoleError(isLoading, error, datas);

  // 임시로 추가하는 toolkitType, personType, creator => server에서 들어오는 데이터가 수정되면 지울 코드
  const editToolkitDatas = useMemo(
    () =>
      datas?.map((toolkit) => ({
        ...toolkit,
        toolkitType: "커뮤니티",
        personType: toolkit.id === 10 ? "커뮤니티 구성원" : "커뮤니티 기획자",
        creator: "비빔",
      })),
    [datas]
  );

  const toolkitType = [
    { title: "ALL", icon: "image/toolkit_category_icon12.png" },
    { title: "커뮤니티", icon: "image/toolkit_category_icon0.png" },
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

  useEffect(() => {
    // 나중에 server toolkit search api로 변경하기.
    if (searchText.length === 0) {
      if (!Array.isArray(editToolkitDatas)) return;
      let filtered = editToolkitDatas;

      if (category1 !== "ALL") {
        filtered = filtered.filter(
          (toolkit) => toolkit.toolkitType === category1
        );
      }

      if (category2 !== "ALL") {
        filtered = filtered.filter(
          (toolkit) => toolkit.personType === category2
        );
      }

      if (category3 !== "ALL") {
        filtered = filtered.filter((toolkit) => toolkit.creator === category3);
      }

      setFilteredToolkits(filtered);
    }
    return;
  }, [
    searchText,
    category1,
    category2,
    category3,
    setFilteredToolkits,
    editToolkitDatas,
  ]);

  useEffect(() => {
    if (searchText.length === 0) {
      categories.forEach((category, i) => {
        if (category === "") {
          setCategories[i]("ALL");
        }
      });
    }
  }, [searchText, ...categories, ...setCategories]);

  const handleSearchData = (e) => {
    e.preventDefault();

    if (!Array.isArray(editToolkitDatas)) return;

    let filtered = editToolkitDatas;

    const trimmedSearchTerm = searchText.trim();

    if (searchText.length > 0 && trimmedSearchTerm === "") {
      setFilteredToolkits([]);
    } else {
      const refinedSearchTerm = searchText.replace(/\s+/g, "").toLowerCase();

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
          searchText={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);

            setCategory1("");
            setCategory2("");
            setCategory3("");
          }}
          setSearchText={setSearchText}
          handleSearchData={handleSearchData}
          formStyle="w-full rounded-full text-text-light-90 dark:text-text-dark-default sm:text-[1.2rem] text-[0.9rem]"
          inputStyle="w-full sm:p-8 p-5 rounded-full border-toolkit placeholder:text-toolkit sm:placeholder:text-[1.2rem] placeholder:text-[0.9rem]"
          deleteBtnPositionStyles="sm:top-[30%] top-[36%] sm:right-20 right-12"
          searchBtnPositionStyles="sm:right-7 right-4 sm:top-[30%] top-[36%]"
          btnStyles="sm:text-[2.4rem] text-[1.5rem]"
        />
      </div>

      <div className="w-full mt-10">
        <BasicSlider
          slidesToShow={slidesToShow}
          isAutoplay={false}
          isDots={false}
          prevArrowStyles="top-[38%] left-2 rounded-lg"
          nextArrowStyles="top-[38%] right-2 rounded-lg"
          arrowFontStyles="text-[3rem] text-white"
        >
          <Category
            title="Toolkit Type"
            iconImg={"/image/toolkit_icon1.png"}
            bgColor="bg-toolkit"
            arr={toolkitType}
            category={category1}
            setCategory={setCategory1}
            onClickCategoryMenu={() => setSearchText("")}
          />
          <Category
            title="Person Type"
            iconImg={"/image/toolkit_icon2.png"}
            bgColor="bg-toolkit"
            arr={personType}
            category={category2}
            setCategory={setCategory2}
            onClickCategoryMenu={() => setSearchText("")}
          />
          <Category
            title="Creator"
            iconImg={"/image/toolkit_icon3.png"}
            bgColor="bg-toolkit"
            arr={creator}
            category={category3}
            setCategory={setCategory3}
            onClickCategoryMenu={() => setSearchText("")}
          />
        </BasicSlider>
      </div>

      <div className="box-border w-full px-4 py-24 pt-6 lg:text-[1.1rem] sm:text-[1rem] text-[0.875rem] text-center">
        {comment}

        <ul className="w-full md:grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-x-5">
          {filteredToolkits.map((data) => (
            <BasicCard
              key={data.id}
              onClick={() => {
                navigate(`/toolkit/detail/${data.id}`);
              }}
              title={data.title}
              des={data.description}
              thumbnailImg={data.squareImage}
              bgColor="bg-toolkit"
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
