import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import Menu from "./Menu";

import { CiDark, CiLight } from "react-icons/ci";

export default function Navbar() {
  const navigate = useNavigate();
  const path = useLocation().pathname;

  // useState의 초기 상태를 함수로 설정하면, 이 함수는 컴포넌트가 처음 렌더링될 때 한 번만 호출됨.
  // 이를 이용하면 컴포넌트가 렌더링되기 전에 localStorage의 값을 읽어와 상태를 설정할 수 있음.
  // 이 방법은 컴포넌트가 렌더링되기 전에 필요한 작업을 처리하는 데 유용.
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

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
              src={
                process.env.PUBLIC_URL + "/logo/logo2.png".replace("./", "/")
              }
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
