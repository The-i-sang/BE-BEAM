import React, { useEffect, useState } from "react";

import Input from "../component/Input";
import {
  emailState,
  userBirthdayState,
  userNameState,
  userPhoneNumberState,
} from "../recoil/authState";
import useInput from "../customhook/useInput";
import { useSetRecoilState } from "recoil";
import Button from "../component/Button";

import { CiSquareInfo, CiCircleCheck } from "react-icons/ci";
import { identify } from "../common.js";
import InputCheckbox from "../component/InputCheckbox.jsx";

export default function UserInfoModify() {
  const [userNameInput, onUserNameChange] = useInput(userNameState);
  const [userPhoneNumberInput, onUserPhoneNumberChange] =
    useInput(userPhoneNumberState);
  const [emailInput, onEmailChange] = useInput(emailState);
  const [userBirthdayInput, onUserBirthdayChange] = useInput(userBirthdayState);

  // email이 맞는지 확인하는 useState
  const [emailIdentifyCheck, setEmailIdentifyCheck] = useState(null);

  const setUserNameInput = useSetRecoilState(userNameState);
  const setUserPhoneNumberInput = useSetRecoilState(userPhoneNumberState);
  const setEmailInput = useSetRecoilState(emailState);
  const setBirthdayInput = useSetRecoilState(userBirthdayState);

  // 체크박스에 체크되었는지 확인하는 useState
  const [isChecked, setIsChecked] = useState("");

  // 모든 데이터를 입력받았는지 확인하는 useState
  const [dataComeIn, setDataComeIn] = useState(false);

  const datas = ["여성", "남성"];

  // 첫 랜더링시 user의 userNameInput, userPhoneNumberInput, emailInput, birthdayInput, isChecked 데이터를 받아와서 userNameInput, userPhoneNumberInput, setEmailInput, setBirthdayInput, setIsChecked에 담아주기.
  useEffect(() => {
    setUserNameInput("");
    setUserPhoneNumberInput("");
    setEmailInput("");
    setBirthdayInput("");
    setIsChecked("");
  }, [
    setUserNameInput,
    setUserPhoneNumberInput,
    setEmailInput,
    setBirthdayInput,
    setIsChecked,
  ]);

  useEffect(() => {
    if (
      userNameInput &&
      userPhoneNumberInput &&
      userPhoneNumberInput.length === 11 &&
      emailInput &&
      emailIdentifyCheck &&
      userBirthdayInput &&
      isChecked
    ) {
      setDataComeIn(true);
    } else {
      setDataComeIn(false);
    }
  }, [
    userNameInput,
    userPhoneNumberInput,
    emailInput,
    emailIdentifyCheck,
    userBirthdayInput,
    isChecked,
  ]);

  return (
    <div className="w-full py-[2rem] bg-[#f6f6f6] dark:bg-black">
      <div className="w-11/12 mx-auto">
        <p className="text-[1.125rem] font-semibold dark:text-white">
          개인 정보
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

            <div className="w-full mb-2">
              <label htmlFor="phoneNumber" className="font-bold">
                휴대전화 번호
              </label>

              <div className="w-full flex items-center gap-x-5">
                <Input
                  type="text"
                  id="phoneNumber"
                  placeholder="핸드폰 번호를 입력해주세요."
                  onChange={(e) => {
                    onUserPhoneNumberChange(e);
                  }}
                  value={userPhoneNumberInput}
                  maxLength="11"
                />

                {/* 인증 완료시 인증 완료 문구로 변경 */}
                <Button
                  buttonText="휴대전화 인증"
                  disabled={userPhoneNumberInput.length === 11 ? false : true}
                  userPhoneNumberInput={userPhoneNumberInput}
                />

                {/* <div className="w-[10rem] flex items-center justify-center gap-x-1 text-[0.875rem] text-[#f55]">
                  <CiCircleCheck className="text-[1.4rem]" />
                  <p>인증 완료</p>
                </div> */}
              </div>

              <p
                className={`${
                  userPhoneNumberInput.length !== 0
                    ? "opacity-0"
                    : "opacity-100"
                } ${
                  userPhoneNumberInput.length === 0 && "opacity-100"
                } w-full h-5 mt-2 text-[0.875rem] text-[#ff0000] font-thin transition-all duration-700`}
              >{`${
                userPhoneNumberInput.length === 0
                  ? "핸드폰 번호를 입력해주세요."
                  : ""
              }`}</p>
            </div>

            <div className="w-full mb-2">
              <label htmlFor="email" className="font-bold">
                이메일
              </label>
              <Input
                type="text"
                id="email"
                placeholder="이메일을 입력해주세요."
                onChange={(e) => {
                  onEmailChange(e);

                  identify(e.target.value, undefined, setEmailIdentifyCheck);
                }}
                value={emailInput}
              />
              <p
                className={`${
                  emailIdentifyCheck ? "opacity-0" : "opacity-100"
                } ${
                  emailInput.length === 0 && "opacity-100"
                } w-full h-5 mt-2 text-[0.875rem] text-[#ff0000] font-thin transition-all duration-700`}
              >{`${
                emailInput.length !== 0 && emailIdentifyCheck
                  ? ""
                  : emailInput.length !== 0 && !emailIdentifyCheck
                  ? "이메일 양식을 맞춰주세요."
                  : "이메일을 입력하세요."
              }`}</p>
            </div>

            <div className="w-full mb-2">
              <label htmlFor="birth" className="font-bold">
                생일
              </label>
              <Input
                type="date"
                id="birth"
                placeholder="생일을 입력해주세요."
                onChange={(e) => {
                  onUserBirthdayChange(e);
                }}
                value={userBirthdayInput}
              />
              <p
                className={`${
                  userBirthdayInput.length !== 0 ? "opacity-0" : "opacity-100"
                } ${
                  userBirthdayInput.length === 0 && "opacity-100"
                } w-full h-5 mt-2 text-[0.875rem] text-[#ff0000] font-thin transition-all duration-700`}
              >{`${
                userBirthdayInput.length === 0 ? "생일을 입력해주세요." : ""
              }`}</p>
            </div>

            <div className="w-full mb-2">
              <label htmlFor="userName" className="font-bold">
                성별
              </label>
              <InputCheckbox
                datas={datas}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
              />
            </div>

            <div>{/* 개인 정보 처리 및 마케팅 수신 동의 */}</div>
          </div>

          <Button
            onClick={(e) => {
              e.preventDefault();

              // 서버로 수정한 데이터 넘겨주기.
            }}
            buttonText="정보 수정"
            disabled={dataComeIn ? false : true}
            dataComeIn={dataComeIn}
          />
        </div>
      </div>
    </div>
  );
}
