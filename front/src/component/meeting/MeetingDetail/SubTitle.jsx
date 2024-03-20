import React from "react";

export default function SubTitle({ title, des }) {
  return (
    <div>
      <h1 className="sm:text-[1.5rem] text-[1.2rem] text-[#282828] dark:text-white font-semibold">
        {title}
      </h1>

      <p className="sm:mt-2 mt-1 dark:text-[rgba(255,255,255,0.7)] sm:text-[1rem] text-[0.875rem] font-medium">
        {des}
      </p>
    </div>
  );
}
