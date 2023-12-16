import React from "react";

export default function Input({ type, id, placeholder, onChange }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="w-full h-[3rem] mt-2 px-6 py-3 box-border rounded-lg border-[1px] border-solid border-[#f5aa15] outline-none placeholder:text-[0.9rem] placeholder:text-[#F5AA15] font-normal text-[#2b2a2a]"
      onChange={onChange}
    />
  );
}
