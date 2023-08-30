import React from "react";
import { BsArrowLeft } from "react-icons/bs";

export default function PrevArrow({ onClick }) {
  return (
    <>
      <div
        onClick={onClick}
        className="text-[2.4rem] text-[#282828] absolute top-[42%] left-0 z-[9999999] cursor-pointer"
      >
        <BsArrowLeft />
      </div>
    </>
  );
}
