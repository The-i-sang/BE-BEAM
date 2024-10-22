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
  prevArrowStyles,
  nextArrowStyles,
  arrowFontStyles,
  children,
}) {
  const settings = {
    dots: isDots,
    arrows: isArrows,
    infinite: isInfinite,
    speed: 900,
    slidesToShow: slidesToShow,
    autoplay: isAutoplay,
    prevArrow: (
      <PrevArrow styles={prevArrowStyles} fontStyles={arrowFontStyles} />
    ),
    nextArrow: (
      <NextArrow styles={nextArrowStyles} fontStyles={arrowFontStyles} />
    ),
  };

  return (
    <div className="relative">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}
