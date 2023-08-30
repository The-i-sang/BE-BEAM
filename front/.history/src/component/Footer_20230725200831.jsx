import React from "react";

export default function Footer() {
  return (
    <div className="w-full bg-[#ffeaa6]">
      <div className="w-11/12 mx-auto pt-2 pb-2 box-border border-t-[1px] border-solid border-[#f5aa15] flex items-center">
        <img
          className="w-1/12 h-full object-cover"
          src={process.env.PUBLIC_URL + "/logo/logo2.png"}
          alt="logo"
        />
        <p>Copyright ⓒ 2023 beBeam. All Rights Reserved.</p>
      </div>
    </div>
  );
}
