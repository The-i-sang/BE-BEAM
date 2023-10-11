import React from "react";
import { useNavigate } from "react-router-dom";

export default function Menu({ path }) {
  const navigate = useNavigate();
  console.log(path);

  return (
    <ul className="w-full flex text-[#344054]">
      <li
        className={`${
          path === "/"
            ? "underline underline-offset-[20px] decoration-[3px] decoration-black font-semibold"
            : ""
        } cursor-pointer hover-font-medium mr-7 transition-all duration-700`}
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
            ? "underline underline-offset-[20px] decoration-[3px] decoration-black font-semibold"
            : ""
        } cursor-pointer hover:text-yellow m mr-7 transition-all duration-700`}
      >
        Activity
      </li>
      <li
        onClick={() => {
          navigate("/toolkit");
        }}
        className="cursor-pointer mr-7"
      >
        Toolkit
      </li>

      <li
        onClick={() => {
          navigate("/community");
        }}
        className="cursor-pointer"
      >
        Community
      </li>
    </ul>
  );
}
