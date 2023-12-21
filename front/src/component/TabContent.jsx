import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import Button from "./Button";

export const Slide = ({ index, data, slideIndex, slideShowNum }) => {
  useEffect(() => {
    // 슬라이드 요소들을 선택
    const slides = document.querySelectorAll(".animate-slide-in");

    // 각 슬라이드 요소에 대해
    slides.forEach((slide) => {
      // 애니메이션 클래스를 제거
      slide.classList.remove("animate-slide-in");

      // 강제로 리플로우를 발생시켜 애니메이션을 재생성
      void slide.offsetWidth;

      // 애니메이션 클래스를 다시 추가
      slide.classList.add("animate-slide-in");
    });
  }, [slideIndex]); // 슬라이드 인덱스가 변경되었을 때만 이 효과를 실행

  return (
    <div
      className={`${
        (slideIndex > slideShowNum && slideIndex - slideShowNum > index) ||
        (slideIndex > slideShowNum && index >= slideIndex) ||
        (slideIndex === slideShowNum && index > slideShowNum - 1)
          ? "hidden"
          : "block"
      } p-4 box-border bg-[#ffac07] transition-all duration-700 animate-slide-in rounded-lg aspect-w-1 aspect-h-1 aspect-square cursor-pointer flex flex-col items-center justify-center text-center
      }`}
    >
      <img
        className="w-[60%] aspect-w-1 aspect-h-1 aspect-square object-cover mx-auto rounded-full"
        src={process.env.PUBLIC_URL + data.thumbnail?.replace("./", "/")}
        alt="thumbnail"
      />
      <p className="mt-[10px] px-2 py-[1px] bg-white rounded-2xl text-[#ffac07] text-[0.75rem]">
        {data.type}
      </p>
      <p className="mt-1 text-white text-[0.85rem] line-clamp-1">
        {data.title}
      </p>
    </div>
  );
};

export default function TabContent({ title, tabCount }) {
  const navigate = useNavigate();

  const [slideIndex, setSlideIndex] = useState(8);
  const [slideShowNum, setSlideShowNum] = useState(8);

  // 좋아요 기능이 만들어질 때까지 임시로 사용될 좋아요 누른 툴킷 데이터
  const likeMeetings = [
    {
      type: "소모임",
      thumbnail: "./image/activity_img/dining_0.png",
      title: "소셜다이닝 : 이상식탁",
    },
    {
      type: "소모임",
      thumbnail: "./image/activity_img/hiking_0.png",
      title: "운동모임:정기산행 (상시모집)",
    },
    {
      type: "정기모임",
      thumbnail: "./image/activity_img/book_0.png",
      title: "독서모임: 북페어링 (상시모집)",
    },
  ];

  const datas =
    title === "내가 찜한 모임"
      ? likeMeetings?.filter((data) => {
          return tabCount === 0
            ? data.type === "소모임"
            : data.type === "정기모임";
        })
      : tabCount === 0
      ? [
          {
            type: "정기모임",
            thumbnail: "./image/activity_img/book_0.png",
            title: "독서모임: 북페어링 (상시모집)",
          },
          {
            type: "소모임",
            thumbnail: "./image/activity_img/jogging_0.png",
            title: "운동모임 : 선셋 러닝 (상시모집) (모집중)",
          },
        ]
      : tabCount === 1
      ? [
          {
            type: "정기모임",
            thumbnail: "./image/activity_img/picture_0.png",
            title: "사진출사모임 : 나를 기록하는 사진관 (정기모임) (모집마감)",
          },
        ]
      : [
          {
            type: "소모임",
            thumbnail: "./image/activity_img/dining_0.png",
            title: "소셜다이닝 : 이상식탁",
          },
        ];

  const nextSlide = () => {
    setSlideIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setSlideIndex((prev) => prev - 1);
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1920 && window.innerWidth > 1399) {
        setSlideIndex(8);
        setSlideShowNum(8);
      } else if (window.innerWidth <= 1399 && window.innerWidth > 1239) {
        setSlideIndex(7);
        setSlideShowNum(7);
      } else if (window.innerWidth <= 1239 && window.innerWidth > 1023) {
        setSlideIndex(6);
        setSlideShowNum(6);
      } else if (window.innerWidth <= 1023 && window.innerWidth > 849) {
        setSlideIndex(5);
        setSlideShowNum(5);
      } else if (window.innerWidth <= 850 && window.innerWidth > 639) {
        setSlideIndex(4);
        setSlideShowNum(4);
      } else if (window.innerWidth <= 639 && window.innerWidth > 551) {
        setSlideIndex(3);
        setSlideShowNum(3);
      } else if (window.innerWidth <= 551 && window.innerWidth > 413) {
        setSlideIndex(2);
        setSlideShowNum(2);
      } else {
        setSlideIndex(1);
        setSlideShowNum(1);
      }
    }

    handleResize(); // Initial setup

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(title, tabCount, datas);

  return (
    <>
      {datas?.length > 0 ? (
        <div className="w-full py-[2rem] px-[1.25rem] box-border flex items-center gap-x-2">
          <button
            onClick={prevSlide}
            disabled={slideIndex === slideShowNum ? true : false}
            className={`${
              slideIndex === slideShowNum ? "text-[#a8a5a5]" : "text-[#474545]"
            } xl:w-[50px] md:w-[40px] sm:w-[30px] w-[40px] xl:h-[50px] md:h-[40px] sm:h-[30px] h-[40px] bg-white border-[1px] border-solid border-[#dfdfdf] rounded-2xl flex items-center justify-center text-[2rem]`}
          >
            <GoChevronLeft />
          </button>

          <div
            className={`${
              slideShowNum === 8
                ? "grid-cols-8"
                : slideShowNum === 7
                ? "grid-cols-7"
                : slideShowNum === 6
                ? "grid-cols-6"
                : slideShowNum === 5
                ? "grid-cols-5"
                : slideShowNum === 4
                ? "grid-cols-4"
                : slideShowNum === 3
                ? "grid-cols-3"
                : slideShowNum === 2
                ? "grid-cols-2"
                : "grid-cols-1"
            } w-full grid gap-x-3`}
          >
            {datas?.map((data, index) => {
              return (
                <Slide
                  key={index}
                  index={index}
                  data={data}
                  slideIndex={slideIndex}
                  slideShowNum={slideShowNum}
                />
              );
            })}
          </div>

          <button
            onClick={nextSlide}
            disabled={slideIndex < datas?.length ? false : true}
            className={`${
              slideIndex < datas?.length ? "text-[#474545]" : "text-[#a8a5a5]"
            } xl:w-[50px] md:w-[40px] sm:w-[30px] w-[40px] xl:h-[50px] md:h-[40px] sm:h-[30px] h-[40px] bg-white border-[1px] border-solid border-[#dfdfdf] rounded-2xl flex items-center justify-center text-[2rem]`}
          >
            <GoChevronRight />
          </button>
        </div>
      ) : (
        <div className="w-full py-12 flex flex-col items-center">
          <h1 className="text-[1.06rem] text-[#3f3f3f] font-semibold">
            찜한 모임이 없어요.
          </h1>

          <div className="w-full mt-6 flex items-center justify-center gap-x-3">
            <Button
              onClick={(e) => {
                e.preventDefault();

                navigate("/community");
              }}
              buttonText="정기모임 구경하기"
              disabled={false}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();

                navigate("/activity");
              }}
              buttonText="소모임 구경하기"
              disabled={false}
            />
          </div>
        </div>
      )}
    </>
  );
}
