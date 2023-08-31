import React from "react";
import { useNavigate } from "react-router-dom";

export default function SlideToolkitCard({ toolkit }) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => {
        navigate(`/toolkit/detail/${toolkit.id}`, { state: { toolkit } });
      }}
      className="w-full mb-6 cursor-pointer list-none"
    >
      <div className="w-full relative group">
        <img
          className="w-11/12 object-cover mx-auto rounded-2xl"
          src={process.env.PUBLIC_URL + `${toolkit.thumbnail}`}
          alt="toolkit_img"
        />

        <div className="absolute top-0 left-[50%] ml-[-45.833335%] w-11/12 h-full bg-white bg-opacity-0 rounded-2xl group-hover:bg-opacity-40 transition-all duration-700">
          <p className="group-hover:opacity-100 absolute top-10 left-8 mt-8 text-[#282828] text-[1.7rem] font-bold opacity-0 transition-all duration-700 z-99999">
            {toolkit.title}
          </p>
          <div className="group-hover:h-24 group-hover:shadow-[0_-14px_12px_-2px_rgba(0,0,0,0.1)] absolute left-0 bottom-0 w-full h-0 bg-[rgba(255,221,141,0.94)] rounded-b-lg flex justify-center items-center text-xl transition-all duration-700 overflow-hidden z-999999">
            <p>자세히 보기</p>
          </div>
        </div>
      </div>
    </li>
  );
}
