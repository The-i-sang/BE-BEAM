import React from "react";
import { useLocation } from "react-router-dom";

export default function Detail() {
  const {
    state: { toolkit },
  } = useLocation();
  console.log(toolkit);

  return (
    <div className="w-11/12 mx-auto">
      <img
        className="w-1/12 h-full object-cover mx-auto"
        src={process.env.PUBLIC_URL + `/../${toolkit.thumbnail}`}
        alt="slide_img"
      />
      <p>{toolkit.title}</p>
    </div>
  );
}
