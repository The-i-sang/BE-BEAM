import React from "react";
import { useNavigate } from "react-router-dom";

export default function Menu({ path }) {
  const navigate = useNavigate();
  console.log(path);

  return (
    <ul className="w-4/12 h-[80px] flex justify-between text-[#344054] text-[20px]">
      <li
        className={`${
          path === "/"
            ? "underline underline-offset-[20px] decoration-[3px] decoration-black font-semibold"
            : ""
        } w-1/5  underline-offset-[20px] decoration-[3px] cursor-pointer hover:font-semibold transition-all duration-700 flex items-center`}
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
            ? "underline underline-offset-[10px] decoration-[3px] decoration-black font-semibold"
            : ""
        } w-1/5 cursor-pointer hover:font-semibold transition-all duration-700 flex items-center`}
      >
        Activity
      </li>
      <li
        onClick={() => {
          navigate("/toolkit");
        }}
        className={`${
          path === "/toolkit"
            ? "underline underline-offset-[10px] decoration-[3px] decoration-black font-semibold"
            : ""
        } w-1/5 cursor-pointer hover:font-semibold transition-all duration-700 flex items-center`}
      >
        Toolkit
      </li>

      <li
        onClick={() => {
          navigate("/community");
        }}
        className={`${
          path === "/community"
            ? "underline underline-offset-[10px] decoration-[3px] decoration-black font-semibold"
            : ""
        } w-1/5 cursor-pointer hover:font-semibold transition-all duration-700 flex items-center`}
      >
        Community
      </li>
    </ul>
  );
}
