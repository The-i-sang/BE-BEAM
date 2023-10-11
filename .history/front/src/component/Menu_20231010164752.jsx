import React from "react";
import { useNavigate } from "react-router-dom";

export default function Menu({ path }) {
  const navigate = useNavigate();
  console.log(path);

  return (
    <ul className="w-4/12 h-[80px] flex justify-between text-[#344054] text-[20px]">
      <li
        className={`${
          path === "/" ? "font-semibold after:opacity-100" : "after:opacity-0"
        } w-1/5 after:content-['*'] after:ml-0.5 after:text-red-500 after:opacity-0 hover:after:opacity-100 cursor-pointer hover:font-semibold transition-all duration-700 flex items-center`}
        onClick={() => {
          navigate("/");
        }}
      >
        Brand
      </li>
      <li
        onClick={() => {
          navigate("/activity");
        }}
        className={`${
          path === "/activity"
            ? "font-semibold after:opacity-100"
            : "after:opacity-0"
        } w-1/5 after:content-['*'] after:ml-0.5 after:text-red-500 after:opacity-0 hover:after:opacity-100 cursor-pointer hover:font-semibold transition-all duration-700 flex items-center`}
      >
        Activity
      </li>
      <li
        onClick={() => {
          navigate("/toolkit");
        }}
        className={`${
          path === "/toolkit" ? "font-semibold" : ""
        } w-1/5 cursor-pointer hover:font-semibold transition-all duration-700 flex items-center`}
      >
        <span className="relative">Toolkit</span>
      </li>

      <li
        onClick={() => {
          navigate("/community");
        }}
        className={`${
          path === "/community"
            ? "font-semibold after:opacity-100"
            : "after:opacity-0"
        } w-1/5 after:content-['*'] after:ml-0.5 after:text-red-500 after:opacity-0 hover:after:opacity-100 cursor-pointer hover:font-semibold transition-all duration-700 flex items-center`}
      >
        Community
      </li>
    </ul>
  );
}
