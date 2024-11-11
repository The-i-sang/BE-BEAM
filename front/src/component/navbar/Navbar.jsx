import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserDataState } from "../../recoil/userState";
import { getUserProfile } from "../../api/user";

import MenuList from "./MenuList";
import MobileMenuList from "./MobileMenuList";
import Button from "../button/Button";
import { btnStyle } from "../../common2";

import {
  CiDark,
  CiLight,
  CiMenuBurger,
  CiSearch,
  CiUser,
} from "react-icons/ci";

export default function Navbar({
  setSideBarOpen,
  sideBarOpen,
  accessToken,
  setAccessToken,
}) {
  const navigate = useNavigate();

  const [userData, setUserData] = useRecoilState(UserDataState);
  const userIn = accessToken !== "";
  console.log(userIn, accessToken);

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        try {
          const profileData = await getUserProfile(accessToken);
          setUserData(profileData);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            localStorage.removeItem("accessToken");
            setAccessToken("");
            window.location.reload();
          }
        }
      }
    };
    fetchData();
  }, [accessToken, setUserData, setAccessToken]);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
  }, []);

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
    <div className="w-full dark:bg-black dark:text-white">
      <div className="w-11/12 sm:max-w-[90%] mx-auto">
        <div className="relative flex items-center justify-between w-full py-8 sm:py-12 sm:static">
          <Button
            icon={<CiMenuBurger />}
            onClick={() => setSideBarOpen(true)}
            styles="text-[1.2rem] sm:hidden"
            enableStyles="text-mainColor"
          />

          <Button
            styles="sm:static absolute top-4 left-[50%] sm:ml-0 ml-[-30px]"
            onClick={() => navigate("/")}
          >
            <img
              className="md:w-[80px] sm:w-[70px] w-[60px] object-cover"
              src={"/logo/logo2.png"}
              alt="logo"
            />
          </Button>

          <MenuList />
          <MobileMenuList
            setSideBarOpen={setSideBarOpen}
            sideBarOpen={sideBarOpen}
          />

          <div className="flex items-center">
            <Button
              icon={darkMode ? <CiLight /> : <CiDark />}
              onClick={() => setDarkMode(!darkMode)}
              styles={btnStyle.navbar}
              enableStyles="text-mainColor"
            />

            <Button
              icon={<CiSearch />}
              onClick={() => navigate("/search")}
              styles={btnStyle.navbar}
              enableStyles="text-mainColor"
            />

            <Button
              icon={userIn ? null : <CiUser />}
              onClick={() => {
                userIn ? navigate("/mypage") : navigate("/auth");
              }}
              styles={
                userIn
                  ? "text-[0.875rem] flex items-center gap-x-1"
                  : "md:text-[1.8rem] sm:text-[1.5rem] text-[1.2rem]"
              }
              enableStyles="text-mainColor"
            >
              <img
                className={`${
                  userIn ? "" : "hidden"
                } lg:w-[40px] sm:w-[36px] w-[36px] aspect-square object-cover rounded-full`}
                src={userData.profileImage}
                alt="profile_img"
              />
              <p className={userIn ? "md:block sm:hidden hidden" : "hidden"}>
                {userData.nickname}
              </p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
