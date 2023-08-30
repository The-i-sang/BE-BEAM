import React, { useEffect } from "react";
import { GoX } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export default function Category({ categoryOn, setCategoryOn }) {
  const navigate = useNavigate();

  useEffect(() => {
    setCategoryOn(false);
  }, []);

  return (
    <div
      className={`${
        categoryOn ? "w-full" : "w-0 bg-transparent"
      } h-[100vh] py-9 bg-gradient-to-r from-black to-blue-0 box-border fixed top-0 left-0 z-[999999] transition-all duration-700 overflow-hidden`}
    >
      <button
        onClick={() => {
          setCategoryOn((prev) => !prev);
        }}
        className="mx-[4.5rem] text-white text-[2.8rem]"
      >
        <GoX />
      </button>

      <ul className="w-full h-full mx-[5rem] my-[-2.5rem] text-white text-[8rem] flex flex-col justify-center">
        <li
          onClick={() => {
            navigate("/");
          }}
          className="cursor-pointer"
        >
          Brand
        </li>
        <li
          onClick={() => {
            navigate("/toolkit");
          }}
          className="cursor-pointer"
        >
          Toolkit
        </li>
      </ul>
    </div>
  );
}
