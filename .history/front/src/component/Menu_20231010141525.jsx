import React from "react";
import { useNavigate } from "react-router-dom";

export default function Menu({ path }) {
  const navigate = useNavigate();
  console.log(path);

  return (
    <ul className="w-4/12 flex justify-between text-[#344054] text-[20px]">
      <li
        className={`${
          path === "/"
            ? "underline underline-offset-[10px] decoration-[3px] decoration-black font-semibold"
            : ""
        } w-1/4 bg-orange-300 cursor-pointer hover:font-semibold transition-all duration-700`}
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
            ? "underline underline-offset-[18px] decoration-[3px] decoration-black font-semibold"
            : ""
        } w-1/4 cursor-pointer hover:font-semibold transition-all duration-700`}
      >
        Activity
      </li>
      <li
        onClick={() => {
          navigate("/toolkit");
        }}
        className={`${
          path === "/toolkit"
            ? "underline underline-offset-[18px] decoration-[3px] decoration-black font-semibold"
            : ""
        } w-1/4 cursor-pointer hover:font-semibold transition-all duration-700`}
      >
        Toolkit
      </li>

      <li
        onClick={() => {
          navigate("/community");
        }}
        className={`${
          path === "/community"
            ? "underline underline-offset-[18px] decoration-[3px] decoration-black font-semibold"
            : ""
        } cursor-pointer hover:font-semibold mr-7 transition-all duration-700`}
      >
        Community
      </li>
    </ul>
  );
}
