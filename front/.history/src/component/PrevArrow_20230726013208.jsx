import React from "react";
import { BsArrowLeft } from "react-icons/bs";

export default function PrevArrow({ onClick }) {
  return (
    <>
      <div
        onClick={onClick}
        className="text-[4.4rem] text-[rgba(255,255,255,0.6)] absolute top-[42%] left-[14%] z-[9999999] cursor-pointer"
      >
        <BsArrowLeft />
      </div>
    </>
  );
}
