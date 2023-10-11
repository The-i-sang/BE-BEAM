import React from "react";
import { useNavigate } from "react-router-dom";

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
        <div>
          <p className="inline-block py-2 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 text-white">
            {activity.type}
          </p>

          {activity.recommend && <p>추천</p>}
        </div>

        <h1>{activity.title}</h1>

        <p>
          {activity.state} · {activity.schedule}
        </p>
        <p>{activity.place}</p>
      </div>
    </li>
  );
}
