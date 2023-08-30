import React from "react";

export default function Navbar() {
  return (
    <div className="w-full h-[70px] bg-[#e98b67]">
      <div className="w-full h-full ">
        <img
          className="w-1/12 h-full object-cover"
          src={process.env.PUBLIC_URL + "/logo/logo.jpg"}
          alt="logo"
        />
      </div>
    </div>
  );
}
