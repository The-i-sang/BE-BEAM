import React from "react";
import { useNavigate } from "react-router-dom";

export default function ActivityCard({ activity }) {
  const navigate = useNavigate();

  return (
    <li className="w-full p-4 box-border bg-[rgba(255,255,255,0.7)] rounded-xl">
      <img
        className="w-1/4 h-auto object-cover object-center rounded-xl"
        src={process.env.PUBLIC_URL + `${activity.thumbnail}`}
        alt="activity_img"
      />
    </li>
  );
}
