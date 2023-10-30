import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import Menu from "./Menu";

import { CiDark, CiLight } from "react-icons/ci";

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
  const [darkMode, setDarkMode] = useState(false);

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 다크 모드 설정을 불러옵니다.
  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
  }, []);

  // 다크 모드 상태가 변경될 때마다 이를 로컬 스토리지에 저장합니다.
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);
  return (
    <div className="w-full dark:bg-black">
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="w-full py-8 flex justify-between items-center">
          <div
            className="lg:w-[80px] md:w-[13%] sm:w-[15%] w-[20%]"
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

          <div>
            <button
              type="button"
              className="mr-8 text-[1.8rem] text-[#f5aa15] cursor-pointer"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <CiLight /> : <CiDark />}
            </button>

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
    </div>
  );
}
