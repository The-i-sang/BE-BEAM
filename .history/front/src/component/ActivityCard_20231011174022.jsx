import React from "react";
import { useNavigate } from "react-router-dom";

import { IoLocationOutline } from "react-icons/io5";

export default function ActivityCard({ activity }) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => {
        navigate(`/activity/detail/${activity.id}`, {
          state: { activity },
        });
      }}
      className="w-full p-4 box-border bg-[rgba(255,255,255,0.1)] rounded-xl border-[1px] border-solid border-white flex gap-x-4"
    >
      <img
        className="w-1/4 h-auto object-cover object-center rounded-xl"
        src={process.env.PUBLIC_URL + `${activity.thumbnail}`}
        alt="activity_img"
      />

      <div className="w-3/4">
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

        <h1 className="mt-3 text-[#383535] text-[1.3rem] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
          {activity.title}
        </h1>

        <p>
          {activity.state} · {activity.schedule}
        </p>
        <div className="flex items-center">
          <IoLocationOutline className="text-red-700 text-[1rem]" />
          <p>{activity.place}</p>
        </div>
      </div>
    </li>
  );
}
