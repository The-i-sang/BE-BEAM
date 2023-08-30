import React from "react";
import { BsArrowRight } from "react-icons/bs";

export default function NextArrow({ onClick }) {
  return (
    <>
      <div
        onClick={onClick}
        className="text-[3rem] text-[rgba(255,255,255,0.6)] absolute top-[42%] right-[14%] z-[9999999] cursor-pointer"
      >
        <BsArrowRight />
      </div>
    </>
  );
}
