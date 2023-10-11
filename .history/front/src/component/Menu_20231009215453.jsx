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
            ? "underline underline-offset-auto decoration- decoration-emerald-950 text-emerald-950"
            : ""
        } cursor-pointer mr-7`}
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
        className="cursor-pointer mr-7"
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
