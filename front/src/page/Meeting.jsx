import React, { useEffect, useState } from "react";
import TypeWriter from "../component/typeWriter/TypeWriter";
import Category from "../component/category/Category";
import SwipeToSlide from "../component/category/SwipeToSlide";
import { useQuery } from "@tanstack/react-query";
import MeetingCard from "../component/meeting/MeetingCard";
import { useRecoilValue } from "recoil";
import { SlidesToShowState } from "../recoil/contentState";
import { MeetingAndToolkitDataFetch } from "../api/meetingAndToolkit";
import Popup from "../component/popUp/Popup";

import { FaKissWinkHeart } from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Meeting() {
  const meetingType = [
    { title: "ALL", icon: "image/meeting_category_icon5.png" },
    { title: "소모임", icon: "image/meeting_category_icon1.png" },
    { title: "정기모임", icon: "image/meeting_category_icon2.png" },
  ];

  const recruitmentStatus = [
    { title: "ALL", icon: "image/meeting_category_icon6.png" },
    { title: "모집 중", icon: "image/meeting_category_icon3.png" },
    { title: "모집 마감", icon: "image/meeting_category_icon4.png" },
  ];

  const slidesToShow = useRecoilValue(SlidesToShowState);
  const [category1, setCategory1] = useState("ALL");
  const [category2, setCategory2] = useState("ALL");
  const [popupOn, setPopupOn] = useState(false);

  const [filteredMeetings, setFilteredMeetings] = useState([]);

  const {
    isLoading,
    error,
    data: datas,
  } = useQuery(["data"], async () => {
    const result = await MeetingAndToolkitDataFetch();
    return result;
  });

  const data = datas?.activities;

  useEffect(() => {
    if (!Array.isArray(data)) return;

    /**
     * @type {{ type: string; state: string; }[]}
     */
    let filtered = data;

    if (category1 !== "ALL") {
      filtered = filtered.filter((meeting) => meeting.type === category1);
    }

    if (category2 !== "ALL") {
      filtered = filtered.filter((meeting) => meeting.state === category2);
    }

    setFilteredMeetings(filtered);
  }, [category1, category2, setFilteredMeetings, data]);

  const comment = isLoading
    ? "Loading..."
    : error
    ? "An error has occurred...!"
    : filteredMeetings.length === 0 && category2 === "모집 중"
    ? "현재 모집 중인 활동이 없어요...!"
    : filteredMeetings.length === 0 && category2 === "모집 마감"
    ? "모집 마감된 활동이 없어요...!"
    : null;

  useEffect(() => {
    setPopupOn(true);
  }, []);

  return (
    <div className="w-full pt-16">
      {popupOn ? <Popup setPopupOn={setPopupOn} /> : null}

      <div className="flex flex-col items-center w-11/12 mx-auto mb-28 lg:flex-row lg:justify-between">
        <TypeWriter
          type="Meeting Community"
          icon={<FaKissWinkHeart />}
          titleFirst="다양한 사람들이"
          titleBack="<br/>다양하게 어우러지는 모임"
          subTitleFirst="다양한 사람들이 다양하게 어우러지는 모임,"
          subTitleBack="관심사에 맞게 모임을 Pick 하세요!"
          textColor="text-[#ffc655]"
        />
        <img
          className="w-full lg:max-w-[450px] max-w-[600px] aspect-square animate-fadeIn"
          src="image/meeting_main_img.png"
          alt="main_img"
        />
      </div>

      <div className="flex justify-center my-4">
          <Link to="/meeting/createSmallGroup">
            <button className="bg-[#ffc655] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#e9a30d] transition duration-300">
              소그룹 생성하기
            </button>
          </Link>
        </div>


      <div className="w-full">
        <SwipeToSlide slidesToShow={slidesToShow}>
          <Category
            title="Meeting Type"
            iconImg={"/image/meeting_icon1.png"}
            bgColor="bg-[#ffc655]"
            arr={meetingType}
            category={category1}
            setCategory={setCategory1}
          />
          <Category
            title="Recruitment Status"
            iconImg={"/image/meeting_icon2.png"}
            bgColor="bg-[#ffc655]"
            arr={recruitmentStatus}
            category={category2}
            setCategory={setCategory2}
          />
        </SwipeToSlide>

        

        <div className="box-border w-full px-4 py-24 pt-6">
          <p className="lg:text-[1.1rem] sm:text-[1rem] text-[0.875rem] text-center">
            {comment}
          </p>

          <ul className="sm:grid sm:grid-cols-2 sm:gap-x-4 gap-y-4">
            {filteredMeetings.map((data) => (
              <MeetingCard
                key={data.id}
                activity={data}
                bgColor="bg-[#ffc655]"
                shadow="shadow-[0_10px_8px_2px_#e9a30d]"
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
