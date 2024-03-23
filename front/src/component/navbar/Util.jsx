import React from "react";

export default function Util({
  icon,
  onClick,
  basicStyle,
  smStyle,
  mdStyle,
  lgStyle,
  isHidden,
}) {
  return (
    <button
      type="button"
      className={`${basicStyle} ${smStyle} ${mdStyle} ${lgStyle} ${isHidden} text-[1.2rem] text-[#f5aa15] cursor-pointer`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
