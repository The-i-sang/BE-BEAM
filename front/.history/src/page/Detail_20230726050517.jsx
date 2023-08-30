import React from "react";
import { useLocation } from "react-router-dom";
import DetailSlider from "../component/DetailSlider";
import { PiThumbsUpDuotone, PiStairsFill } from "react-icons/pi";
import { BsDownload } from "react-icons/bs";
import { PiTimerDuotone } from "react-icons/pi";

export default function Detail() {
  const {
    state: { toolkit },
  } = useLocation();
  console.log(toolkit);

  return (
    <div className="w-full pt-40 pb-28 bg-[#ffeaa6]">
      <div className="w-11/12 mx-auto py-10 flex justify-between">
        <div className="w-6/12">
          {toolkit && <DetailSlider t={toolkit.image} />}
        </div>
        <div className="w-5/12 text-[#282828]">
          <p className="text-[1rem] mb-4">{toolkit.type}</p>
          <p className="text-[2.1rem] font-semibold mb-7">{toolkit.title}</p>
          <p className="text-[1.125rem] leading-8 mb-[60px]">
            {toolkit.description}
          </p>

          <div className="mb-10">
            <div className="flex items-center">
              <div className="text-[1.4rem]">
                <PiThumbsUpDuotone />
              </div>
              <p className="font-semibold ml-3">
                다음과 같은 분들에게 유용해요
              </p>
            </div>

            <ul className="ml-10 mt-3">
              {toolkit.benefit.map((b) => {
                return <li className="list-disc mb-1">{b}</li>;
              })}
            </ul>
          </div>

          <div className="flex items-center">
            <div className="text-[1.4rem]">
              <PiTimerDuotone />
            </div>
            <p className="font-semibold ml-3">예상 소요시간</p>
            <p className="ml-3">{toolkit.option.time}</p>
          </div>

          <div>
            <PiStairsFill />
            <p>난이도</p>
            <p>{toolkit.option.level}</p>
          </div>

          <a href={`${process.env.PUBLIC_URL}${toolkit.file}`}>
            <button
              className="w-full p-6 box-border flex justify-center items-center bg-[#282828] text-[1.2rem] text-white"
              type="button"
            >
              <BsDownload />
              <p className="ml-6">툴키트 다운받기</p>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
