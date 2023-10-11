import React from "react";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();

  return (
    <ul className="w-full flex">
      <li
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
        className="cursor-pointer"
      >
        Activity
      </li>
      <li
        onClick={() => {
          navigate("/toolkit");
        }}
        className="cursor-pointer"
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
