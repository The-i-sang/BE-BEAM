import { useNavigate } from "react-router-dom";

import Button from "../button/Button";
import { borderStyle, btnBasicStyle, btnStyle } from "../../common2";

import { CiEdit } from "react-icons/ci";

export default function MypageMyProfile({
  setAccessToken,
  profileImage,
  nickname,
  hashtags,
  introduction,
}) {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full">
        <p className="text-[1.125rem] font-semibold dark:text-text-dark-default">
          나의 프로필
        </p>

        <Button
          buttonText="로그아웃"
          onClick={() => {
            localStorage.removeItem("accessToken");
            setAccessToken("");

            navigate("/");
          }}
          styles="text-[0.875rem] text-text-light-60 dark:text-text-dark-20"
        />
      </div>

      <div className="w-full mt-5 pt-[1.875rem] pb-[1.25rem] px-[1.25rem] box-border bg-white dark:bg-[rgba(255,255,255,0.2)] rounded-2xl border-[1px] border-solid border-[#ddd] dark:border-[#5b5b5b] flex flex-col items-center">
        <div
          className={`${borderStyle.basic} w-full pb-[1.25rem] border-b-[1px] flex flex-col items-center`}
        >
          <div className="relative mb-5">
            <img
              className="sm:w-[120px] w-[100px] aspect-square object-cover rounded-full shadow-lg"
              src={profileImage}
              alt="user_profile"
            />
            <Button
              icon={<CiEdit />}
              onClick={() => navigate("/mypage/userProfileModify")}
              basicStyle={btnBasicStyle.circle}
              styles="w-7 h-7 bg-[#282828] text-white absolute top-3 right-0"
            />
          </div>

          <p className="mb-1 text-[1.125rem] dark:text-text-dark-default font-semibold">
            {nickname}
          </p>
          <p className="text-[0.875rem] text-text-light-70 dark:text-text-dark-20 font-thin">
            {introduction}
          </p>

          <div
            className={`${
              hashtags?.length === 0 ? "" : "mt-5"
            } w-full text-[0.8125rem] font-medium flex justify-center items-center flex-wrap sm:gap-x-2 gap-x-1`}
          >
            {hashtags?.map((keyword, idx) => (
              <div
                key={idx}
                className="bg-bg-light-10 dark:bg-bg-dark-default py-2 px-4 mb-2 rounded-3xl border-[1px] border-solid border-bg-light-20 dark:border-bg-dark-30 text-text-light-70 dark:text-text-dark-default"
              >
                {keyword}
              </div>
            ))}
          </div>
        </div>

        <Button
          buttonText="개인 정보 수정"
          onClick={() => navigate("/mypage/userInfoModify")}
          basicStyle={btnBasicStyle.basic}
          styles={`${btnStyle.blackBg} w-full mt-5 py-3`}
        />
      </div>
    </div>
  );
}
