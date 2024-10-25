import { useEffect, useState } from "react";
import { LeftAlignSlider } from "../slider/LeftAlignSlider";
import { Tab } from "@headlessui/react";

import { GoChevronLeft, GoChevronRight } from "react-icons/go";

export default function TabSliderContent({
  datas,
  tabTitle,
  isLikeBtn,
  children,
}) {
  const [slideIndex, setSlideIndex] = useState(8);
  const [slideShowNum, setSlideShowNum] = useState(8);

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

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const gridNum =
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
      : "grid-cols-1";

  return (
    <Tab.Panel>
      <div
        className={`${
          datas.length > 0 ? "block" : "hidden"
        } w-full py-[2rem] px-[1.25rem] box-border flex items-center gap-x-2`}
      >
        <button
          onClick={prevSlide}
          disabled={slideIndex === slideShowNum}
          className={`${
            slideIndex === slideShowNum ? "text-[#a8a5a5]" : "text-[#474545]"
          } xl:w-[50px] md:w-[40px] sm:w-[30px] w-[40px] xl:h-[50px] md:h-[40px] sm:h-[30px] h-[40px] bg-white border-[1px] border-solid border-[#dfdfdf] rounded-2xl flex items-center justify-center text-[2rem]`}
        >
          <GoChevronLeft />
        </button>

        <div className={`${gridNum} w-full grid gap-x-3`}>
          {datas.map((data, index) => (
            <LeftAlignSlider
              key={index}
              index={index}
              data={data}
              slideIndex={slideIndex}
              slideShowNum={slideShowNum}
              isLikeBtn={isLikeBtn}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={!(slideIndex < datas.length)}
          className={`${
            slideIndex < datas.length ? "text-[#474545]" : "text-[#a8a5a5]"
          } xl:w-[50px] md:w-[40px] sm:w-[30px] w-[40px] xl:h-[50px] md:h-[40px] sm:h-[30px] h-[40px] bg-white border-[1px] border-solid border-[#dfdfdf] rounded-2xl flex items-center justify-center text-[2rem]`}
        >
          <GoChevronRight />
        </button>
      </div>

      <div
        className={`${
          datas.length === 0 ? "block" : "hidden"
        } w-full py-12 flex flex-col items-center`}
      >
        <h1 className="text-[1.06rem] text-[#3f3f3f] font-semibold">
          {tabTitle}이 없어요.
        </h1>

        {children}
      </div>
    </Tab.Panel>
  );
}
