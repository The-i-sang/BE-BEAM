import React from "react";

export default function NextArrow({
  onClick,
  toolkitType,
  icon,
  currentSlide,
  slideCount,
  slidesToShow,
}) {
  const isLastSlide = currentSlide >= slideCount - slidesToShow;

  return (
    <>
      <div
        onClick={onClick}
        className={`${
          !toolkitType
            ? "text-white right-2 top-[40%]"
            : "text-[#282828] right-0 top-[46%]"
        } ${
          isLastSlide && "text-[#c2c2c2]"
        } text-[2.4rem] dark:text-white absolute z-[9999] cursor-pointer`}
      >
        {icon}
      </div>
    </>
  );
}
