import React, { useState } from "react";
import Slider from "react-slick";
import NextArrow from "../NextArrow";
import PrevArrow from "../PrevArrow";

import { BsArrowRightSquare } from "react-icons/bs";
import { BsArrowLeftSquare } from "react-icons/bs";

export default function SwipeToSlide({ children, slidesToShow }) {
  const settings = {
    className: "center",
    infinite: false,
    centerPadding: "50px",
    slidesToShow,
    nextArrow: <NextArrow toolkitType={false} icon={<BsArrowRightSquare />} />,
    prevArrow: <PrevArrow toolkitType={false} icon={<BsArrowLeftSquare />} />,
  };

  return <Slider {...settings}>{children}</Slider>;
}
