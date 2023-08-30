import React from "react";

export default function ToolkitCard({ toolkit }) {
  return (
    <li
      onClick={() => {
        navigate(`/detail/${toolkit.id}`, { state: { toolkit } });
      }}
      className="w-[24%] mb-32 cursor-pointer"
    >
      <div className="relative group">
        <img
          className="w-full object-cover mx-auto rounded-2xl"
          src={process.env.PUBLIC_URL + `${toolkit.thumbnail}`}
          alt="toolkit_img"
        />
        <div className="group-hover:h-24 group-hover:shadow-[0_-14px_12px_-2px_rgba(0,0,0,0.1)] absolute bottom-0 w-full h-0 bg-[rgba(255,225,129,0.91)] rounded-b-lg flex justify-center items-center text-xl transition-all duration-700 overflow-hidden">
          <p>자세히 보기</p>
        </div>
      </div>

      <p className="mt-8 text-[#282828] text-[1.8rem] font-bold">
        {toolkit.title}
      </p>
      <p className="mt-6 text-[1.2rem] font-normal">{toolkit.description}</p>
    </li>
  );
}
