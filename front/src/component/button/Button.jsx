import React from "react";

export default function Button({
  type,
  onClick,
  buttonText,
  disabled,
  buttonDisabledStyle,
  basicStyle,
}) {
  const style = {
    "정기 모임 구경하기": "max-w-[20rem]",
    "소모임 구경하기": "max-w-[20rem]",
    "정보 수정":
      "h-[3.75rem] mt-4 border-[1px] border-solid dark:border-[#6c6c6c] dark:bg-black",
    "프로필 수정하기": "mt-2",
  }[buttonText];

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-full p-3 box-border rounded-md text-center font-semibold text-[0.875rem] text-white transition-all duration-700 ${basicStyle} ${
        buttonDisabledStyle ? "bg-[#d0d0d0]" : "bg-[#f5aa15]"
      }`}
    >
      {buttonText}
    </button>
  );
}
