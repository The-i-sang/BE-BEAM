import React from "react";

export default function MainIntroContentLeft({
  img,
  subTitle,
  titleFront,
  titleMiddle,
  titleBack,
  content,
}) {
  return (
    <div className="w-full lg:mb-32 sm:mb-20 mb-10 lg:flex items-center group text-[#282828] dark:text-white text-center">
      <img
        className="xl:w-[700px] lg:w-[600px] sm:w-[94%] w-[94%] lg:mx-0 sm:mx-auto mx-auto aspect-w-1 aspect-h-1 aspect-square object-cover"
        src={img}
        alt="intro_img"
      />

      <div className="lg:w-full sm:w-[94%] w-[94%] lg:mx-0 sm:mx-auto mx-auto lg:p-14 box-border">
        <p className="lg:mt-[48px] sm:mt-[30px] mt-[20px] text-[1.125rem] font-medium text-left">
          {subTitle}
        </p>
        <h1 className="lg:mt-5 sm:mt-2 mt-2 lg:mb-20 sm:mb-10 mb-6 sm:text-[2.625rem] text-[1.9rem] font-semibold text-left">
          {titleFront}
          <span className="text-white dark:text-black text-stroke">
            {titleMiddle}
          </span>
          {titleBack}
        </h1>
        <p className="sm:text-[1rem] text-[0.8rem] font-light text-left">
          {content}
        </p>
      </div>
    </div>
  );
}
