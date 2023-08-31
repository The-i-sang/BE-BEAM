import React from "react";
import { useNavigate } from "react-router-dom";

export default function SlideToolkitCard({ toolkit }) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => {
        navigate(`/toolkit/detail/${toolkit.id}`, { state: { toolkit } });
      }}
      className="w-full mb-14 cursor-pointer list-none"
    >
      <div className="w-full relative group">
        <img
          className="w-[94%] object-cover mx-auto rounded-2xl"
          src={process.env.PUBLIC_URL + `${toolkit.thumbnail}`}
          alt="toolkit_img"
        />

        <div className="absolute top-0 left-[50%] ml-[-47%] w-[94%] h-full bg-black bg-opacity-0 rounded-2xl group-hover:bg-opacity-30 transition-all duration-700">
          <p className="group-hover:opacity-100 absolute 2xl:top-10 md:top-2 2xl:left-8 lg:left-4 md:left-2 mt-8 text-[#ffffff] 2xl:text-[1.7rem] lg:text-[1.3rem] font-bold opacity-0 transition-all duration-700 z-99999">
            {toolkit.title}
          </p>
          <div className="2xl:group-hover:h-24 lg:group-hover:h-20 md:group-hover:h-14 absolute left-0 bottom-0 w-full h-0 bg-[rgba(40,40,40,0.94)] er:border-[1px] rounded-b-2xl text-[#ffffff] flex justify-center items-center 2xl:text-xl lg:text-base md:text-sm transition-all duration-700 overflow-hidden z-999999">
            <p>자세히 보기</p>
          </div>
        </div>
      </div>
    </li>
  );
}
