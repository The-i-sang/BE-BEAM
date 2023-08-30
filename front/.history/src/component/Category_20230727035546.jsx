import React, { useContext } from "react";
import { GoX } from "react-icons/go";
import { CategoryContext } from "../context/CategoryContext";

export default function Category() {
  const { categoryOn } = useContext(CategoryContext);

  return (
    <div
      className={`${
        categoryOn ? "w-full" : "w-0"
      } h-[100vh] bg-gradient-to-r from-black to-blue-0 fixed top-0 left-0 z-[999999] transition-all duration-700 overflow-hidden`}
    >
      <GoX />
    </div>
  );
}
