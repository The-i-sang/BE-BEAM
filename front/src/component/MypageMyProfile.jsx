import { useNavigate } from "react-router-dom";
import Button from "./button/Button";
import { Cookies } from "react-cookie";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  IsCheckedListKeywordState,
  UserNecessaryDataState,
  userState,
} from "../recoil/userState";

import { CiEdit } from "react-icons/ci";
import { introMyselfState } from "../recoil/authState";

export default function MypageMyProfile() {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const setUserIn = useSetRecoilState(userState);
  const isCheckedListKeyword = useRecoilValue(IsCheckedListKeywordState);
  const userNecessaryData = useRecoilValue(UserNecessaryDataState);
  const introMyself = useRecoilValue(introMyselfState);

  const { profileImg, userNickname } = userNecessaryData;

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
              className="mb-3 sm:w-[100px] w-[80px] aspect-square object-cover rounded-full"
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
            {introMyself}
          </p>

          <div className="w-full mt-5 text-[0.8125rem] font-medium flex justify-center items-center flex-wrap sm:gap-x-2 gap-x-1">
            {isCheckedListKeyword.map((keyword, index) => (
              <p
                key={index}
                className="bg-[#f6f6f6] dark:bg-black py-1 px-2 mb-2 rounded-3xl border-[1px] border-solid border-[#d9d8d8] dark:border-[#6c6c6c] text-[#7d7d7d] dark:text-white"
              >
                {keyword}
              </p>
            ))}
          </div>
        </div>

        <Button
          onClick={() => {
            navigate("/mypage/userInfoModify");
          }}
          type="button"
          buttonText="개인 정보 수정"
          basicStyle="max-w-[20rem] h-[3.75rem] mt-4 border-[1px] border-solid border-[#F5AA15] dark:border-white dark:bg-black hover:bg-transparent hover:text-[#F5AA15]"
        >
          개인 정보 수정
        </Button>
      </div>
    </div>
  );
}
