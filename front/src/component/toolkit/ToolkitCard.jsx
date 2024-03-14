import React from "react";
import { useNavigate } from "react-router-dom";

export default function ToolkitCard({ toolkit, bgColor, hoverBgColor }) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => {
        navigate(`/toolkit/detail/${toolkit.id}`, { state: { toolkit } });
      }}
      className={`${bgColor} ${hoverBgColor} w-full mb-5 p-5 box-border rounded-3xl cursor-pointer lg:grid lg:grid-cols-2 sm:flex flex sm:flex-col flex-col sm:justify-between justify-between gap-x-5 items-center text-white shadow-[0_5px_5px_2px_#ebebeb] group transition-all duration-700`}
    >
      <div className="w-full h-full 2xl:py-4 flex flex-col justify-between">
        <p className="xl:text-[1.6rem] lg:text-[1.5rem] sm:text-[1.4rem] text-[1.4rem] font-bold xl:line-clamp-2 lg:line-clamp-1">
          {toolkit.title}
        </p>
        <p className="sm:block hidden lg:mt-2 sm:mt-2 mt-4 px-3 py-2 border-[1px] border-solid border-white rounded-full sm:text-[0.9rem] text-[0.8rem] text-white font-semibold opacity-0 group-hover:opacity-100 transition-all duration-700">
          자세히 보기
        </p>
        <p className="lg:mt-6 md:mt-4 sm:mt-2 mt-4 lg:mb-0 sm:mb-4 mb-6 lg:text-[1.1rem] sm:text-[1rem] text-[1rem] font-normal whitespace-normal xl:line-clamp-5 sm:line-clamp-4">
          {toolkit.description}
        </p>
      </div>

      <img
        className="lg:w-auto sm:w-full lg:h-full sm:h-auto aspect-square object-cover rounded-2xl"
        src={process.env.PUBLIC_URL + toolkit.squareImage.replace("./", "/")}
        alt={toolkit.alt}
      />
    </li>
  );
}
