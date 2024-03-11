import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { Cookies } from "react-cookie";

import { CiEdit } from "react-icons/ci";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { UserDataState, userState } from "../recoil/userState";
import { SnsAuthTypeState } from "../recoil/contentState";

export default function MypageMyProfile() {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const setUserIn = useSetRecoilState(userState);
  const snsAuthType = useRecoilValue(SnsAuthTypeState);
  const userData = useRecoilValue(UserDataState);

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

  const keywordBox = [
    "산책/크래킹",
    "가죽공예",
    "코딩",
    "자수/뜨개질",
    "영화",
    "술",
    "음악",
  ];

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between">
        <p className="text-[1.125rem] font-semibold dark:text-white">
          나의 프로필
        </p>

        <button
          type="button"
          onClick={() => {
            cookies.remove("accessToken");
            setUserIn(false);

            navigate("/");
          }}
          className="text-[0.875rem] text-[#828282] dark:text-[#bababa] font-thin"
        >
          로그아웃
        </button>
      </div>

      <div className="w-full mt-5 pt-[1.875rem] pb-[1.25rem] px-[1.25rem] box-border bg-white dark:bg-[rgba(255,255,255,0.2)] rounded-2xl border-[1px] border-solid border-[#ddd] dark:border-[#5b5b5b] flex flex-col items-center">
        <div className="w-full pb-[1.25rem] border-b-[1px] border-solid border-[#ddd] dark:border-[#7a7a7a] flex flex-col items-center">
          <div className="relative">
            <img
              className="mb-3 sm:w-[100px] w-[80px] h-full object-cover rounded-full"
              src={process.env.PUBLIC_URL + profileImg}
              alt="user_profile"
            />

            <button
              onClick={(e) => {
                e.preventDefault();

                navigate("/mypage/userProfileModify");
              }}
              className="w-[25px] h-[25px] bg-white dark:bg-black border-[1px] border-solid border-[#cacaca] dark:border-[#d9d8d8] rounded-full flex items-center justify-center absolute top-0 right-0"
            >
              <CiEdit className="text-[#818181] dark:text-white" />
            </button>
          </div>

          <p className="mb-4 text-[1.125rem] dark:text-white font-semibold">
            {userNickname}
          </p>
          <p className="text-[0.875rem] text-[#666] dark:text-[#bababa] font-thin">
            안녕하세요.
          </p>

          <div className="w-full mt-5 text-[0.8125rem] font-medium flex justify-center items-center flex-wrap sm:gap-x-2 gap-x-1">
            {keywordBox?.map((keyword, index) => {
              return (
                <p
                  key={index}
                  className="bg-[#f6f6f6] dark:bg-black py-1 px-2 mb-2 rounded-3xl border-[1px] border-solid border-[#d9d8d8] dark:border-[#6c6c6c] text-[#7d7d7d] dark:text-white"
                >
                  {keyword}
                </p>
              );
            })}
          </div>
        </div>

        <Button
          onClick={(e) => {
            e.preventDefault();

            navigate("/mypage/userInfoModify");
          }}
          type="button"
          buttonText="개인 정보 수정"
        >
          개인 정보 수정
        </Button>
      </div>
    </div>
  );
}
