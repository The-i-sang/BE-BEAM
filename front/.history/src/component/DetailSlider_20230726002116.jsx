import React from "react";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function DetailSlider({ autoplay = true }) {
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

  const params = useParams().id;
  console.log(params);

  const {
    isLoading,
    error,
    data: slideImg,
  } = useQuery(["items"], async () => {
    return axios //
      .get("/data/Toolkit.json") //
      .then((res) => res.data.items.toolkits);
  });

  return (
    <>
      <Slider {...settings}>
        <ul>
          {slideImg &&
            slideImg
              .filter((img) => img.id === params)
              .map((img) => {
                returm(
                  <li>
                    <img
                      src={process.env.PUBLIC_URL + `${img.image}`}
                      alt="detail_img"
                    />
                  </li>
                );
              })}
        </ul>
      </Slider>
    </>
  );
}
