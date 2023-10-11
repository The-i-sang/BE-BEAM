import React from "react";

export default function Footer() {
  return (
    <div className="w-full bg-[#ffffff]">
      <div className="w-11/12 mx-auto pt-2 pb-2 box-border border-t-[1px] border-solid border-[#f5aa15] flex sm:flex-row flex-col items-center">
        <img
          className="w-[80px] lg:w-1/12 sm:w-[14%] h-full object-cover"
          src={process.env.PUBLIC_URL + "/logo/logo2.png"}
          alt="logo"
        />
        <div className="w-11/12 text-[#f5aa15] text-[1.1rem] text-center">
          <p>Copyright ⓒ 2023 beBeam. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}
