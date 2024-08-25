import React from "react";

export default function MeetingDetailSmallContent({
  hiddenBoolean,
  firstContent,
  icon,
  subTitle,
  des,
}) {
  return (
    <li
      className={`${hiddenBoolean ? "hidden" : "block"} ${
        !firstContent ? "sm:mt-10 mt-5" : null
      } flex gap-x-2 text-[1.8rem]`}
    >
      {icon}
      <div className="text-[#111111] dark:text-white">
        <p className="sm:text-[1.12rem] text-[0.9rem] font-semibold">
          {subTitle}
        </p>

        {Array.isArray(des) ? (
          <ul className="mt-2 sm:text-[1rem] text-[0.875rem] dark:text-[rgba(80,59,59,0.7)]">
            {des.map((data, idx) => (
              <li key={idx} className="mb-1 sm:mb-0">
                · {data}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 dark:text-[rgba(255,255,255,0.7)] sm:text-[1rem] text-[0.875rem]">
            {des}
          </p>
        )}
      </div>
    </li>
  );
}
