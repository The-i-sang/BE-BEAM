import React from "react";
import { useLocation } from "react-router-dom";
import DetailSlider from "../component/DetailSlider";
import { PiThumbsUpLight, PiTimerLight, PiStairsFill } from "react-icons/pi";
import { BsDownload } from "react-icons/bs";

export default function Detail() {
  const {
    state: { toolkit },
  } = useLocation();
  console.log(toolkit);

  return (
    <div className="w-full py-40 bg-[#ffeaa6]">
      <div className="w-11/12 mx-auto py-10 flex justify-between">
        <div className="w-5/12">
          {toolkit && <DetailSlider t={toolkit.image} />}
        </div>
        <div className="w-5/12">
          <p>{toolkit.type}</p>
          <p>{toolkit.title}</p>
          <p>{toolkit.description}</p>

          <div>
            <div>
              <PiThumbsUpLight />
              <p>다음과 같은 분들에게 유용해요</p>
            </div>

            <ul>
              {toolkit.benefit.map((b) => {
                return <li>{b}</li>;
              })}
            </ul>
          </div>

          <div>
            <PiTimerLight />
            <p>예상 소요시간</p>
            <p>{toolkit.option.time}</p>
          </div>

          <div>
            <PiStairsFill />
            <p>난이도</p>
            <p>{toolkit.option.level}</p>
          </div>

          <button
            className="w-full p-10 box-border flex justify-center items-center bg-[#282828] text-white"
            type="button"
            onClick={toolkit.file}
          >
            <BsDownload />
            <p className="ml-8">툴키트 다운받기</p>
          </button>
        </div>
      </div>
    </div>
  );
}
