import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { UserPersonalInfoState, userState } from "../../recoil/userState";

import Button from "../button/Button";
import { btnBasicStyle } from "../../common2";

import { CiEdit } from "react-icons/ci";

export default function MypageMyProfile({ userData }) {
  const navigate = useNavigate();

  const setUserIn = useSetRecoilState(userState);
  const userPersonalInfo = useRecoilValue(UserPersonalInfoState);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full">
        <p className="text-[1.125rem] font-semibold dark:text-white">
          나의 프로필
        </p>

        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("accessToken");
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
          <div className="relative mb-5">
            <img
              className="sm:w-[120px] w-[100px] aspect-square object-cover rounded-full shadow-lg"
              src={userData.profileImage}
              alt="user_profile"
            />
            <Button
              icon={<CiEdit />}
              onClick={() => navigate("/mypage/userProfileModify")}
              basicStyle={btnBasicStyle.circle}
              styles="w-7 h-7 bg-[#282828] text-white absolute top-3 right-0"
            />
          </div>

          <p className="mb-1 text-[1.125rem] dark:text-white font-semibold">
            {userData.nickname}
          </p>
          <p className="text-[0.875rem] text-[#666] dark:text-[#bababa] font-thin">
            {userData.introduction}
          </p>

          <div
            className={`${
              userPersonalInfo.hashtags?.length === 0 ? "" : "mt-5"
            } w-full text-[0.8125rem] font-medium flex justify-center items-center flex-wrap sm:gap-x-2 gap-x-1`}
          >
            {userPersonalInfo.hashtags?.map((keyword, idx) => (
              <p
                key={idx}
                className="bg-[#f6f6f6] dark:bg-black py-1 px-2 mb-2 rounded-3xl border-[1px] border-solid border-[#d9d8d8] dark:border-[#6c6c6c] text-[#7d7d7d] dark:text-white"
              >
                {keyword}
              </p>
            ))}
          </div>
        </div>

        <Button
          buttonText="개인 정보 수정"
          onClick={() => navigate("/mypage/userInfoModify")}
          basicStyle={btnBasicStyle.basic}
          styles="w-full mt-5 py-3 rounded-lg text-white"
          enableStyles="bg-[#282828]"
        />
      </div>
    </div>
  );
}
