import React from "react";

export default function Button({
  type,
  onClick,
  buttonText,
  disabled,
  buttonDisabledStyle,
}) {
  const style = {
    "개인 정보 수정":
      "max-w-[20rem] h-[3.75rem] mt-4 border-[1px] border-solid border-[#F5AA15] dark:border-white dark:bg-black hover:bg-transparent hover:text-[#F5AA15]",
    "정기 모임 구경하기": "max-w-[20rem]",
    "소모임 구경하기": "max-w-[20rem]",
    신청하기: "h-auto mt-2",
    "정보 수정":
      "h-[3.75rem] mt-4 border-[1px] border-solid dark:border-[#6c6c6c] dark:bg-black",
    "프로필 수정하기": "mt-2",
  }[buttonText];

  console.log(buttonDisabledStyle);

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-full p-3 box-border rounded-md text-center font-semibold text-[0.875rem] text-white transition-all duration-700 ${style} ${
        buttonDisabledStyle ? "bg-[#d0d0d0]" : "bg-[#f5aa15]"
      }`}
    >
      {buttonText}
    </button>
  );
}
