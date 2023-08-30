import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ToolkitCard from "./ToolkitCard";

export default function BestToolkitSlider({ toolkits }) {
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

  const selectedItems = getRandomItemsFromArray(toolkits, 8);

  console.log(selectedItems);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
  };
  return (
    <div>
      <Slider {...settings}>
        {selectedItems &&
          selectedItems.map((toolkit) => {
            return <ToolkitCard toolkit={toolkit} key={toolkit.id} />;
          })}
      </Slider>
    </div>
  );
}
