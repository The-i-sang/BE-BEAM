import React from "react";

export default function DetailToolkitSmallTitle({ icon, title }) {
  return (
    <div className="flex items-center text-[1.4rem]">
      {icon}
      <p className="font-semibold ml-3 sm:text-[1rem] text-[0.9rem]">{title}</p>
    </div>
  );
}
