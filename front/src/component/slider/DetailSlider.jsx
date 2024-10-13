import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";

export default function DetailSlider({ autoplay = true, t, slidesToShow = 1 }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: Boolean(autoplay),
    autoplaySpeed: typeof autoplay === "boolean" ? 3000 : autoplay,
    nextArrow: <NextArrow toolkitType={true} />,
    prevArrow: <PrevArrow toolkitType={true} />,
  };

  return (
    <div className="w-full h-[640px] mx-auto">
      <Slider {...settings}>
        {t.map((a, index) => (
          <div key={index} className="w-full h-[640px]">
            <img
              className="object-contain w-4/6 h-full mx-auto lg:w-4/6 md:w-5/6 sm:w-4/6"
              src={process.env.PUBLIC_URL + a.replace("./", "/")}
              alt="detail_img"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
