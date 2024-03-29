import React from "react";

import { IoMan, IoWoman } from "react-icons/io5";

export default function InputCheckbox({
  datas,
  isChecked,
  setIsChecked,
  isCheckedList,
  setIsCheckedList,
  keywordListOpen,
}) {
  return (
    <>
      {isChecked !== undefined ? (
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
                  htmlFor={
                    data === "여성" ? "woman" : data === "남성" ? "man" : ""
                  }
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
      ) : (
        <div
          className={`${
            keywordListOpen ? "h-auto opacity-100" : "h-0 opacity-0"
          } w-full mt-3 mb-6 flex items-center flex-wrap gap-x-2 transition-all duration-700 overflow-hidden`}
        >
          {datas?.map((data) => {
            return (
              <div className="mb-2">
                <input
                  className="sr-only"
                  type="checkbox"
                  id={data}
                  name="interest"
                  value={data}
                  onChange={(e) => {
                    if (isCheckedList?.length < 5) {
                      if (!isCheckedList?.includes(e.target.value)) {
                        setIsCheckedList((prev) => [...prev, data]);
                      } else {
                        setIsCheckedList((prev) =>
                          prev?.filter((check) => check !== data)
                        );
                      }
                    } else {
                      setIsCheckedList((prev) =>
                        prev?.filter((check) => check !== data)
                      );
                    }
                  }}
                  checked={isCheckedList?.includes(data) ? true : false}
                />

                <label
                  className={`${
                    isCheckedList?.includes(data) &&
                    "bg-[#ffbd4c] border-[#ffa228] text-white"
                  } px-4 py-[10px] cursor-pointer rounded-3xl text-[#383838] text-[0.8rem] border-[1px] border-solid border-[#ccc] transition-all duration-700 flex justify-center items`}
                  htmlFor={data}
                >
                  {data}
                </label>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
