import React from "react";
import { useNavigate } from "react-router-dom";

import { FaLocationDot } from "react-icons/fa6";

export default function ActivityCard({ activity }) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => {
        navigate(`/activity/detail/${activity.id}`, {
          state: { activity },
        });
      }}
      className="cursor-pointer w-full p-4 box-border bg-[rgba(255,255,255,0.1)] rounded-xl border-[1px] border-solid border-white flex flex-1 gap-x-4"
    >
      <img
        className="w-[160px] aspect-w-1 aspect-h-1 aspect-square object-cover object-center rounded-xl"
        src={process.env.PUBLIC_URL + `${activity.thumbnail}`}
        alt="activity_img"
      />

      <div className="w-full bg-">
        <div className="text-[0.9rem] flex items-center gap-x-2">
          <p className="inline-block py-2 px-4 bg-gradient-to-r from-sky-400 to-emerald-400 text-white rounded-full">
            {activity.type}
          </p>

          {activity.recommend && (
            <p className="inline-block py-2 px-4 bg-gradient-to-r from-indigo-400 to-pink-400 text-white rounded-full">
              추천
            </p>
          )}
        </div>

        <div className="mt-4">
          <h1 className="mb-2 text-[#383535] text-[1.3rem] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            {activity.title}
          </h1>

          <p className="mb-2 text-[0.9rem] text-[#555]">
            {activity.state} · {activity.schedule}
          </p>
          <div className="flex items-center">
            <FaLocationDot className="text-[#282828] text-[1.3rem]" />
            <p className="text-[0.9rem] text-[#282828]">{activity.place}</p>
          </div>
        </div>
      </div>
    </li>
  );
}
