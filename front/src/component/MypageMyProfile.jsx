import React, { useEffect, useState } from "react";

import { CiEdit } from "react-icons/ci";
import Button from "./Button";

export default function MypageMyProfile() {
  const [color, setColor] = useState([]);

  const keywordBox = [
    { title: "산책/크래킹", color: "pink" },
    { title: "가죽공예", color: "green" },
    { title: "코딩", color: "sky" },
    { title: "그림", color: "yellow" },
    { title: "자수/뜨개질", color: "black" },
    { title: "영화", color: "violet" },
    { title: "술", color: "orange" },
    { title: "음악", color: "blue" },
  ];

  useEffect(() => {
    setColor(keywordBox.map((item) => item.color));
  }, []);

  console.log(color);

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between">
        <p className="text-[1.125rem] font-semibold">나의 프로필</p>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();

            // 로그아웃 관련 로직 필요
          }}
          className="text-[0.875rem] text-[#828282]"
        >
          로그아웃
        </button>
      </div>

      <div className="w-full mt-5 pt-[1.875rem] pb-[1.25rem] px-[1.25rem] box-border bg-white rounded-2xl border-[1px] border-solid border-[#ddd] flex flex-col items-center">
        <div className="w-full pb-[1.25rem] border-b-[1px] border-solid border-[#ddd] flex flex-col items-center">
          <div className="relative">
            <img
              className="mb-3 sm:w-[100px] w-[80px] h-full object-cover rounded-full"
              src={process.env.PUBLIC_URL + "/image/basic_user_profile.jpg"}
              alt="logo"
            />

            <button className="w-[25px] h-[25px] bg-white border-[1px] border-solid border-[#cacaca] rounded-full flex items-center justify-center absolute top-0 right-0">
              <CiEdit className="text-[#818181]" />
            </button>
          </div>

          <p className="mb-4 text-[1.0625rem] font-semibold">nickname</p>
          <p className="text-[0.9375rem] text-[#666]">안녕하세요.</p>

          <div className="w-full mt-5 text-[0.8125rem] font-medium flex justify-center items-center flex-wrap gap-x-2">
            {keywordBox?.map((keyword, index) => {
              return (
                <p
                  key={index}
                  className={`${
                    color[index] && color[index] !== "black"
                      ? `border-${color[index]}-500 text-${color[index]}-500`
                      : color[index] && color[index] === "black"
                      ? "border-black text-black"
                      : ""
                  } py-1 px-2 mb-2 rounded-3xl border-[1px] border-solid`}
                >
                  {keyword.title}
                </p>
              );
            })}
          </div>
        </div>

        <Button buttonText="개인 정보 수정" disabled={false} />
      </div>
    </div>
  );
}
