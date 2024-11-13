import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { SlidesToShowState } from "../recoil/contentState";
import { AccessTokenState } from "../recoil/userState";
import { allMeetingDataFetch } from "../api/meetingAndToolkit";
import { handleConsoleError } from "../common";

import TypeWriter from "../component/typeWriter/TypeWriter";
import BasicSlider from "../component/slider/BasicSlider";
import MeetingCard from "../component/card/meeting/MeetingCard";
import Popup from "../component/popUp/Popup";
import Category2 from "../component/category/Category2";
import SearchInput from "../component/input/SearchInput";
import Button from "../component/button/Button";
import { btnBasicStyle, btnStyle } from "../common2";

import { FaKissWinkHeart } from "react-icons/fa";

export default function Meeting() {
  const navigate = useNavigate();
  const meetingType = [
    { title: "ALL", value: "all", icon: "image/meeting_category_icon5.png" },
    {
      title: "소모임",
      value: "small",
      icon: "image/meeting_category_icon1.png",
    },
    {
      title: "정기모임",
      value: "regular",
      icon: "image/meeting_category_icon2.png",
    },
  ];

  const recruitmentStatus = [
    { title: "ALL", value: "all", icon: "image/meeting_category_icon6.png" },
    {
      title: "모집중",
      value: "recruiting",
      icon: "image/meeting_category_icon3.png",
    },
    {
      title: "모집마감",
      value: "closed",
      icon: "image/meeting_category_icon4.png",
    },
  ];

  const sortStatus = [
    {
      title: "최신순",
      value: "recent",
      icon: "image/meeting_category_icon7.png",
    },
    {
      title: "좋아요순",
      value: "likes",
      icon: "image/meeting_category_icon8.png",
    },
    {
      title: "평점순",
      value: "rating",
      icon: "image/meeting_category_icon9.png",
    },
    {
      title: "리뷰 많은순",
      value: "reviews",
      icon: "image/meeting_category_icon10.png",
    },
  ];

  const accessToken = useRecoilValue(AccessTokenState);
  const [filter, setFilter] = useState({
    search: "",
    status: "all",
    type: "all",
    //sort: "recent",
  });
  const [meetingDataQueryKeyPostFix, setMeetingDataQueryKeyPostFix] =
    useState(0);
  const [page, setPage] = useState(1);
  const [storedDatas, setStoredDatas] = useState([]);
  const [previousFirstReviewId, setPreviousFirstReviewId] = useState(null);
  const slidesToShow = useRecoilValue(SlidesToShowState);

  const updateMeetingData = () => {
    setMeetingDataQueryKeyPostFix(Date.now());
  };

  const {
    isLoading,
    error,
    data: datas,
  } = useQuery({
    queryKey: [
      "meetingDatas",
      accessToken,
      page,
      filter,
      meetingDataQueryKeyPostFix,
    ],
    queryFn: async () => {
      const result = await allMeetingDataFetch(accessToken, page, 10, filter);
      return result;
    },
  });

  const comment = handleConsoleError(isLoading, error, datas);

  useEffect(() => {
    if (filter) {
      setStoredDatas([]);
    }
  }, [filter]);

  useEffect(() => {
    if (Array.isArray(datas?.meetings)) {
      console.log(datas?.meetings);
      const pasteDatas = [...datas.meetings];
      setStoredDatas((prev) => [...prev, ...pasteDatas]);
    }
  }, [datas]);

  useEffect(() => {
    if (Array.isArray(datas?.meetings)) {
      const currentFirstReviewId = datas.reviews?.[0]?.id;

      if (currentFirstReviewId !== previousFirstReviewId) {
        console.log(datas?.meetings);
        const pasteDatas = [...datas.meetings];
        setStoredDatas((prev) => [...prev, ...pasteDatas]);

        setPreviousFirstReviewId(currentFirstReviewId);
      }
    }
  }, [datas, previousFirstReviewId]);

  const isHostGrade = false;

  console.log(storedDatas, datas?.meetings);

  return (
    <div className="w-full pt-16">
      <Popup />

      <div className="w-full mx-auto mb-10 max-w-[91.666667%]">
        <div className="flex flex-col items-center w-full mb-10 lg:flex-row lg:justify-between">
          <TypeWriter
            type="Meeting Community"
            icon={<FaKissWinkHeart />}
            titleFirst="다양한 사람들이"
            titleBack="<br/>다양하게 어우러지는 모임"
            subTitleFirst="다양한 사람들이 다양하게 어우러지는 모임,"
            subTitleBack="관심사에 맞게 모임을 Pick 하세요!"
            textColor="text-meeting"
          />
          <img
            className="w-full lg:max-w-[450px] max-w-[600px] aspect-square animate-fadeIn"
            src="image/meeting_main_img.png"
            alt="main_img"
          />
        </div>

        <SearchInput
          placeholder="모임을 검색하세요."
          searchText={filter.search}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, search: e.target.value }))
          }
          handleDeleteText={() =>
            setFilter((prev) => ({ ...prev, search: "" }))
          }
          wrapStyle="w-full rounded-full text-text-light-90 dark:text-text-dark-default sm:text-[1.2rem] text-[0.9rem]"
          inputStyle="w-full sm:p-8 p-5 rounded-full border-meeting placeholder:text-meeting sm:placeholder:text-[1.2rem] placeholder:text-[0.9rem]"
          deleteBtnPositionStyles="sm:top-[30%] top-[36%] sm:right-8 right-4"
          btnStyles="sm:text-[2.4rem] text-[1.5rem]"
        />
      </div>

      <div className="w-full">
        <div
          className={`${
            isHostGrade ? "block" : "hidden"
          } box-border flex justify-end w-full px-4`}
        >
          <button
            onClick={() => navigate("/meeting/createSmallGroup")}
            className="bg-[#ffc655] text-white py-2 px-4 mb-5 rounded-lg shadow-md hover:bg-[#e9a30d] transition duration-300"
          >
            소그룹 생성하기
          </button>
        </div>

        <BasicSlider
          slidesToShow={slidesToShow}
          isDots={false}
          prevArrowStyles="top-[38%] left-2 rounded-lg"
          nextArrowStyles="top-[38%] right-2 rounded-lg"
          arrowFontStyles="text-[3rem] text-white"
        >
          <Category2
            title="Meeting Type"
            iconImg={"/image/meeting_icon1.png"}
            bgColor="bg-meeting"
            arr={meetingType}
            topic="type"
            filter={filter}
            setFilter={setFilter}
          />
          <Category2
            title="Recruitment Status"
            iconImg={"/image/meeting_icon3.png"}
            bgColor="bg-meeting"
            arr={recruitmentStatus}
            filter={filter}
            topic="status"
            setFilter={setFilter}
          />
          {/* <Category2
            title="Sort Type"
            iconImg={"/image/meeting_icon2.png"}
            bgColor="bg-meeting"
            arr={sortStatus}
            topic="sort"
            filter={filter}
            setFilter={setFilter}
          /> */}
        </BasicSlider>

        <div className="box-border w-full px-4 py-24 pt-6">
          <p className="lg:text-[1.1rem] sm:text-[1rem] text-[0.875rem] text-center">
            {comment}
          </p>

          <ul className="sm:grid sm:grid-cols-2 sm:gap-x-4 gap-y-4">
            {storedDatas?.map((data) => (
              <MeetingCard
                key={data.id}
                data={data}
                accessToken={accessToken}
                bgColor="bg-meeting"
                shadow="shadow-[0_10px_8px_2px_#e9a30d]"
                updateMeetingData={updateMeetingData}
              />
            ))}
          </ul>
          <Button
            buttonText="더보기"
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
            basicStyle={btnBasicStyle.basic}
            styles={`${btnStyle.blackBg} ${
              datas?.pageInfo?.totalPages <= page ? "hidden" : ""
            } mt-8 mx-auto px-14 py-3`}
          />
        </div>
      </div>
    </div>
  );
}
