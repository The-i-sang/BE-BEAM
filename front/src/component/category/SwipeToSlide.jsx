import Slider from "react-slick";
import NextArrow from "../slider/NextArrow";
import PrevArrow from "../slider/PrevArrow";

import { BsArrowRightSquare } from "react-icons/bs";
import { BsArrowLeftSquare } from "react-icons/bs";

export default function SwipeToSlide({ children, slidesToShow }) {
  const settings = {
    infinite: true,
    slidesToShow,
    nextArrow: <NextArrow toolkitType={false} icon={<BsArrowRightSquare />} />,
    prevArrow: <PrevArrow toolkitType={false} icon={<BsArrowLeftSquare />} />,
  };

  return <Slider {...settings}>{children}</Slider>;
}
