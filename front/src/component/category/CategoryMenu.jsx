import React from "react";

export default function CategoryMenu({ icon, title }) {
  return (
    <button
      type="button"
      className="lg:w-[100px] lg:h-[100px] sm:w-[90px] sm:h-[90px] w-[90px] h-[90px] aspect-square border-[2px] border-solid border-white rounded-xl flex flex-col items-center justify-center hover:bg-white hover:text-[#232426] transition-all duration-700"
    >
      <img className="w-[70%] aspect-square" src={icon} alt="icon" />
      <p className="font-semibold xl:text-[1.1rem] lg:text-[1rem] sm:text-[1rem] text-[0.9rem]">
        {title}
      </p>
    </button>
  );
}
