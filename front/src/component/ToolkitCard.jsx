import React from "react";
import { useNavigate } from "react-router-dom";

export default function ToolkitCard({ toolkit, index, ToolkitPage }) {
  const navigate = useNavigate();

  console.log(ToolkitPage);

  return (
    <li
      onClick={() => {
        navigate(`/toolkit/detail/${toolkit.id}`, { state: { toolkit } });
      }}
      className={`${ToolkitPage ? "w-[32%]" : "w-[24%]"}
      ${ToolkitPage ? "mb-16" : "mb-32"}
        ${
          (!ToolkitPage && index % 4 === 3) || (!ToolkitPage && index === 3)
            ? "mr-0"
            : (!ToolkitPage && index % 4 !== 3) || (!ToolkitPage && index !== 3)
            ? "mr-[1.3333%]"
            : (ToolkitPage && index % 3 === 2) || (ToolkitPage && index === 2)
            ? "mr-0"
            : "mr-[2%]"
        } cursor-pointer`}
    >
      <div className="relative group">
        <img
          className="w-full object-cover mx-auto rounded-2xl"
          src={process.env.PUBLIC_URL + `${toolkit.thumbnail}`}
          alt="toolkit_img"
        />
        <div className="group-hover:h-24 absolute bottom-0 w-full h-0 bg-[rgba(40,40,40,0.94)] rounded-b-lg text-white flex justify-center items-center text-xl transition-all duration-700 overflow-hidden">
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
