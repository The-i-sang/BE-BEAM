import { useEffect } from "react";
import { introMyselfState, nickNameState } from "../recoil/authState";
import Input from "../component/input/Input";
import useInputGlobal from "../customhook/useInputGlobal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Button from "../component/button/Button";
import TextArea from "../component/textArea/TextArea";
import { UserNecessaryDataState } from "../recoil/userState";

import { AiOutlineSync } from "react-icons/ai";

export default function UserProfileModify() {
  const [nicknameInput, onNicknameChange] = useInputGlobal(nickNameState);
  const [introMyselfInput, onIntroMyselfChange] =
    useInputGlobal(introMyselfState);

  const setNicknameInput = useSetRecoilState(nickNameState);
  const setIntroMyselfInput = useSetRecoilState(introMyselfState);
  const userNecessaryData = useRecoilValue(UserNecessaryDataState);
  const { profileImg, userNickname } = userNecessaryData;

  useEffect(() => {
    setNicknameInput("");
    setIntroMyselfInput("");
  }, [setNicknameInput, setIntroMyselfInput]);

  useEffect(() => {
    if (userNickname) {
      setNicknameInput(userNickname);
    }
  }, [userNickname]);

  const userNicknameComment =
    nicknameInput.length === 0 && "닉네임을 입력해주세요.";

  return (
    <div className="w-full bg-[#f6f6f6] dark:bg-black">
      <div className="w-11/12 mx-auto pt-[2rem] pb-[2rem]">
        <p className="text-[1.125rem] font-semibold dark:text-white">
          프로필 수정
        </p>

        <div className="w-full mt-5 pt-[1.875rem] bg-[#ffd889] dark:bg-[rgba(255,255,255,0.2)] rounded-2xl border-[1px] border-solid border-[#ddd] dark:border-[#5b5b5b] flex flex-col items-center overflow-hidden">
          <div className="relative">
            <img
              className="mb-3 sm:w-[120px] w-[100px] aspect-square object-cover rounded-full"
              src={process.env.PUBLIC_URL + profileImg}
              alt="user_profile"
            />

            <button className="w-8 h-8 bg-[#282828] rounded-full text-white text-[1.125rem] flex justify-center items-center absolute bottom-3 right-0">
              <AiOutlineSync />
            </button>
          </div>

          <div className="w-full mt-5 py-[1.875rem] px-[1.25rem] box-border bg-white rounded-t-3xl">
            <div className="w-full mb-2">
              <label htmlFor="nickname" className="font-bold">
                닉네임
              </label>
              <Input
                type="text"
                id="nickname"
                placeholder="사용하실 닉네임을 입력해주세요."
                onChange={(e) => {
                  onNicknameChange(e);
                }}
                value={nicknameInput}
                basicStyle="placeholder:text-[0.9rem] text-[0.9rem]"
              />
              <p
                className={`${
                  nicknameInput.length !== 0 ? "opacity-0" : "opacity-100"
                } w-full h-5 mt-2 text-[0.875rem] text-[#ff0000] font-thin transition-all duration-700`}
              >
                {userNicknameComment}
              </p>
            </div>

            <div className="w-full mb-2">
              <label htmlFor="introMyself" className="font-bold">
                한 줄 소개
              </label>
              <TextArea
                type="text"
                id="introMyself"
                placeholder="Ex. 처음에는 낯을 가리지만 친해지면 수다쟁이 프론트엔드 개발자"
                onChange={(e) => {
                  onIntroMyselfChange(e);
                }}
                value={introMyselfInput}
              />
            </div>

            <Button
              buttonText="프로필 수정하기"
              onClick={() => {
                // user 닉네임, 한 줄 소개 수정한거 서버로 보내기
              }}
              disabled={nicknameInput.length === 0}
              basicStyle="mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
