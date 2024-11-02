// slideShowNum(한 슬라이드에 보이는 div)보다 data 갯수가 적을 때도 왼쪽부터 정렬되도록 커스텀한 슬라이드

import { useEffect } from "react";
import MyPageCard from "../card/myPage/MyPageCard";
import { formatDateAndTime } from "../../common";
import { useNavigate } from "react-router-dom";

export function LeftAlignSlider({
  index,
  data,
  slideIndex,
  slideShowNum,
  isLikeMeeting,
  isLikeReview,
  isCancelApplication,
  isDeleteReview,
  updateMeetingData,
  setModalOpen,
  setSelectedId,
}) {
  const navigate = useNavigate();

  const isHidden =
    (slideIndex > slideShowNum && slideIndex - slideShowNum > index) ||
    (slideIndex > slideShowNum && index >= slideIndex) ||
    (slideIndex === slideShowNum && index > slideShowNum - 1);

  useEffect(() => {
    const slides = document.querySelectorAll(".animate-slide-in");

    slides.forEach((slide) => {
      slide.classList.remove("animate-slide-in");

      void slide.offsetWidth;
      slide.classList.add("animate-slide-in");
    });
  }, [slideIndex]);

  return (
    <MyPageCard
      id={data?.reviewId ?? data?.id}
      idx={index}
      isHidden={isHidden}
      subTitle={
        data?.recruitmentType ?? `${formatDateAndTime(data?.createdAt)}`
      }
      title={data?.title ?? data?.meeting?.name}
      des={data?.text}
      bg={data?.squareImage ?? data?.meeting?.thumbImage}
      img={data?.images}
      styles={data?.images ? "pt-14" : "pt-32"}
      isLikeMeeting={isLikeMeeting}
      isLikeReview={isLikeReview}
      isCancelApplication={isCancelApplication}
      isDeleteReview={isDeleteReview}
      updateMeetingData={updateMeetingData}
      setModalOpen={setModalOpen}
      setSelectedId={setSelectedId}
      onClick={() => {
        if (data?.id) {
          navigate(`/meeting/detail/${data?.id}`);
        }
      }}
    />
  );
}
