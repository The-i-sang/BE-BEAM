// slideShowNum(한 슬라이드에 보이는 div)보다 data 갯수가 적을 때도 왼쪽부터 정렬되도록 커스텀한 슬라이드

import { useEffect } from "react";
import MyPageCard from "../card/myPage/MyPageCard";
import { formatDate2 } from "../../common";

export function LeftAlignSlider({
  index,
  data,
  slideIndex,
  slideShowNum,
  isLikeBtn,
}) {
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
      idx={index}
      isHidden={isHidden}
      data={data}
      subTitle={
        data.type ?? `${data.nickName}   |   ${formatDate2(data.creatingAt)}`
      }
      title={data.title ?? data.meeting.title}
      des={data.text}
      bg={data.thumbnail ?? data.meeting.thumbnail}
      imgs={data?.image}
      styles={data?.image ? "pt-14" : "pt-32"}
      isLikeBtn={isLikeBtn}
    />
  );
}
