import React from "react";

export default function Footer() {
  return (
    <div className="w-full bg-[#ffffff]">
      <div className="w-11/12 mx-auto py-10 box-border border-t-[1px] border-solid border-[#f5aa15] flex sm:flex-row flex-col items-center">
        <img
          className="w-[21%] lg:w-[80px] sm:w-[14%] h-full object-cover"
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
