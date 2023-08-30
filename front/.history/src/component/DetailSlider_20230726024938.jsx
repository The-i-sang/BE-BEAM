import React from "react";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function DetailSlider({ autoplay = true, t }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: Boolean(autoplay),
    autoplaySpeed: typeof autoplay === "boolean" ? 3000 : autoplay,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="w-full h-[700px] mx-auto">
      <Slider {...settings}>
        {t.map((a, index) => (
          <div key={index} className="w-full h-[700px]">
            <img
              className="w-4/6 h-full object-contain mx-auto"
              src={process.env.PUBLIC_URL + `/../${a}`}
              alt="detail_img"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
