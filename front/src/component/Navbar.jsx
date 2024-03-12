import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CiSearch, CiUser } from "react-icons/ci";
import Menu from "./Menu";

import { CiDark, CiLight, CiMenuBurger } from "react-icons/ci";
import { UserDataState, userState } from "../recoil/userState";
import { useRecoilState, useRecoilValue } from "recoil";
import { Cookies } from "react-cookie";
import { GoogleUserDataFetch, KakaoUserDataFetch } from "../api/user";
import { SnsAuthTypeState } from "../recoil/contentState";

export default function Navbar({ setSideBarOpen, sideBarOpen }) {
  const navigate = useNavigate();

  const path = useLocation()?.pathname;
  const userIn = useRecoilValue(userState);

  const [snsAuthType, setSnsAuthType] = useRecoilState(SnsAuthTypeState);
  const [userData, setUserData] = useRecoilState(UserDataState);

  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");

  useEffect(() => {
    if (localStorage.getItem("snsAuthType")) {
      setSnsAuthType(localStorage.getItem("snsAuthType"));
    }
  }, []);

  useEffect(() => {
    if (accessToken && snsAuthType) {
      const fetchData = async () => {
        const fetchFunction =
          snsAuthType === "googleAuth"
            ? GoogleUserDataFetch
            : KakaoUserDataFetch;
        setUserData(await fetchFunction(accessToken));
      };

      fetchData();
    }
  }, [accessToken, setUserData, snsAuthType]);

  // useState의 초기 상태를 함수로 설정하면, 이 함수는 컴포넌트가 처음 렌더링될 때 한 번만 호출됨.
  // 이를 이용하면 컴포넌트가 렌더링되기 전에 localStorage의 값을 읽어와 상태를 설정할 수 있음.
  // 이 방법은 컴포넌트가 렌더링되기 전에 필요한 작업을 처리하는 데 유용.
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 다크 모드 설정을 불러옴.
  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
  }, []);

  // 다크 모드 상태가 변경될 때마다 이를 로컬 스토리지에 저장.
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  const googleAuthTrue =
    snsAuthType === "googleAuth" && Object.keys(userData).length > 0;
  const kakaoAuthTrue =
    snsAuthType === "kakaoAuth" && Object.keys(userData).length > 0;

  const profileImg = googleAuthTrue
    ? userData?.photos[0]?.url
    : kakaoAuthTrue
    ? userData?.kakao_account?.profile?.profile_image_url
    : "/image/basic_user_profile.jpg";
  const userNickname = googleAuthTrue
    ? userData?.names[0]?.displayName
    : kakaoAuthTrue
    ? userData?.kakao_account?.profile?.nickname
    : "userName";

  // src > common.js 파일을 참고하여 재활용할 수 있도록 코드 변경하기.

  console.log(
    "userData",
    userData,
    "profileImg",
    profileImg,
    "userNickname",
    userNickname,
    "snsAuthType",
    snsAuthType
  );

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

            <button
              type="button"
              className={`${
                !userIn ? "block" : "hidden"
              } lg:ml-8 md:ml-4 sm:ml-4 ml-2 md:text-[1.8rem] sm:text-[1.5rem] text-[1.2rem] text-[#f5aa15] cursor-pointer`}
              onClick={() => {
                navigate("/auth");
              }}
            >
              <CiUser />
            </button>

            <div
              className={`${
                userIn ? "block" : "hidden"
              } lg:ml-8 md:ml-4 sm:ml-4 ml-2 flex items-center gap-x-2 text-[0.875rem] font-medium cursor-pointer`}
              onClick={(e) => {
                e.preventDefault();

                navigate("/mypage");
              }}
            >
              <img
                className="lg:w-[40px] sm:w-[36px] w-[36px] aspect-square object-cover rounded-full"
                src={process.env.PUBLIC_URL + profileImg}
                alt="profile_img"
              />
              <p className="md:block sm:hidden hidden">{userNickname}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
