import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import Menu from "./Menu";

export default function Navbar() {
  const navigate = useNavigate();

  const [scrollHeight, setScrollHeight] = useState(0);

  function onScroll() {
    setScrollHeight(window.scrollY);
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div>
      <div className="w-1/12 h-full mx-auto">
        <div className="w-full">
          <div
            className="lg:w-[5%] md:w-[13%] sm:w-[15%] w-[20%]"
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              className="w-full object-cover mx-auto cursor-pointer"
              src={process.env.PUBLIC_URL + "/logo/logo2.png"}
              alt="logo"
            />
          </div>
        </div>

        <div className="w-full flex justify-between">
          <Menu />

          <div>
            <button
              type="button"
              className="text-[2.2rem] text-[#f5aa15] cursor-pointer"
              onClick={() => {
                navigate("/search");
              }}
            >
              <CiSearch />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
