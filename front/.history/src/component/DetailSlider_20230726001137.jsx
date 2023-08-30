import React from "react";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function DetailSlider({ autoplay = true, toolkit }) {
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
    <>
      <Slider {...settings}>
        <ul>
          {toolkit.map((t) => {
            return (
              <li key={t.id}>
                <img
                  src={process.env.PUBLIC_URL + `${t.image}`}
                  alt="toolkit_img"
                />
              </li>
            );
          })}
        </ul>
      </Slider>
    </>
  );
}
