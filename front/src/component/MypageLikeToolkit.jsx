import React, { useEffect, useState } from "react";

import { GoChevronLeft, GoChevronRight } from "react-icons/go";

export const Slide = ({ index, toolkit, slideIndex, slideShowNum }) => {
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
        src={process.env.PUBLIC_URL + toolkit.thumbnail.replace("./", "/")}
        alt="thumbnail"
      />
      <p className="mt-2 text-white text-[0.85rem] line-clamp-2">
        {toolkit.title}
      </p>
    </div>
  );
};

export default function MypageLikeToolkit() {
  const [slideIndex, setSlideIndex] = useState(8);
  const [slideShowNum, setSlideShowNum] = useState(8);

  // 좋아요 기능이 만들어질 때까지 임시로 사용될 좋아요 누른 툴킷 데이터
  const likeToolkits = [
    {
      thumbnail: "./image/toolkit_img/1-1.png",
      title: "너는 어떤 호스트가 되고 싶어?",
    },
    {
      thumbnail: "./image/toolkit_img/5-1.png",
      title: "안정적인 커뮤니티 운영을 위해서 : 모임진행편",
    },
    {
      thumbnail: "./image/toolkit_img/3-1.png",
      title: "어떤 공간에서 커뮤니티를 진행하고 싶어?: 실외편",
    },
    {
      thumbnail: "./image/toolkit_img/9-1.png",
      title: "모임 규칙을 정해보자: 호스트편",
    },
    {
      thumbnail: "./image/toolkit_img/8-1.png",
      title: "안정적인 커뮤니티 운영을 위해서 : 참여자 관리편",
    },
    {
      thumbnail: "./image/toolkit_img/10-1.png",
      title: "모임 규칙을 정해보자: 참여자편",
    },
    {
      thumbnail: "./image/toolkit_img/2-1.png",
      title: "어떤 공간에서 커뮤니티를 진행하고 싶어? : 실내편",
    },
    {
      thumbnail: "./image/toolkit_img/4-1.png",
      title: "안정적인 커뮤니티 운영을 위해서: 예산편",
    },
    {
      thumbnail: "./image/toolkit_img/6-1.png",
      title: "안정적인 커뮤니티 운영을 위해서 : 팀빌딩편",
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

  return (
    <div className="w-full mt-14">
      <p className="text-[1.125rem] font-semibold dark:text-white">
        내가 찜한 툴킷
      </p>

      <div className="w-full mt-5 py-[1.25rem] px-[1.25rem] box-border bg-white dark:bg-[rgba(255,255,255,0.2)] rounded-2xl border-[1px] border-solid border-[#ddd] dark:border-[#5b5b5b] flex items-center gap-x-2">
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
          {likeToolkits &&
            likeToolkits?.map((toolkit, index) => {
              return (
                <Slide
                  key={index}
                  index={index}
                  toolkit={toolkit}
                  slideIndex={slideIndex}
                  slideShowNum={slideShowNum}
                />
              );
            })}
        </div>

        <button
          onClick={nextSlide}
          disabled={slideIndex < likeToolkits?.length ? false : true}
          className={`${
            slideIndex < likeToolkits?.length
              ? "text-[#474545]"
              : "text-[#a8a5a5]"
          } xl:w-[50px] md:w-[40px] sm:w-[30px] w-[40px] xl:h-[50px] md:h-[40px] sm:h-[30px] h-[40px] bg-white border-[1px] border-solid border-[#dfdfdf] rounded-2xl flex items-center justify-center text-[2rem]`}
        >
          <GoChevronRight />
        </button>
      </div>
    </div>
  );
}
