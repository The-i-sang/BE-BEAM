import React from "react";
import { useNavigate } from "react-router-dom";

export default function ToolkitCard({ toolkit }) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => {
        navigate(`/toolkit/detail/${toolkit.id}`, { state: { toolkit } });
      }}
      className="lg:mb-16 md:mb-8 cursor-pointer"
    >
      <div className="relative group">
        <img
          className="w-full object-cover mx-auto rounded-2xl"
          src={process.env.PUBLIC_URL + toolkit.thumbnail.replace("./", "/")}
          alt={toolkit.alt}
        />
        <div className="2xl:group-hover:h-24 xl:group-hover:h-20 lg:group-hover:h-20 md:group-hover:h-16 sm:group-hover:h-24 group-hover:h-24 absolute bottom-0 w-full h-0 bg-[rgba(40,40,40,0.94)] rounded-b-lg text-white flex justify-center items-center xl:text-xl lg:text-lg md:text-[1rem] sm:text-xl text-xl transition-all duration-700 overflow-hidden">
          <p>자세히 보기</p>
        </div>
      </div>

      <p className="lg:mt-8 md:mt-4 sm:mt-8 mt-6 text-[#282828] dark:text-[#79B1FF] lg:text-[1.8rem] md:text-[1.6rem] sm:text-[1.4rem] text-[1.4rem] font-bold whitespace-nowrap overflow-hidden text-ellipsis">
        {toolkit.title}
      </p>
      <p className="lg:mt-6 md:mt-4 sm:mt-2 mt-4 md:mb-0 sm:mb-14 mb-10 lg:text-[1.2rem] md:text-[1rem] sm:text-[0.9rem] text-[0.9rem] font-normal dark:text-white whitespace-normal">
        {toolkit.description}
      </p>
    </li>
  );
}
