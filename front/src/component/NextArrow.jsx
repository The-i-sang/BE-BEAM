import React from "react";

export default function NextArrow({ onClick, toolkitType, icon }) {
  return (
    <>
      <div
        onClick={onClick}
        className={`${
          !toolkitType
            ? "text-white right-2 top-[40%]"
            : "text-[#282828] right-0 top-[46%]"
        } text-[2.4rem] dark:text-white absolute z-[9999] cursor-pointer`}
      >
        {icon}
      </div>
    </>
  );
}
