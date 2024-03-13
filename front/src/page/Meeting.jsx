import React, { useEffect, useState } from "react";
import TypeWriter from "../component/TypeWriter";
import Category from "../component/category/Category";
import SwipeToSlide from "../component/category/SwipeToSlide";
import { useQuery } from "@tanstack/react-query";

import { FaKissWinkHeart } from "react-icons/fa";
import { MeetingDataFetch } from "../api/meeting";
import MeetingCard from "../component/MeetingCard";

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

  const [slidesToShow, setSlidesToShow] = useState(2);
  const [category1, setCategory1] = useState("ALL");
  const [category2, setCategory2] = useState("ALL");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1024) {
        setSlidesToShow(1);
      } else {
        setSlidesToShow(2);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { isLoading, error, data } = useQuery(["activities"], async () => {
    const result = await MeetingDataFetch();
    return result;
  });

  const [filteredMeetings, setFilteredMeetings] = useState(data);

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
    : filteredMeetings?.length === 0 && category2 === "모집 중"
    ? "현재 모집 중인 활동이 없어요...!"
    : filteredMeetings?.length === 0 && category2 === "모집 마감"
    ? "모집 마감된 활동이 없어요...!"
    : null;
  console.log(filteredMeetings);

  return (
    <div className="w-full pt-16 dark:bg-black dark:text-white">
      <div className="w-11/12 mx-auto mb-28 flex lg:flex-row flex-col lg:justify-between items-center">
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

        <div className="w-full pb-16">
          <div className="w-full px-4 py-6 box-border ">
            <p className="lg:text-[1.1rem] sm:text-[1rem] text-[0.875rem] text-center">
              {comment}
            </p>

            <ul className="sm:grid sm:grid-cols-2 sm:gap-x-4 gap-y-4">
              {filteredMeetings?.map((data) => (
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
    </div>
  );
}
