import React, { useContext } from "react";
import { GoX } from "react-icons/go";
import { CategoryContext } from "../context/CategoryContext";

export default function Category() {
  const { categoryOn } = useContext(CategoryContext);

  return (
    <div
      className={`${
        categoryOn ? "w-full" : "w-0"
      } h-[100vh] py-10 px-16 box-border bg-gradient-to-r from-black to-blue-0 fixed top-0 left-0 z-[999999] transition-all duration-700 overflow-hidden`}
    >
      <button className="text-white text-[2rem]">
        <GoX />
      </button>
    </div>
  );
}
