import React from "react";
import { useLocation } from "react-router-dom";

export default function Detail() {
  const {
    state: { toolkit },
  } = useLocation();
  console.log(toolkit);

  return (
    <div>
      <img
        className="w-1/12 h-full object-cover mx-auto"
        src={toolkit.thumbnail}
        alt="slide_img"
      />
    </div>
  );
}
