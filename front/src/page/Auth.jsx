//login.js

import { useEffect, useState } from "react";
import Button from "../component/Button";
import Input from "../component/Input";
import { useNavigate, useLocation } from "react-router-dom";
import useInput from "../customhook/useInput";

function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const content = location.state.content || "";

  const [emailInput, onEmailChange, setEmailInput] = useInput("");
  const [passwordInput, onPasswordChange, setPasswordInput] = useInput("");
  const [passwordCheckInput, onPasswordCheckChange, setPasswordCheckInput] =
    useInput("");
  const [nicknameInput, onNicknameChange, setNicknameInput] = useInput("");

  // email이 맞는지 확인하는 useState
  const [emailIdentifyCheck, setEmailIdentifyCheck] = useState(null);
  // password가 맞는지 확인하는 useState
  const [passwordIdentifyCheck, setPasswordIdentifyCheck] = useState(null);

  console.log(emailIdentifyCheck);

  // email이 맞는지 확인하는 함수
  const identify = (emailInput, passwordInput) => {
    if (emailInput) {
      // email 주소 유효성 검사 정규표현식
      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

      return !emailRegex.test(emailInput)
        ? setEmailIdentifyCheck(false)
        : setEmailIdentifyCheck(true);
    } else if (passwordInput) {
      // password 주소 유효성 검사 정규표현식
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return !passwordRegex.test(passwordInput)
        ? setPasswordIdentifyCheck(false)
        : setPasswordIdentifyCheck(true);
    }
  };

  useEffect(() => {
    setEmailInput("");
    setPasswordInput("");
    setPasswordCheckInput("");
    setNicknameInput("");
  }, []);

  return (
    <div className="w-full">
      <div
        className={`${
          content === "login" ? "pb-10" : "pb-20"
        } w-[500px] max-w-[500px] mx-auto sm:pt-0 pt-10 px-8 box-border flex flex-col items-center`}
      >
        <img
          className="md:w-[100px] sm:w-[90px] w-[80px] object-cover mx-auto cursor-pointer"
          src={process.env.PUBLIC_URL + "/logo/logo2.png".replace("./", "/")}
          alt="logo"
        />

        <div>
          <h1 className="mt-6 text-[2rem] font-black">
            연결망을 통한 따뜻한 사회로.
          </h1>
          <div className="mt-2 flex items-center gap-x-2 justify-center text-[1.125rem]">
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
              <label htmlFor="id" className="font-bold">
                이메일
              </label>
              <Input
                type="email"
                id="id"
                placeholder={`${
                  content === "login"
                    ? "이메일을 입력해주세요."
                    : "사용하실 이메일을 입력해주세요."
                }`}
                onChange={(e) => {
                  onEmailChange(e);

                  identify(e.target.value, undefined);
                }}
                value={emailInput}
              />

              <p
                className={`${
                  emailIdentifyCheck ? "opacity-0" : "opacity-100"
                } w-full h-5 mt-2 text-[0.875rem] text-[#ff0000] transition-all duration-700`}
              >{`${
                emailInput.length !== 0 && emailIdentifyCheck
                  ? ""
                  : emailInput.length !== 0 && emailIdentifyCheck === false
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

                  identify(undefined, e.target.value);
                }}
                value={passwordInput}
              />
              <p
                className={`${
                  passwordIdentifyCheck ? "opacity-0" : "opacity-100"
                } w-full h-5 mt-2 text-[0.875rem] text-[#ff0000] transition-all duration-700`}
              >{`${
                passwordInput.length !== 0 && passwordIdentifyCheck
                  ? ""
                  : passwordInput.length !== 0 &&
                    passwordIdentifyCheck === false
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
                    } w-full h-5 mt-2 text-[0.875rem] text-[#ff0000] transition-all duration-700`}
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
                      nicknameInput.length !== 0 ? "opacity-0" : "opacity-100"
                    } w-full h-5 mt-2 text-[0.875rem] text-[#ff0000] transition-all duration-700`}
                  >{`${
                    nicknameInput.length === 0 ? "닉네임을 입력해주세요." : ""
                  }`}</p>
                </div>
              </>
            )}
          </div>

          {/* 로그인에 필요한 정보들 다 받기 전에는 비활성화 시키기 */}
          {/* disabled에 삼항연산자 넣어서 수정 */}
          <Button
            type="submit"
            onClick={() => {
              navigate("/login");
            }}
            buttonText={`${content === "login" ? "로그인" : "회원가입"}`}
            disabled={false}
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
  );
}

export default Auth;
