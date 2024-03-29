import React from "react";

export default function Input({
  type,
  id,
  placeholder,
  onChange,
  value,
  maxLength,
  basicStyle,
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={`${basicStyle} w-full h-[3rem] mt-2 py-3 box-border rounded-lg border-[1px] border-solid border-[#f5aa15] outline-none placeholder:text-[#F5AA15] font-normal text-[#494545]`}
      onChange={onChange}
      value={value}
      maxLength={maxLength}
    />
  );
}
