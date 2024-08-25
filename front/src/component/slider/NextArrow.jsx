import React from "react";

export default function NextArrow({ onClick, toolkitType, icon }) {
  return (
    <>
      <div
        onClick={onClick}
        className={`${
          !toolkitType
            ? "text-text-light-10 right-2 top-[40%]"
            : "text-text-light-90 right-0 top-[46%]"
        } text-[2.4rem] dark:text-text-dark-default absolute z-[9999] cursor-pointer`}
      >
        {icon}
      </div>
    </>
  );
}
