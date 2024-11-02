import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { AccessTokenState } from "../../../recoil/userState";
import {
  fetchCancelMeetingApplyReason,
  fetchDeleteMeetingReview,
  fetchMeetingLikeOrCancel,
  fetchMeetingReviewLikeOrCancel,
} from "../../../api/meetingAndToolkit";

import BasicSlider from "../../slider/BasicSlider";
import Button from "../../button/Button";
import { borderStyle, btnBasicStyle } from "../../../common2";
import { Toast } from "../../toast/Toast";

import { GoChevronUp, GoChevronDown, GoX } from "react-icons/go";
import { PiHeartStraightFill } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";

export default function MyPageCard({
  id,
  idx,
  isHidden,
  subTitle,
  title,
  des,
  bg,
  img,
  styles,
  isLikeMeeting,
  isLikeReview,
  isCancelApplication,
  isDeleteReview,
  updateMeetingData,
  setModalOpen,
  setSelectedId,
  onClick,
}) {
  const accessToken = useRecoilValue(AccessTokenState);
  const [dropDown, setDropDown] = useState(false);

  const deleteMeetingReviewMutation = useMutation({
    mutationFn: () => fetchDeleteMeetingReview(accessToken, id),
    onSuccess: () => {
      updateMeetingData();
      Toast("😳리뷰를 삭제하였습니다.!");
    },
  });

  const MeetingLikeCancelMutation = useMutation({
    mutationFn: () => fetchMeetingLikeOrCancel(accessToken, id, "delete"),
    onSuccess: () => {
      updateMeetingData();
      Toast("😂좋아요를 취소하였습니다.!");
    },
  });

  const MeetingReviewLikeCancelMutation = useMutation({
    mutationFn: () => fetchMeetingReviewLikeOrCancel(accessToken, id, "delete"),
    onSuccess: () => {
      updateMeetingData();
      Toast("😂좋아요를 취소하였습니다.!");
    },
  });

  const MeetingApplyReasonCancelMutation = useMutation({
    mutationFn: () => fetchCancelMeetingApplyReason(accessToken, id),
    onSuccess: () => {
      updateMeetingData();
      Toast("😂모임 신청을 취소하였습니다.!");
    },
  });

  return (
    <div
      className={`${isHidden ? "hidden" : "block"} ${styles} ${
        borderStyle.basic
      } px-[6px] pb-[6px] box-border border-[1px] rounded-lg shadow-[0_10px_8px_2px_#cdcdcd] dark:shadow-[0_10px_8px_2px_#252525] text-white transition-all duration-700 animate-slide-in cursor-pointer relative overflow-hidden`}
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

      <Button
        icon={isLikeMeeting || isLikeReview ? <PiHeartStraightFill /> : <GoX />}
        onClick={() => {
          if (isLikeMeeting) {
            try {
              MeetingLikeCancelMutation.mutate();
            } catch (error) {
              Toast("좋아요 취소를 실패하였습니다...😢");
            }
          } else if (isLikeReview) {
            try {
              MeetingReviewLikeCancelMutation.mutate();
            } catch (error) {
              Toast("좋아요 취소를 실패하였습니다...😢");
            }
          } else if (isCancelApplication) {
            if (window.confirm("정말 모임 신청을 취소하시겠습니까?")) {
              try {
                MeetingApplyReasonCancelMutation.mutate();
              } catch (error) {
                Toast("모임 신청 취소를 실패하였습니다...😢");
              }
            }
          } else {
            if (window.confirm("정말 리뷰를 삭제하시겠습니까?")) {
              try {
                deleteMeetingReviewMutation.mutate();
              } catch (error) {
                Toast("리뷰 삭제를 실패하였습니다...😢");
              }
            }
          }
        }}
        basicStyle={btnBasicStyle.circle}
        styles={`${
          isLikeMeeting || isLikeReview || isCancelApplication || isDeleteReview
            ? ""
            : "hidden"
        } w-8 h-8 bg-[rgba(0,0,0,0.5)] absolute top-2 left-2`}
      />
      <Button
        icon={<CiEdit />}
        onClick={() => {
          setModalOpen(true);
          setSelectedId(id);
        }}
        basicStyle={btnBasicStyle.circle}
        styles={`${
          isDeleteReview ? "" : "hidden"
        } w-8 h-8 bg-[rgba(0,0,0,0.5)] absolute top-2 left-11`}
      />

      <BasicSlider isDots={false} isArrows={false}>
        {img?.map((i, idx) => (
          <img
            key={idx}
            className="object-cover w-full rounded-lg aspect-square"
            src={i}
            alt="meeting_img"
          />
        ))}
      </BasicSlider>

      <div className="mt-2 text-[rgba(255,255,255,0.7)] text-[0.875rem]">
        <p>{subTitle}</p>
        <h1 onClick={onClick} className="mb-1 text-white text-[1rem]">
          {title}
        </h1>

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
