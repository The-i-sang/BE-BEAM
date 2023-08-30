import React from "react";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MainSlider({ autoplay = true }) {
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
    <div className="w-full h-[640px] mx-auto fixed top-[120px] z-[-99]">
      <Slider {...settings}>
        <div className="w-full h-full">
          <img
            className="w-full object-contain"
            src={process.env.PUBLIC_URL + "./image/main_img/1.png"}
          />
        </div>

        <div>
          <img src={process.env.PUBLIC_URL + "./image/main_img/2.png"} />
        </div>

        <div>
          <img src={process.env.PUBLIC_URL + "./image/main_img/5.png"} />
        </div>
      </Slider>
    </div>
  );
}
