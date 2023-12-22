import React, { useEffect } from "react";

import Input from "../component/Input";
import { userNameState } from "../recoil/authState";
import useInput from "../customhook/useInput";

import { CiSquareInfo } from "react-icons/ci";
import { useSetRecoilState } from "recoil";

export default function UserInfoModify() {
  const [userNameInput, onUserNameChange] = useInput(userNameState);
  const setUserNameInput = useSetRecoilState(userNameState);

  // 첫 랜더링시 user의 userNameInput 데이터를 받아와서 userNameInput에 담아주기.
  useEffect(() => {
    setUserNameInput("");
  }, [setUserNameInput]);

  return (
    <div className="w-full py-[2rem] bg-[#f6f6f6] dark:bg-black">
      <div className="w-11/12 mx-auto">
        <p className="text-[1.125rem] font-semibold dark:text-white">
          프로필 수정
        </p>

        <div className="w-full mt-5 py-[1.875rem] px-[1.25rem] box-border bg-white dark:bg-[rgba(255,255,255,0.2)] rounded-2xl border-[1px] border-solid border-[#ddd] dark:border-[#5b5b5b]">
          <div className="w-full px-2 py-3 box-border bg-[#f7f7f7] rounded-lg flex items-center gap-x-3 text-[0.875rem] text-[#666]">
            <CiSquareInfo className="text-[1.8rem] text-[#2e97a7]" />
            <p>
              하단 정보는 본인 확인 및 마케팅 수신 서비스에 사용되며, 절대로
              프로필에 공개되지 않습니다.
            </p>
          </div>

          <div className="w-full mt-10">
            <div className="w-full mb-2">
              <label htmlFor="userName" className="font-bold">
                이름
              </label>
              <Input
                type="text"
                id="userName"
                placeholder="이름을 입력해주세요."
                onChange={(e) => {
                  onUserNameChange(e);
                }}
                value={userNameInput}
              />
              <p
                className={`${
                  userNameInput.length !== 0 ? "opacity-0" : "opacity-100"
                } ${
                  userNameInput.length === 0 && "opacity-100"
                } w-full h-5 mt-2 text-[0.875rem] text-[#ff0000] font-thin transition-all duration-700`}
              >{`${
                userNameInput.length === 0 ? "이름을 입력해주세요." : ""
              }`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
