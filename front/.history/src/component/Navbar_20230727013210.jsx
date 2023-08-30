import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";

export default function Navbar() {
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
      } w-full h-[120px] bg-[rgba(255,234,166,0.9)] fixed z-[99999]`}
    >
      <div className="w-11/12 h-full mx-auto flex items-center justify-between">
        <div className="text-[2.2rem] text-[#f5aa15] cursor-pointer">
          <AiOutlineMenu />
        </div>
        <div className="w-8/12">
          <img
            onClick={() => {
              navigate("/");
            }}
            className="w-1/12 object-cover mx-auto cursor-pointer"
            src={process.env.PUBLIC_URL + "/logo/logo2.png"}
            alt="logo"
          />
        </div>
        <div className="text-[2.2rem] text-[#f5aa15] cursor-pointer">
          <CiSearch />
        </div>
      </div>
    </div>
  );
}
