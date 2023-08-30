import React from "react";

export default function Navbar() {
  return (
    <div className="w-full h-[120px] bg-[#e98b67]">
      <div className="w-10/12 mx-auto flex items-">
        <div>Menu</div>
        <div className="w-full h-full ">
          <img
            className="w-1/12 h-full object-cover mx-auto"
            src={process.env.PUBLIC_URL + "/logo/logo.png"}
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
}
