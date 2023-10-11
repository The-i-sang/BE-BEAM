import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import Menu from "./Menu";

export default function Navbar() {
  const navigate = useNavigate();
  const path = useLocation().pathname;

  // const [scrollHeight, setScrollHeight] = useState(0);

  // function onScroll() {
  //   setScrollHeight(window.scrollY);
  // }
  // useEffect(() => {
  //   window.addEventListener("scroll", onScroll);
  //   return () => {
  //     window.removeEventListener("scroll", onScroll);
  //   };
  // }, []);

  return (
    <div className="w-full">
      <div className="w-11/12 mx-auto">
        <div className="w-full py-8 flex justify-between items-center">
          <div
            className="lg:w-[70px] md:w-[13%] sm:w-[15%] w-[20%]"
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

          <Menu path={path} />

          <button
            type="button"
            className="text-[1.8rem] text-[#f5aa15] cursor-pointer"
            onClick={() => {
              navigate("/search");
            }}
          >
            <CiSearch />
          </button>
        </div>
      </div>
    </div>
  );
}
