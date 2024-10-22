export default function MainIntroContent({
  img,
  subTitle,
  titleFront,
  titleMiddle,
  titleBack,
  content,
  isEven = false,
  divStyles,
}) {
  return (
    <div
      className={`${
        isEven ? "sm:flex-col-reverse flex-col-reverse" : "sm:flex-col flex-col"
      } ${divStyles} w-full flex lg:flex-row lg:items-center group text-[#282828] dark:text-white text-center`}
    >
      <div
        className={`${
          isEven ? "order-1" : "order-2"
        } lg:w-full sm:w-[94%] w-[94%] lg:mx-0 sm:mx-auto mx-auto lg:p-14 box-border`}
      >
        <p className="lg:mt-[48px] sm:mt-[30px] mt-[20px] text-[1.125rem] font-medium text-left">
          {subTitle}
        </p>
        <h1 className="lg:mt-5 sm:mt-2 mt-2 lg:mb-16 sm:mb-8 mb-4 sm:text-[2.625rem] text-[1.9rem] font-semibold text-left">
          {titleFront}
          <span className="text-white dark:text-black text-stroke">
            {titleMiddle}
          </span>
          {titleBack}
        </h1>

        <div className="sm:text-[1rem] text-[0.8rem] font-light text-left">
          {content}
        </div>
      </div>

      <img
        className={`${
          isEven ? "order-2" : "order-1"
        } xl:w-[700px] lg:w-[600px] sm:w-[94%] w-[94%] object-cover aspect-w-1 aspect-h-1 aspect-square`}
        src={img}
        alt="intro_img"
      />
    </div>
  );
}
