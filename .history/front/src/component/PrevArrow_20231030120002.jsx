import React from "react";
import { BsArrowLeft } from "react-icons/bs";

export default function PrevArrow({ onClick }) {
  return (
    <>
      <div
        onClick={onClick}
        className="text-[2.4rem] text-[#282828] dark:text-white absolute top-[46%] left-0 z-[9999] cursor-pointer"
      >
        <BsArrowLeft />
      </div>
    </>
  );
}
