import React from "react";
import { useNavigate } from "react-router-dom";

export default function Menu({ path }) {
  const navigate = useNavigate();
  console.log(path);

  return (
    <ul className="flex text-[#344054] bg-orange-400">
      <li
        className={`${
          path === "/"
            ? "underline underline-offset-[18px] decoration-[3px] decoration-black font-semibold"
            : ""
        } cursor-pointer hover:font-semibold mr-7 transition-all duration-700`}
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
        } cursor-pointer hover:font-semibold mr-7 transition-all duration-700`}
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
        } cursor-pointer hover:font-semibold mr-7 transition-all duration-700`}
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
