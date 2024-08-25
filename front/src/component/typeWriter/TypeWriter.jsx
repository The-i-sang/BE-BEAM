import Typewriter from "typewriter-effect";

export default function TypeWriter({
  type,
  icon,
  titleFirst,
  titleBack,
  subTitleFirst,
  subTitleBack,
  textColor,
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full mb-6 lg:items-start">
      <div
        className={`w-full sm:text-[1.5rem] text-[1.2rem] flex lg:justify-start justify-center items-center ${textColor}`}
      >
        {icon}
        <p className="ml-3 font-semibold">{type}</p>
      </div>

      <div className="sm:mt-6 mt-3 sm:text-[2.8rem] text-[2.2rem] text-text-light-default dark:text-text-dark-default font-extrabold lg:text-left text-center">
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString(titleFirst)
              .pauseFor(200)
              .typeString(titleBack)
              .start()
              .pauseFor(200);
          }}
        />
      </div>

      <p className="sm:mt-7 mt-3 text-text-light-90 dark:text-text-dark-80 sm:text-[1.4rem] text-[1.1rem] lg:text-left text-center sm:font-normal font-light tracking-tighter">
        {subTitleFirst}
        <br />
        {subTitleBack}
      </p>
    </div>
  );
}
