import React from "react";

import { IoMan, IoWoman } from "react-icons/io5";

export default function InputCheckbox({ datas, isChecked, setIsChecked }) {
  return (
    <div className="mt-3 mb-6 flex items-center justify-between gap-x-2">
      {datas?.map((data) => {
        return (
          <div className="w-1/2">
            <input
              className="sr-only"
              type="checkbox"
              id={data === "여성" ? "woman" : data === "남성" ? "man" : ""}
              name={`${
                data.includes("여성") || data.includes("남성") ? "sex" : ""
              }`}
              value={data}
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  setIsChecked(data);
                }
              }}
              checked={data !== isChecked ? false : true}
            />

            <label
              className={`${
                data === isChecked && "bg-[#ffbd4c] border-[#ffa228]"
              } w-full py-3 cursor-pointer rounded-lg text-[#383838] border-[1px] border-solid border-[#ccc] transition-all duration-700 flex justify-center items`}
              htmlFor={data === "여성" ? "woman" : data === "남성" ? "man" : ""}
            >
              <span
                className={`${
                  data === isChecked ? "text-white" : "text-[#ccc]"
                } transition-all duration-700 flex items-center justify-center gap-x-1`}
              >
                {data === "여성" ? (
                  <IoWoman className="text-[1.2rem]" />
                ) : data === "남성" ? (
                  <IoMan className="text-[1.2rem]" />
                ) : (
                  <></>
                )}

                {data}
              </span>
            </label>
          </div>
        );
      })}
    </div>
  );
}
