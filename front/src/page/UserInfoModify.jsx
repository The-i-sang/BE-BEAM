import { useEffect, useState } from "react";
import Input from "../component/input/Input.jsx";
import {
  emailState,
  userBirthdayState,
  userNameState,
  userPhoneNumberState,
} from "../recoil/authState";
import useInputGlobal from "../customhook/useInputGlobal.jsx";
import { useRecoilState, useRecoilValue } from "recoil";
import Button from "../component/button/Button";
import InputCheckbox from "../component/inputCheckbox/InputCheckbox";
import { formatDate, identify } from "../common.js";
import {
  IsCheckedListKeywordState,
  UserNecessaryDataState,
} from "../recoil/userState.js";

import { CiSquareInfo, CiCircleCheck } from "react-icons/ci";
import { FaCircleChevronUp, FaCircleChevronDown } from "react-icons/fa6";

export default function UserInfoModify() {
  const [userNameInput, onUserNameChange, setUserNameInput] =
    useInputGlobal(userNameState);
  const [
    userPhoneNumberInput,
    onUserPhoneNumberChange,
    setUserPhoneNumberInput,
  ] = useInputGlobal(userPhoneNumberState);
  const [emailInput, onEmailChange, setEmailInput] = useInputGlobal(emailState);
  const [userBirthdayInput, onUserBirthdayChange, setBirthdayInput] =
    useInputGlobal(userBirthdayState);
  const [isCheckedListKeyword, setIsCheckedListKeyword] = useRecoilState(
    IsCheckedListKeywordState
  );
  const userNecessaryData = useRecoilValue(UserNecessaryDataState);
  const { userRealName, userGender, userEmail, userBirthday } =
    userNecessaryData;

  const [emailIdentifyCheck, setEmailIdentifyCheck] = useState(null);
  const [isChecked, setIsChecked] = useState("");
  const [keywordListOpen, setKeywordListOpen] = useState(false);
  const [birthday, setBirthday] = useState("");

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

  const dataComeIn =
    userNameInput &&
    userPhoneNumberInput &&
    userPhoneNumberInput.length === 11 &&
    emailInput &&
    emailIdentifyCheck &&
    userBirthdayInput &&
    isChecked
      ? true
      : false;

  const datas = ["여성", "남성"];
  const keywordDatas = [
    "음악",
    "그림",
    "음식",
    "드라마",
    "영화",
    "사진",
    "마라톤",
    "댄스",
    "악기",
    "노래",
    "디저트",
    "요리",
    "취업",
    "공부",
    "회화",
    "뮤지컬",
    "랩",
    "발라드",
    "술",
    "독서",
    "연기",
    "패션",
  ];

  useEffect(() => {
    if (userBirthday) {
      setBirthday(formatDate(userBirthday));
    }
  }, [userBirthday, setBirthday]);

  useEffect(() => {
    if (userRealName || userGender || userEmail || birthday) {
      setUserNameInput(userRealName);
      setEmailInput(userEmail);
      setBirthdayInput(birthday);
      setIsChecked(
        userGender === "female" ? "여성" : userGender === "male" ? "남성" : ""
      );
    }
  }, [userRealName, userGender, userEmail, birthday]);

  const userNameComment = userNameInput.length === 0 && "이름을 입력해주세요.";

  const userPhoneNumberComment =
    userPhoneNumberInput.length === 0 && "핸드폰 번호를 입력해주세요.";

  const userEmailComment =
    emailInput.length !== 0 && emailIdentifyCheck
      ? ""
      : emailInput.length !== 0 && !emailIdentifyCheck
      ? "이메일 양식을 맞춰주세요."
      : "이메일을 입력하세요.";

  const userBirthdayComment =
    userBirthdayInput.length === 0 && "생일을 입력해주세요.";

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
                basicStyle="placeholder:text-[0.9rem] text-[0.9rem]"
              />
              <p
                className={`${
                  userNameInput.length !== 0 ? "opacity-0" : "opacity-100"
                } w-full h-5 mt-2 text-[0.875rem] text-[#ff0000] font-thin transition-all duration-700`}
              >
                {userNameComment}
              </p>
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
                  basicStyle="placeholder:text-[0.9rem] text-[0.9rem]"
                />

                <Button
                  type="button"
                  buttonText="휴대전화 인증"
                  disabled={userPhoneNumberInput.length < 11}
                  basicStyle="mt-2 border-[1px] border-solid"
                />
              </div>

              <p
                className={`${
                  userPhoneNumberInput.length !== 0
                    ? "opacity-0"
                    : "opacity-100"
                } w-full h-5 mt-2 text-[0.875rem] text-[#ff0000] font-thin transition-all duration-700`}
              >
                {userPhoneNumberComment}
              </p>
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
                basicStyle="placeholder:text-[0.9rem] text-[0.9rem]"
              />
              <p
                className={`${
                  emailIdentifyCheck ? "opacity-0" : "opacity-100"
                } ${
                  emailInput.length === 0 && "opacity-100"
                } w-full h-5 mt-2 text-[0.875rem] text-[#ff0000] font-thin transition-all duration-700`}
              >
                {userEmailComment}
              </p>
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
                basicStyle="text-[0.8rem]"
              />
              <p
                className={`${
                  userBirthdayInput.length !== 0 ? "opacity-0" : "opacity-100"
                } w-full h-5 mt-2 text-[0.875rem] text-[#ff0000] font-thin transition-all duration-700`}
              >
                {userBirthdayComment}
              </p>
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

            <div>
              <div className="w-full mt-2 mb-4 flex items-center gap-x-2">
                <p className="text-[0.8125rem] font-thin">
                  키워드에 맞는 콘텐츠를 추천해드려요!
                </p>

                <button
                  onClick={() => setKeywordListOpen((prev) => !prev)}
                  className="text-[1.4rem]"
                >
                  {keywordListOpen ? (
                    <FaCircleChevronUp className="text-[#ffc85b]" />
                  ) : (
                    <FaCircleChevronDown className="text-[#ffc85e]" />
                  )}
                </button>
              </div>

              <InputCheckbox
                datas={keywordDatas}
                isCheckedList={isCheckedListKeyword}
                setIsCheckedList={setIsCheckedListKeyword}
                keywordListOpen={keywordListOpen}
              />
            </div>
          </div>

          <Button
            onClick={() => {
              // 서버로 수정한 데이터 넘겨주기.
            }}
            buttonText="정보 수정"
            disabled={!dataComeIn}
            basicStyle="h-[3.75rem] mt-4 border-[1px] border-solid dark:border-[#6c6c6c] dark:bg-black"
          />
        </div>
      </div>
    </div>
  );
}
