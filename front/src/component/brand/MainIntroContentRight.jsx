import React from "react";

export default function MainIntroContentRight({
  img,
  subTitle,
  titleFront,
  titleMiddle,
  titleBack,
  content1,
  content2,
  content3,
  unifyContent,
}) {
  return (
    <div className="w-full lg:mb-32 sm:mb-20 mb-10 flex lg:flex-row sm:flex-col-reverse flex-col-reverse lg:items-center group text-[#282828] dark:text-white text-center">
      <div className="lg:w-full sm:w-[94%] w-[94%] lg:mx-0 sm:mx-auto mx-auto lg:p-14 box-border">
        <p className="lg:mt-[48px] sm:mt-[30px] mt-[20px] text-[1.125rem] font-medium text-left">
          {subTitle}
        </p>
        <h1 className="lg:mt-5 sm:mt-2 mt-2 lg:mb-16 sm:mb-8 mb-4 sm:text-[2.625rem] text-[1.9rem] font-semibold text-left">
          {titleFront}
          <span className="text-white dark:text-black text-stroke">
            {titleMiddle}
          </span>
          {titleBack}
        </h1>

        <div className="sm:text-[1rem] text-[0.8rem] font-light text-left">
          <p>{content1}</p>
          <p className={`${unifyContent ? "hidden" : "block"} mt-8`}>
            {content2}
          </p>
          <p className={`${unifyContent ? "hidden" : "block"}`}>{content3}</p>
        </div>
      </div>

      <img
        className="xl:w-[700px] lg:w-[600px] sm:w-[94%] w-[94%] lg:mx-0 sm:mx-auto mx-auto aspect-w-1 aspect-h-1 aspect-square"
        src={img}
        alt="intro_img"
      />
    </div>
  );
}
