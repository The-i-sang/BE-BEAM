//import React from "react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";

import { GoHeart, GoHeartFill } from "react-icons/go";

export default function MeetingCard({ activity }) {
  const navigate = useNavigate();

  // 상태 변수 선언
  const [isClicked, setIsClicked] = useState(false);

  // 클릭 이벤트 핸들러
  const handleClick = () => {
    setIsClicked(!isClicked); // 클릭할 때마다 상태를 반전시킴
  };

  return (
    <li className="cursor-pointer w-full h-full sm:mb-0 mb-5 p-4 box-border bg-[rgba(255,255,255,0.1)] rounded-xl border-[1px] border-solid border-white flex md:flex-row sm:flex-col flex-col">
      <img
        className="lg:w-[164px] md:w-[140px] sm:w-full w-full aspect-w-1 aspect-h-1 aspect-square object-cover object-center rounded-xl"
        src={process.env.PUBLIC_URL + activity.thumbnail.replace("./", "/")}
        alt="activity_img"
      />

      <div className="lg:w-1calc md:w-2calc md:px-4 sm:px-0 px-0 md:py-0 sm:py-4 py-4 box-border">
        <div className="w-full flex items-center justify-between">
          <div className="lg:text-[0.9rem] sm:text-[0.8rem] text-[0.8rem] flex items-center gap-x-2">
            <p className="inline-block sm:py-2 py-1 px-4 bg-gradient-to-r from-sky-400 to-emerald-400 text-white rounded-full whitespace-nowrap overflow-hidden text-ellipsis">
              {activity.type}
            </p>

            {activity.recommend && (
              <p className="inline-block sm:py-2 py-1 px-4 bg-gradient-to-r from-indigo-400 to-pink-400 text-white rounded-full whitespace-nowrap overflow-hidden text-ellipsis">
                추천
              </p>
            )}
          </div>

          <div className="heart" onClick={handleClick}>
            {isClicked ? (
              <GoHeartFill style={{ fontSize: "28px" }} />
            ) : (
              <GoHeart style={{ fontSize: "28px" }} />
            )}
          </div>
        </div>

        <div
          onClick={() => {
            navigate(`/meeting/detail/${activity.id}`, {
              state: { activity },
            });
          }}
          className="mt-4"
        >
          <h1 className="mb-2 text-[#383535] dark:text-[#ffaa15] lg:text-[1.3rem] sm:text-[1.2rem] text-[1.2rem] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            {activity.title}
          </h1>

          <p className="mb-2 lg:text-[0.9rem] sm:text-[0.8rem] text-[0.8rem] text-[#555] dark:text-[rgba(255,255,255,0.7)] whitespace-nowrap overflow-hidden text-ellipsis">
            {activity.state} · {activity.schedule}
          </p>
          <div className="flex items-center">
            <FaLocationDot className="text-[#282828] dark:text-[#ff2121] lg:text-[1.3rem] sm:text-[1.2rem] text-[1.2rem]" />
            <p className="lg:text-[0.9rem] sm:text-[0.8rem] text-[0.8rem] text-[#282828] dark:text-white">
              {activity.place}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
