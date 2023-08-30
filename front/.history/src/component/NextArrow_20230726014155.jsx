import React from "react";
import { BsArrowRight } from "react-icons/bs";

export default function NextArrow({ onClick }) {
  return (
    <>
      <div
        onClick={onClick}
        className="text-[2.4rem] text-[#282828] absolute top-[42%] right-0 z-[9999999] cursor-pointer"
      >
        <BsArrowRight />
      </div>
    </>
  );
}
