import React from "react";
import { useNavigate } from "react-router-dom";

export default function Menu({ path }) {
  const navigate = useNavigate();
  console.log(path);

  return (
    <ul className="w-4/12 flex justify-between text-[#344054] text-[20px]">
      <li
        onClick={() => {
          navigate("/");
        }}
        className={`${
          path === "/"
            ? "text-white font-semibold before:opacity-100"
            : "before:opacity-0"
        } w-1/5 py-2 before:absolute before:-inset-1 before:-skew-y-3 before:bg-orange-300 hover:before:opacity-100 relative inline-block cursor-pointer hover:font-semibold hover:text-white transition-all duration-700 before:transition-all before:duration-700`}
      >
        <span className={`${path === "/" ? "" : ""} relative`}>Brand</span>
      </li>
      <li
        onClick={() => {
          navigate("/activity");
        }}
        className={`${
          path === "/activity"
            ? "text-white font-semibold before:opacity-100"
            : "before:opacity-0"
        } w-1/5 py-2 before:absolute before:-inset-1 before:-skew-y-3 before:bg-orange-300 hover:before:opacity-100 relative inline-block cursor-pointer hover:font-semibold hover:text-white transition-all duration-700 before:transition-all before:duration-700`}
      >
        <span className={`${path === "/activity" ? "" : ""} relative`}>
          Activity
        </span>
      </li>
      <li
        onClick={() => {
          navigate("/toolkit");
        }}
        className={`${
          path === "/toolkit"
            ? "text-white font-semibold before:opacity-100"
            : "before:opacity-0"
        } w-1/5 py-2 before:absolute before:-inset-1 before:-skew-y-3 before:bg-orange-300 hover:before:opacity-100 relative inline-block cursor-pointer hover:font-semibold hover:text-white transition-all duration-700 before:transition-all before:duration-700`}
      >
        <span className={`${path === "/toolkit" ? "" : ""} relative`}>
          Toolkit
        </span>
      </li>

      <li
        onClick={() => {
          navigate("/community");
        }}
        className={`${
          path === "/community"
            ? "text-white font-semibold before:opacity-100"
            : "before:opacity-0"
        } w-1/5 py-2 before:absolute before:-inset-1 before:-skew-y-3 before:bg-orange-300 hover:before:opacity-100 relative inline-block cursor-pointer hover:font-semibold hover:text-white transition-all duration-700 before:transition-all before:duration-700`}
      >
        <span className={`${path === "/community" ? "" : ""} relative`}>
          Community
        </span>
      </li>
    </ul>
  );
}
