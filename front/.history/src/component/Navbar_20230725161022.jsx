import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="w-full h-[120px] bg-[rgba(255,234,166,1)] shadow-lg fixed">
      <div className="w-11/12 h-full mx-auto flex items-center">
        <div>Menu</div>
        <div
          onClick={() => {
            navigate("/");
          }}
          className="w-full h-full cursor-pointer"
        >
          <img
            className="w-1/12 h-full object-cover mx-auto"
            src={process.env.PUBLIC_URL + "/logo/logo2.png"}
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
}
