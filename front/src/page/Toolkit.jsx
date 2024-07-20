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

  const comment = isLoading
    ? "Loading..."
    : error
    ? "An error has occurred...!"
    : searchToolkitText.length > 0 && filteredToolkits.length === 0
    ? "검색 결과가 없습니다."
    : searchToolkitText.length === 0 && filteredToolkits.length === 0
    ? "툴킷이 없습니다."
    : null;

  return (
    <div className="flex flex-col items-center justify-between w-full pt-16 font-medium">
      <div className="flex flex-col items-center w-full">
        <div className="w-11/12 mx-auto">
          <div className="flex flex-col items-center w-full mb-10 lg:flex-row lg:justify-between">
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

          <SearchInputForm
            placeholder="툴킷을 검색하세요."
            searchText={searchToolkitText}
            onChange={onHandleSearchTextChange}
            setSearchText={setSearchToolkitText}
            data={data}
            setFilteredDatas={setFilteredToolkits}
            formStyle="text-[#232426]"
            inputStyle="border-[#79B1FF] placeholder:text-[#79B1FF]"
          />
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

        <div className="box-border w-full px-4 py-24 pt-6">
          <p className="lg:text-[1.1rem] sm:text-[1rem] text-[0.875rem] text-center">
            {comment}
          </p>

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
                bgColor="bg-[#79b1ff]"
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
