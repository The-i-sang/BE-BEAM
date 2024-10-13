import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";

export default function BasicSlider({
  isAutoplay = true,
  isInfinite = true,
  slidesToShow = 1,
  isDots = true,
  isArrows = true,
  children,
}) {
  const settings = {
    dots: isDots,
    arrows: isArrows,
    infinite: isInfinite,
    speed: 900,
    slidesToShow: slidesToShow,
    autoplay: isAutoplay,
    nextArrow: <NextArrow toolkitType={true} />,
    prevArrow: <PrevArrow toolkitType={true} />,
  };

  return <Slider {...settings}>{children}</Slider>;
}
