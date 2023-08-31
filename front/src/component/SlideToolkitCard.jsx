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
          <p className="group-hover:opacity-100 absolute top-10 left-8 mt-8 text-[#ffffff] text-[1.7rem] font-bold opacity-0 transition-all duration-700 z-99999">
            {toolkit.title}
          </p>
          <div className="group-hover:h-24 absolute left-0 bottom-0 w-full h-0 bg-[rgba(40,40,40,0.94)] er:border-[1px] rounded-b-2xl text-[#ffffff] flex justify-center items-center text-xl transition-all duration-700 overflow-hidden z-999999">
            <p>자세히 보기</p>
          </div>
        </div>
      </div>
    </li>
  );
}
