import React from "react";

export default function Input({
  type,
  id,
  placeholder,
  onChange,
  value,
  maxLength,
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={`${
        type === "date"
          ? "text-[0.8rem]"
          : "placeholder:text-[0.9rem] text-[0.9rem]"
      } w-full h-[3rem] mt-2 px-6 py-3 box-border rounded-lg border-[1px] border-solid border-[#f5aa15] outline-none placeholder:text-[#F5AA15] font-normal text-[#494545]`}
      onChange={onChange}
      value={value}
      maxLength={maxLength}
    />
  );
}
