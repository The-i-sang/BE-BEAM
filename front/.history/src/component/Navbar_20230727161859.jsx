import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";

export default function Navbar({ setCategoryOn }) {
  const navigate = useNavigate();

  const [scrollHeight, setScrollHeight] = useState(0);

  function onScroll() {
    setScrollHeight(window.scrollY);
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className={`${
        scrollHeight >= 140 ? "shadow-lg" : ""
      } w-full h-[120px] bg-[rgba(255,255,255,0.9)] fixed z-[99999]`}
    >
      <div className="w-11/12 h-full mx-auto flex items-center justify-between">
        <button
          onClick={() => {
            setCategoryOn((prev) => !prev);
          }}
          type="button"
          className="text-[2.2rem] text-[#ffffff] cursor-pointer"
        >
          <AiOutlineMenu />
        </button>
        <div
          className="w-1/12"
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            className="w-full object-cover mx-auto cursor-pointer"
            src={process.env.PUBLIC_URL + "/logo/logo2.png"}
            alt="logo"
          />
        </div>
        <button
          type="button"
          className="text-[2.2rem] text-[#f5aa15] cursor-pointer"
          onClick={() => {
            navigate("/search");
          }}
        >
          <CiSearch />
        </button>
      </div>
    </div>
  );
}
