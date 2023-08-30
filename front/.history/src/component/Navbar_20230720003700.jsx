import React from "react";

export default function Navbar() {
  return (
    <div className="w-full h-[70px]">
      <img src={process.env.PUBLIC_URL + "/logo/logo.jpg"} alt="logo" />
    </div>
  );
}
