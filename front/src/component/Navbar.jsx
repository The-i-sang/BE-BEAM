import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { BsPersonLock } from "react-icons/bs";
import Menu from "./Menu";

import { CiDark, CiLight, CiMenuBurger } from "react-icons/ci";
import { userState } from "../recoil/userState";
import { useRecoilValue } from "recoil";

export default function Navbar({ setSideBarOpen, sideBarOpen }) {
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const userIn = useRecoilValue(userState);

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
      <div className="w-11/12 sm:max-w-[1400px] mx-auto">
        <div className="w-full sm:py-12 py-8 flex justify-between items-center sm:static relative">
          <button
            onClick={(e) => {
              e.preventDefault();
              setSideBarOpen(true);
            }}
            className="sm:hidden block text-[#f5aa15] text-[1.2rem]"
          >
            <CiMenuBurger />
          </button>

          <div
            className="md:w-[80px] sm:w-[70px] w-[60px] sm:static absolute top-4 left-[50%] sm:ml-0 ml-[-30px]"
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

          <Menu
            setSideBarOpen={setSideBarOpen}
            sideBarOpen={sideBarOpen}
            path={path}
          />

          <div className="flex items-center">
            <button
              type="button"
              className="lg:mr-8 md:mr-4 sm:mr-4 mr-2 md:text-[1.8rem] sm:text-[1.5rem] text-[1.2rem] text-[#f5aa15] cursor-pointer"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <CiLight /> : <CiDark />}
            </button>

            <button
              type="button"
              className="md:text-[1.8rem] sm:text-[1.5rem] text-[1.2rem] text-[#f5aa15] cursor-pointer"
              onClick={() => {
                navigate("/search");
              }}
            >
              <CiSearch />
            </button>

            {/* 나중에 조건문 추가 : 로그인을 하지 않았을 시 => 로그인 페이지로 이동 / 로그인을 했을 시 => 마이페이지로 이동*/}
            {/* 이걸 위해서 서버에서 로그인을 했는지 하지 않았는지 상태를 알려주는 값을 가져와서 사용해야 함 => user가 들어왔는지 알려주는 전역 상태 userIn */}

            {!userIn ? (
              <button
                type="button"
                className="lg:ml-8 md:ml-4 sm:ml-4 ml-2 md:text-[1.8rem] sm:text-[1.5rem] text-[1.2rem] text-[#f5aa15] cursor-pointer"
                onClick={() => {
                  navigate("/auth");
                }}
              >
                <BsPersonLock />
              </button>
            ) : (
              <div
                className="lg:ml-8 md:ml-4 sm:ml-4 ml-2 flex items-center gap-x-2 text-[0.875rem] font-medium cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();

                  navigate("/mypage");
                }}
              >
                {/* 구글로 로그인시 구글 프로필 사진과 구글 닉네임 받아오기 */}
                {/* 일반 회원가입 후 첫 로그인시 기본 프로필 사진과 회원가입시 입력했던 닉네임 받아오기
                - 추후 마이페이지에서 프로필 사진, 닉네임 수정 가능 */}
                <img
                  className="lg:w-[40px] sm:w-[36px] w-[36px] h-full object-cover rounded-full"
                  src={process.env.PUBLIC_URL + "/image/basic_user_profile.jpg"}
                  alt="logo"
                />
                <p className="md:block sm:hidden hidden">nickname</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
