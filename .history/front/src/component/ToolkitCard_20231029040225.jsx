import React from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

export default function ToolkitCard({ toolkit, index, ToolkitPage }) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => {
        navigate(`/toolkit/detail/${toolkit.id}`, { state: { toolkit } });
      }}
      className={`${ToolkitPage ? "" : ""}
      ${ToolkitPage ? "lg:mb-16 md:mb-8" : "mb-32"}
        ${
          (!ToolkitPage && index % 4 === 3) || (!ToolkitPage && index === 3)
            ? "mr-0"
            : (!ToolkitPage && index % 4 !== 3) || (!ToolkitPage && index !== 3)
            ? "mr-[1.3333%]"
            : (ToolkitPage && index % 3 === 2) || (ToolkitPage && index === 2)
            ? "mr-0"
            : "lg:mr-[2%] md:mr-[3.5%]"
        } cursor-pointer`}
    >
      <div className="relative group">
        {/* <img
          className="w-full object-cover mx-auto rounded-2xl"
          src={`${BASE_URL}${toolkit.thumbnail_image}`}
          alt="toolkit_img"
        /> */}

        <img
          className="w-full object-cover mx-auto rounded-2xl"
          src={process.env.PUBLIC_URL + `${toolkit.thumbnail}`}
          alt="toolkit_img"
        />
        <div className="2xl:group-hover:h-24 xl:group-hover:h-20 lg:group-hover:h-20 md:group-hover:h-16 sm:group-hover:h-24 group-hover:h-24 absolute bottom-0 w-full h-0 bg-[rgba(40,40,40,0.94)] rounded-b-lg text-white flex justify-center items-center xl:text-xl lg:text-lg md:text-[1rem] sm:text-xl text-xl transition-all duration-700 overflow-hidden">
          <p>자세히 보기</p>
        </div>
      </div>

      <p className="lg:mt-8 md:mt-4 sm:mt-8 mt-8 text-[#282828] dark:text-[[#79B1FF] lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.8rem] text-[1.8rem] font-bold">
        {toolkit.title}
      </p>
      <p className="lg:mt-6 md:mt-4 sm:mt-4 mt-4 md:mb-0 sm:mb-14 mb-14 lg:text-[1.2rem] sm:text-[1rem] font-normal dark:text-white">
        {toolkit.description}
      </p>
    </li>
  );
}
