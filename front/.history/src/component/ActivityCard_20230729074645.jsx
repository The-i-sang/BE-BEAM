import React from "react";

export default function ActivityCard({ activity }) {
  return (
    <li className="w-full h-[720px] mt-10 relative">
      <img
        className="w-full h-full object-cover object-center absolute top-0 left-0 z-[0]"
        src={process.env.PUBLIC_URL + `${activity.thumbnail}`}
        alt="activity_img"
      />
      <div className="w-full h-full bg-[rgba(0,0,0,0.6)] absolute top-0 left-0 flex flex-col items-center justify-center z-[99]">
        <p className="z-[9999] whitespace-pre-wrap text-center text-[4rem] text-white font-semibold">
          {activity.title}
        </p>

        <div className="text-white text-[1.1rem] flex mt-12">
          <button
            className="w-[20rem] py-3 bg-black bg-opacity-0 border-[1px] border-solid border-white flex items-center justify-center hover:bg-opacity-100 hover:border-black transition-all duration-700"
            type="button"
          >
            자세히 보기
          </button>
          <button
            className="w-[20rem] py-3 ml-6 bg-black bg-opacity-100 border-[1px] border-solid border-black flex items-center justify-center hover:bg-opacity-0 hover:border-white transition-all duration-700"
            type="button"
          >
            <a href="https://www.instagram.com/bebeam_busan/" target="_blank">
              인스타 보러가기
            </a>
          </button>
        </div>
      </div>
    </li>
  );
}
