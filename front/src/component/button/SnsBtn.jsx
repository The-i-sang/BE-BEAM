import React from "react";

export default function SnsBtn({ buttonText, icon }) {
  console.log(icon);
  return (
    <button className="w-full mb-4 py-2 box-border rounded-lg border-[1px] border-solid border-[#ccc] text-[1.125rem] font-bold flex items-center justify-center gap-x-2 hover:bg-[#282828] hover:text-white transition-all duration-700">
      <div className="text-[2.4rem]">{icon}</div>
      {buttonText}
    </button>
  );
}
