import React, { useEffect, useState } from "react";
import TypeWriter from "../component/TypeWriter";
import Category from "../component/category/Category";
import SwipeToSlide from "../component/category/SwipeToSlide";

import { FaKissWinkHeart } from "react-icons/fa";

export default function Community() {
  const [slidesToShow, setSlidesToShow] = useState(2);

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

  const meetingType = [
    { title: "소모임", icon: "image/meeting_category_icon1.png" },
    { title: "정기모임", icon: "image/meeting_category_icon2.png" },
  ];

  const recruitmentStatus = [
    { title: "모집 중", icon: "image/meeting_category_icon3.png" },
    { title: "모집 마감", icon: "image/meeting_category_icon4.png" },
  ];

  return (
    <div className="w-full pt-16 dark:bg-black">
      <div className="w-full">
        <div class="w-11/12 mx-auto mb-28 flex lg:flex-row flex-col lg:justify-between items-center">
          <TypeWriter
            type="Meeting Community"
            icon={<FaKissWinkHeart />}
            titleFirst="다양한 사람들이"
            titleBack="<br/>다양하게 어우러지는 모임"
            subTitleFirst="다양한 사람들이 다양하게 어우러지는 모임,"
            subTitleBack="관심사에 맞게 모임을 Pick 하세요!"
            textColor="text-[#f5aa15]"
          />
          <img
            className="w-full lg:max-w-[450px] max-w-[600px] aspect-square animate-fadeIn"
            src="image/meeting_main_img.png"
            alt="main_img"
          />
        </div>

        {/* content 부분 */}
        <div className="w-full">
          {/* 카테고리 부분 */}

          <SwipeToSlide slidesToShow={slidesToShow}>
            <Category
              title="Meeting Type"
              iconImg={"/image/meeting_icon1.png"}
              arr={meetingType}
            />
            <Category
              title="Recruitment Status"
              iconImg={"/image/meeting_icon2.png"}
              arr={recruitmentStatus}
            />
          </SwipeToSlide>
        </div>
      </div>
    </div>
  );
}
