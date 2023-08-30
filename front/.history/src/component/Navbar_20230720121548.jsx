import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[120px] bg-[#ffcb2d]">
      <div className="w-11/12 h-full mx-auto flex items-center">
        <div>Menu</div>
        <div
          onClick={() => {
            navigate("/");
          }}
          className="w-full h-full"
        >
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
