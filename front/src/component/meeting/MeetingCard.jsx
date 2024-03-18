import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { FaLocationDot } from "react-icons/fa6";
import { GoHeart, GoHeartFill } from "react-icons/go";

export default function MeetingCard({ activity, bgColor, shadow }) {
  const navigate = useNavigate();

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <li
      className={`${bgColor} cursor-pointer w-full h-full sm:mb-0 mb-5 p-6 box-border text-[#232426] rounded-[2rem] flex md:flex-row sm:flex-col flex-col relative overflow-hidden shadow-[0_5px_5px_2px_#ebebeb]`}
    >
      <img
        className={`${shadow} lg:w-[164px] md:w-[140px] sm:w-full w-full aspect-square object-cover object-center rounded-full`}
        src={process.env.PUBLIC_URL + activity.thumbnail.replace("./", "/")}
        alt="activity_img"
      />

      <div className="lg:w-1calc md:w-2calc md:px-4 sm:px-0 px-0 md:py-0 sm:py-4 py-4 box-border">
        <div className="w-full flex items-center justify-between">
          <div className="lg:text-[0.9rem] sm:text-[0.8rem] text-[0.8rem] flex items-center gap-x-2">
            <p className="inline-block sm:py-2 py-1 px-4 bg-gradient-to-r from-sky-400 to-emerald-400 text-white rounded-full whitespace-nowrap overflow-hidden text-ellipsis">
              {activity.type}
            </p>

            {activity.recommend && (
              <p className="inline-block sm:py-2 py-1 px-4 bg-gradient-to-r from-indigo-400 to-pink-400 text-white rounded-full whitespace-nowrap overflow-hidden text-ellipsis">
                추천
              </p>
            )}
          </div>

          <button className="text-[1.5rem]" onClick={handleClick}>
            {isClicked ? <GoHeartFill /> : <GoHeart />}
          </button>
        </div>

        <div
          onClick={() => {
            navigate(`/meeting/detail/${activity.id}`, {
              state: { activity: activity },
            });
          }}
          className="mt-4 text-[#232426]"
        >
          <h1 className="mb-2 lg:text-[1.3rem] sm:text-[1.2rem] text-[1.2rem] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            {activity.title}
          </h1>

          <p className="mb-2 lg:text-[0.9rem] sm:text-[0.8rem] text-[0.8rem] text-[#575757] dark:text-[rgba(255,255,255,0.7)] whitespace-nowrap overflow-hidden text-ellipsis">
            {activity.state} · {activity.schedule}
          </p>
          <div className="flex items-center lg:text-[0.9rem] sm:text-[0.8rem] text-[0.8rem] text-[rgb(255,255,255)]">
            <FaLocationDot className="text-white lg:text-[1.3rem] sm:text-[1.2rem] text-[1.2rem]" />
            <p>{activity.place}</p>
          </div>
        </div>
      </div>

      <img
        className="xl:w-[140px] lg:w-[120px] md:w-[100px] sm:w-[130px] w-[30%] absolute md:bottom-[-20%] md:right-[-5%] sm:bottom-[-12%] sm:right-[-12%] bottom-[-5%] right-[-5%]"
        src={process.env.PUBLIC_URL + "/image/deco.png"}
        alt="deco"
      />
    </li>
  );
}
