import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function Button({
  type,
  onClick,
  buttonText,
  disabled,
  dataComeIn,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${
        (buttonText === "로그인" || buttonText === "회원가입") && dataComeIn
          ? "w-full bg-[#F5AA15] rounded-lg text-[1.125rem] text-white font-bold"
          : (buttonText === "로그인" || buttonText === "회원가입") &&
            !dataComeIn
          ? "w-full bg-[#d0d0d0] rounded-lg text-[1.125rem] text-white font-bold"
          : buttonText === "구글"
          ? "w-full rounded-lg border-[1px] border-solid border-[#ccc] text-[1.125rem] font-bold"
          : buttonText === "개인 정보 수정"
          ? "w-full max-w-[20rem] h-3.75rem mt-4 bg-[#F5AA15] border-[1px] border-solid dark:border-[#6c6c6c] dark:bg-black rounded-md text-[0.875rem] text-white font-semibold"
          : buttonText === "정기모임 구경하기" ||
            buttonText === "소모임 구경하기"
          ? "w-full max-w-[20rem] bg-[#f5aa15] rounded-md text-[0.875rem] text-white font-semibold"
          : ""
      } h-[3.75rem] p-3 box-border text-center relative transition-all duration-700`}
    >
      {buttonText === "구글" ? (
        <FcGoogle className="text-[2.4rem] absolute left-4 top-[20%]" />
      ) : (
        <></>
      )}
      {buttonText}
    </button>
  );
}
