import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ActivityDetail() {
  const navigate = useNavigate();

  const {
    state: { activity },
  } = useLocation();
  console.log(activity);

  return (
    <div className="w-full py-10">
      <div className="w-full h-[720px] relative">
        <div>
          <img
            className="w-full h-full object-cover object-center absolute top-0 left-0 z-[0]"
            src={process.env.PUBLIC_URL + `/../${activity.thumbnail}`}
            alt="img"
          />
          <div className="w-full h-full bg-[rgba(0,0,0,0.4)] absolute top-0 left-0 flex flex-col items-center justify-center z-[99]">
            <p>Activity</p>
            <p className="z-[9999] whitespace-pre-wrap text-center text-[4rem] text-white font-semibold">
              {activity.title}
            </p>
          </div>
        </div>
      </div>

      <div className="w-1/2 mx-auto pt-[160px]">
        <h1 className="mb-[40px] text-[2.25rem] font-semibold">
          {activity.subTitle}
        </h1>

        <p className="text-[1.125rem] text-[#454545] whitespace-pre-wrap">
          {activity.description}
        </p>

        <div className="w-full my-[120px]">
          {activity &&
            activity.image?.map((img) => {
              return (
                <img
                  className="w-full object-cover mb-8"
                  src={process.env.PUBLIC_URL + `/../${img}`}
                  alt="activity_datail_img"
                />
              );
            })}
        </div>

        <h1 className="mb-[40px] text-[2.25rem] font-semibold">신청 링크</h1>
        <p className="text-[1.125rem] text-[#454545] whitespace-pre-wrap">
          {activity.request}
        </p>

        <div className="w-full mt-[120px] flex justify-between">
          <button
            onClick={() => {
              navigate("/activity");
            }}
            className="w-[48%] py-3 bg-black bg-opacity-0 border-[1px] border-solid border-black flex items-center justify-center hover:bg-opacity-100 hover:border-black hover:text-white transition-all duration-700"
            type="button"
          >
            목록보기
          </button>
          <button
            className="w-[48%] py-3 bg-black bg-opacity-100 text-white border-[1px] border-solid border-black flex items-center justify-center hover:bg-opacity-0 hover:border-black hover:text-black transition-all duration-700"
            type="button"
          >
            <a href="https://www.instagram.com/bebeam_busan/" target="_blank">
              신청하기
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}
