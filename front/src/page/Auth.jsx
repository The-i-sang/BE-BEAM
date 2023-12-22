//login / signUp

import { useEffect, useState } from "react";
import Button from "../component/Button";
import Input from "../component/Input";
import { useNavigate, useLocation } from "react-router-dom";
import useInput from "../customhook/useInput";
import {
  emailState,
  nickNameState,
  passwordCheckState,
  passwordState,
} from "../recoil/authState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../recoil/userState";
import { identify } from "../common.js";

function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const content = location.state.content || "";

  const [emailInput, onEmailChange] = useInput(emailState);
  const [passwordInput, onPasswordChange] = useInput(passwordState);
  const [passwordCheckInput, onPasswordCheckChange] =
    useInput(passwordCheckState);
  const [nicknameInput, onNicknameChange] = useInput(nickNameState);

  // email이 맞는지 확인하는 useState
  const [emailIdentifyCheck, setEmailIdentifyCheck] = useState(null);
  // password가 맞는지 확인하는 useState
  const [passwordIdentifyCheck, setPasswordIdentifyCheck] = useState(null);

  // 모든 데이터를 입력받았는지 확인하는 useState
  const [dataComeIn, setDataComeIn] = useState(false);

  // 모든 상태가 변경된 채로 랜더링이 완료되었는지 알아보기 위한 useState
  // true = 아직 로딩 중이라는 의미.
  const [loading, setLoading] = useState(true);

  // email, password, passwordCheck, nickname 데이터를 다른 곳에서 사용할 수 있으니
  // 커스텀 훅과 recoil을 연결하여 전역 상태로 관리.
  const setEmailInput = useSetRecoilState(emailState);
  const setPasswordInput = useSetRecoilState(passwordState);
  const setPasswordCheckInput = useSetRecoilState(passwordCheckState);
  const setNicknameInput = useSetRecoilState(nickNameState);

  // user가 들어왔는지 안 들어왔는지 확인하는 전역 데이터.
  const userIn = useRecoilValue(userState);

  useEffect(() => {
    setEmailInput("");
    setPasswordInput("");
    setPasswordCheckInput("");
    setNicknameInput("");
  }, [content]);

  useEffect(() => {
    const same =
      emailInput &&
      emailIdentifyCheck &&
      passwordInput &&
      passwordIdentifyCheck;

    if (
      (content === "login" && same) ||
      (content === "signUp" &&
        same &&
        passwordCheckInput &&
        passwordInput === passwordCheckInput &&
        nickNameState)
    ) {
      setDataComeIn(true);
    } else {
      setDataComeIn(false);
    }
  }, [
    content,
    emailInput,
    passwordInput,
    passwordCheckInput,
    nicknameInput,
    emailIdentifyCheck,
    passwordIdentifyCheck,
  ]);

  useEffect(() => {
    setLoading(false);
  }, []);

  // user가 있을시 Auth 페이지에 접근 불가.
  useEffect(() => {
    if (userIn) {
      navigate("/");
    }
  }, [userIn]);

  return (
    <>
      {!loading && (
        <div className="w-full">
          <div
            className={`${
              content === "login" ? "pb-10" : "pb-20"
            } sm:w-[500px] w-full mx-auto sm:pt-0 pt-10 px-5 box-border flex flex-col items-center`}
          >
            <img
              className="md:w-[100px] sm:w-[90px] w-[80px] object-cover mx-auto cursor-pointer"
              src={
                process.env.PUBLIC_URL + "/logo/logo2.png".replace("./", "/")
              }
              alt="logo"
            />

            <div>
              <h1 className="mt-6 text-[1.8rem] font-black">
                연결망을 통한 따뜻한 사회로.
              </h1>
              <div className="mt-2 flex items-center gap-x-2 justify-center text-[1.125rem] font-thin">
                <p>{`${
                  content === "login"
                    ? "아직 회원이 아니신가요?"
                    : "이미 회원이신가요?"
                }`}</p>

                <button
                  onClick={(e) => {
                    e.preventDefault();

                    if (content === "login") {
                      const content = "signUp";
                      navigate("/auth", { state: { content } });
                    } else if (content === "signUp") {
                      const content = "login";
                      navigate("/auth", { state: { content } });
                    }
                  }}
                  className="text-[#f5aa15]"
                >
                  {`${content === "login" ? "회원가입하기" : "로그인하기"}`}
                </button>
              </div>
            </div>

            <form className="w-full mt-10">
              <div className="w-full mb-6">
                <div className="w-full mb-2">
                  {/* id로 로그인할 수 있도록 할 건지, 이메일로 로그인할 수 있도록 할 건지. */}
                  <label htmlFor="email" className="font-bold">
                    이메일
                  </label>
                  <Input
                    type="email"
                    id="email"
                    placeholder={`${
                      content === "login"
                        ? "이메일을 입력해주세요."
                        : "사용하실 이메일을 입력해주세요."
                    }`}
                    onChange={(e) => {
                      onEmailChange(e);

                      identify(
                        e.target.value,
                        undefined,
                        setEmailIdentifyCheck,
                        setPasswordIdentifyCheck
                      );
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
                  <label htmlFor="password" className="font-bold">
                    비밀번호
                  </label>
                  <Input
                    type="password"
                    id="password"
                    placeholder={`${
                      content === "login"
                        ? "비밀번호를 입력해주세요."
                        : "사용하실 비밀번호를 입력해주세요."
                    }`}
                    onChange={(e) => {
                      onPasswordChange(e);

                      identify(
                        undefined,
                        e.target.value,
                        setEmailIdentifyCheck,
                        setPasswordIdentifyCheck
                      );
                    }}
                    value={passwordInput}
                  />
                  <p
                    className={`${
                      passwordIdentifyCheck ? "opacity-0" : "opacity-100"
                    } ${
                      passwordInput.length === 0 && "opacity-100"
                    } w-full h-5 mt-2 text-[0.875rem] text-[#ff0000] font-thin transition-all duration-700`}
                  >{`${
                    passwordInput.length !== 0 && passwordIdentifyCheck
                      ? ""
                      : passwordInput.length !== 0 && !passwordIdentifyCheck
                      ? "대소문자, 특수문자, 숫자를 포함하여 8자리 이상 입력해주세요."
                      : "비밀번호를 입력해주세요."
                  }`}</p>
                </div>

                {content === "signUp" && (
                  <>
                    <div className="w-full mb-2">
                      <label htmlFor="passwordCheck" className="font-bold">
                        비밀번호 확인
                      </label>
                      <Input
                        type="password"
                        id="passwordCheck"
                        placeholder="사용하실 비밀번호를 재입력해주세요."
                        onChange={(e) => {
                          onPasswordCheckChange(e);
                        }}
                        value={passwordCheckInput}
                      />
                      <p
                        className={`${
                          passwordCheckInput.length !== 0 &&
                          passwordInput === passwordCheckInput
                            ? "opacity-0"
                            : "opacity-100"
                        } ${
                          passwordCheckInput.length === 0 && "opacity-100"
                        } w-full h-5 mt-2 text-[0.875rem] text-[#ff0000] font-thin transition-all duration-700`}
                      >{`${
                        passwordCheckInput.length !== 0 &&
                        passwordInput === passwordCheckInput
                          ? ""
                          : passwordCheckInput.length !== 0 &&
                            passwordInput !== passwordCheckInput
                          ? "비밀번호가 일치하지 않습니다."
                          : "비밀번호를 입력해주세요."
                      }`}</p>
                    </div>

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
                      />
                      <p
                        className={`${
                          nicknameInput.length !== 0
                            ? "opacity-0"
                            : "opacity-100"
                        } ${
                          nicknameInput.length === 0 && "opacity-100"
                        } w-full h-5 mt-2 text-[0.875rem] text-[#ff0000] font-thin transition-all duration-700`}
                      >{`${
                        nicknameInput.length === 0
                          ? "닉네임을 입력해주세요."
                          : ""
                      }`}</p>
                    </div>

                    <div className="w-full mb-2">
                      <label htmlFor="condition" className="font-bold">
                        이용 약관 동의
                      </label>
                      {/* 데이터 수집 완료되면 추가할 예정 */}
                    </div>
                  </>
                )}
              </div>

              <Button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();

                  // 로그인 / 회원가입 관련 로직 필요.

                  if (content === "login") {
                    alert("로그인 되었습니다.!");
                    // 로그인이 되었으면 메인페이지로 보내기 + Auth 페이지에 접근하지 못하게 하기
                    navigate("/");
                  } else {
                    alert("회원가입 되었습니다!");
                    // 회원가입 후에 바로 로그인되고 메인페이지로 보낼지, 아니면 로그인을 하도록 로그인 페이지로 보낼지 추후 상의.
                    navigate("/");
                  }
                }}
                buttonText={`${content === "login" ? "로그인" : "회원가입"}`}
                disabled={dataComeIn ? false : true}
                dataComeIn={dataComeIn}
              />
            </form>

            {content === "login" && (
              <>
                <div className="w-full my-8 text-[0.9375rem] font-bold text-[#282828] relative text-center">
                  <div className="w-[43%] h-[1px] bg-[#dddddd] absolute left-0 top-[40%]" />
                  <p>또는</p>
                  <div className="w-[43%] h-[1px] bg-[#dddddd] absolute right-0 top-[40%]" />
                </div>

                <Button buttonText="구글" disabled={false} />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Auth;
