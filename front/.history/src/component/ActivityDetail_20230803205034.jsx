import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ActivityDetail({ setCategoryOn }) {
  const {
    state: { activity },
  } = useLocation();
  console.log(activity);

  useEffect(() => {
    setCategoryOn(false);
  }, []);
  return (
    <div className="w-full py-[120px]">
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
        <h1 className="mb-[32px] text-[2.25rem] font-semibold">
          {activity.subTitle}
        </h1>

        <p className="text-[1.125rem] text-[#454545] whitespace-pre-wrap">
          {activity.description}
        </p>
      </div>
    </div>
  );
}
