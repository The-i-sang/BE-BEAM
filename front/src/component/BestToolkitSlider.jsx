import React, { useEffect, useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideToolkitCard from "./SlideToolkitCard";

export default function BestToolkitSlider({ toolkits }) {
  const [selectedItems, setSelectedItems] = useState();

  // 첫 랜더링(새로고침)시에만 랜덤으로 툴킷 슬라이드가 생성되도록.
  useEffect(() => {
    function getRandomItemsFromArray(toolkits, count) {
      if (count >= toolkits?.length) {
        return toolkits; // 배열의 길이보다 많은 요소를 요청하는 경우 배열 전체를 반환
      }

      const result = [];
      const usedIndexes = new Set();

      while (result?.length < count) {
        const randomIndex = Math.floor(Math.random() * toolkits?.length);

        if (!usedIndexes.has(randomIndex)) {
          usedIndexes.add(randomIndex);
          result.push(toolkits[randomIndex]);
        }
      }

      return result;
    }
    setSelectedItems(getRandomItemsFromArray(toolkits, 8));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    dotsClass: "dots_custom",
    appendDots: (dots) => (
      <div
        style={{
          width: "100%",
          position: "absolute",
          bottom: "-12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
  };
  return (
    <div className="2xl:w-[96%] lg:w-[93%] md:w-[90%] mx-auto mb-8 relative">
      <Slider {...settings} className="w-full">
        {selectedItems &&
          selectedItems?.map((toolkit) => {
            return (
              <div className="w-full flex justify-center items-center">
                <SlideToolkitCard toolkit={toolkit} key={toolkit.id} />
              </div>
            );
          })}
      </Slider>
    </div>
  );
}
