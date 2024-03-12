import React from "react";

export default function PrevArrow({ onClick, toolkitType, icon }) {
  return (
    <>
      <div
        onClick={onClick}
        className={`${
          !toolkitType
            ? "left-2 text-white top-[40%]"
            : "left-0 text-[#282828] top-[46%]"
        } text-[2.4rem] dark:text-white absolute z-[9999] cursor-pointer`}
      >
        {icon}
      </div>
    </>
  );
}
