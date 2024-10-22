import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { UserNecessaryDataState } from "../../../recoil/userState";
import { MeetingReviewsState } from "../../../recoil/meetingState";
import BasicSlider from "../../slider/BasicSlider";

import { GoChevronUp, GoChevronDown } from "react-icons/go";
import { PiHeartStraightLight, PiHeartStraightFill } from "react-icons/pi";

export default function MyPageCard({
  idx,
  isHidden,
  data,
  subTitle,
  title,
  des,
  bg,
  imgs,
  isLikeBtn = false,
  styles,
}) {
  const [dropDown, setDropDown] = useState(false);
  const userNecessaryData = useRecoilValue(UserNecessaryDataState);
  const setReviewDatas = useSetRecoilState(MeetingReviewsState);

  const isFillLikeBtn = data?.likes?.find(
    (like) => like === userNecessaryData.userEmail
  );

  return (
    <div
      className={`${
        isHidden ? "hidden" : "block"
      } ${styles} px-[6px] pb-[6px] box-border rounded-lg shadow-[0_10px_8px_2px_#cdcdcd] dark:shadow-[0_10px_8px_2px_#252525] text-white transition-all duration-700 animate-slide-in cursor-pointer relative overflow-hidden`}
      style={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full h-full bg-[rgba(0,0,0,0.4)] dark:bg-[rgba(0,0,0,0.3)] absolute top-0 left-0 z-[-1]" />

      <p className="absolute top-3 right-2 py-[2px] border-t-[1px] border-solid border-white">
        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
      </p>

      <button
        onClick={() => {
          // 내가 좋아요 눌렀던 모임 취소 기능 구현 X
          // 내가 좋아요 눌렀던 리뷰 취소 기능
          setReviewDatas((prev) =>
            prev.map((d) => {
              if (d.reviewId === data.reviewId) {
                return {
                  ...d,
                  likes: d.likes.filter(
                    (like) => like !== userNecessaryData.userEmail
                  ),
                };
              } else if (d.reviewId !== data.reviewId) {
                return d;
              }
            })
          );
        }}
        className={`${
          isLikeBtn ? "" : "hidden"
        } absolute w-8 h-8 bg-[rgba(0,0,0,0.5)] rounded-full top-2 left-2 flex items-center justify-center`}
      >
        {isFillLikeBtn ? <PiHeartStraightFill /> : <PiHeartStraightLight />}
      </button>

      <BasicSlider isDots={false} isArrows={false}>
        {imgs?.map((img) => (
          <div>
            <img
              className="object-cover w-full rounded-lg aspect-square"
              src={img}
              alt="img"
            />
          </div>
        ))}
      </BasicSlider>

      <div className="mt-2 text-[rgba(255,255,255,0.7)] text-[0.875rem]">
        <p>{subTitle}</p>
        <h1 className="mb-1 text-white text-[1rem]">{title}</h1>

        <div className={`${des ? "block" : "hidden"}`}>
          <p className={`${dropDown ? "" : "line-clamp-3"} mt-4 mb-8`}>{des}</p>
          <button
            onClick={() => setDropDown((prev) => !prev)}
            className="text-[1.2rem] cursor-pointer absolute bottom-2 right-2"
          >
            {dropDown ? <GoChevronUp /> : <GoChevronDown />}
          </button>
        </div>
      </div>
    </div>
  );
}
