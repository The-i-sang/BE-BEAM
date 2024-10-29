import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { formatTimeAgo } from "../../../common";
import {
  fetchDeleteMeetingReview,
  fetchMeetingReviewLikeOrCancel,
} from "../../../api/meetingAndToolkit";

import Button from "../../button/Button";
import { btnBasicStyle, btnStyle } from "../../../common2";
import RatingStar from "../../rating/RatingStar";
import { Toast } from "../../toast/Toast";

import { CiHeart } from "react-icons/ci";

export default function CommunityReviewCard({
  data,
  accessToken,
  updateMeetingData,
}) {
  const [edit, setEdit] = useState(false);

  const deleteMeetingReviewMutation = useMutation({
    mutationFn: () => fetchDeleteMeetingReview(accessToken, data.reviewId),
    onSuccess: () => {
      updateMeetingData();
      Toast("😳리뷰를 삭제하였습니다.!");
    },
  });

  const MeetingReviewLikeMutation = useMutation({
    mutationFn: () =>
      fetchMeetingReviewLikeOrCancel(accessToken, data.reviewId, "post"),
    onSuccess: () => {
      updateMeetingData();
      Toast("😊좋아요를 눌렀습니다.!");
    },
  });

  const MeetingReviewLikeCancelMutation = useMutation({
    mutationFn: () =>
      fetchMeetingReviewLikeOrCancel(accessToken, data.reviewId, "delete"),
    onSuccess: () => {
      updateMeetingData();
      Toast("😂좋아요를 취소하였습니다.!");
    },
  });

  return (
    <li
      key={data.reviewId}
      className="w-full py-4 border-b-[1px] border-solid border-[#e1e5e9] text-[#a8aeb7]"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center w-full gap-x-2">
          <img
            className="object-cover w-10 h-10 rounded-full"
            src={data.profileImg}
            alt="editor_profileImg"
          />
          <p>
            <span className="mr-1 font-bold text-text-light-default dark:text-text-dark-default">
              {data.nickname}
            </span>
            님
          </p>
          <p
            className={`${
              formatTimeAgo(data.createdAt) === "방금 전" ? "block" : "hidden"
            } w-5 h-5 bg-[#d15d4d] text-white rounded-full flex justify-center items-center text-[0.75rem]`}
          >
            N
          </p>
          |<p>{formatTimeAgo(data.createdAt)}</p>
        </div>
        <RatingStar rating={data.rating} />
      </div>

      <p className="mt-4 text-[1.1rem] text-text-light-90 dark:text-text-dark-80">
        {data.text}
      </p>

      <div className="flex flex-wrap items-center w-full mt-4 sm:justify-normal 2sm:justify-between gap-x-4">
        {data.images.map((img, idx) => (
          <img
            key={idx}
            className="object-cover mb-4 rounded-lg sm:w-52 2sm:w-[48%] 3sm:w-full sm:h-52 aspect-square"
            src={img}
            alt="reviewImg"
          />
        ))}
      </div>
      <p className="mt-2 text-[0.95rem]">{data.meeting.name}</p>

      <div className="flex w-full mt-5">
        <div
          className={`${data.myReview ? "" : "hidden"} flex mr-auto gap-x-2`}
        >
          <Button
            buttonText="수정하기"
            onClick={() => setEdit(true)}
            basicStyle={btnBasicStyle.basic}
            styles={`${btnStyle.blackBg} px-4 py-3`}
          />

          <Button
            buttonText="삭제하기"
            onClick={() => {
              if (window.confirm("정말 리뷰를 삭제하시겠습니까?")) {
                try {
                  deleteMeetingReviewMutation.mutate();
                } catch (error) {
                  Toast("리뷰 삭제를 실패하였습니다...😢");
                }
              }
            }}
            basicStyle={btnBasicStyle.basic}
            styles={`${btnStyle.blackBg} px-4 py-3`}
          />
        </div>

        <div className="flex items-center justify-end ml-auto gap-x-4 sm:mt-0">
          <p>
            {data.likesCount === 0
              ? "첫 번째 좋아요 어때요!?"
              : `${data.likesCount}명이 좋아합니다!`}
          </p>

          <Button
            icon={<CiHeart />}
            onClick={() => {
              if (data.liked) {
                MeetingReviewLikeCancelMutation.mutate();
              } else {
                MeetingReviewLikeMutation.mutate();
              }
            }}
            basicStyle={btnBasicStyle.basic}
            styles={`${
              data.liked
                ? "bg-[#dadada] dark:text-text-dark-70"
                : "bg-transparent dark:text-text-dark-default"
            } gap-x-2 border-[1px] border-solid border-[#dadada] rounded-full px-4 py-2 font-bold text-text-light-60 transition-all duration-700`}
          >
            좋아요
          </Button>
        </div>
      </div>
    </li>
  );
}
