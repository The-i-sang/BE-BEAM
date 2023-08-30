import React, { useContext } from "react";
import { GoX } from "react-icons/go";
import { CategoryContext } from "../context/CategoryContext";

export default function Category() {
  const { categoryOn, toggleCategory } = useContext(CategoryContext);
  console.log(categoryOn);

  return (
    <div
      className={`${
        categoryOn ? "w-full" : "w-0 bg-transparent"
      } h-[100vh] py-9 bg-gradient-to-r from-black to-blue-0 box-border fixed top-0 left-0 z-[999999] transition-all duration-700 overflow-hidden`}
    >
      <button
        onClick={() => toggleCategory()}
        className="mx-[4.5rem] text-white text-[2.8rem]"
      >
        <GoX />
      </button>

      <ul className="text-white ">
        <li>Brand</li>
        <li>Toolkit</li>
      </ul>
    </div>
  );
}
