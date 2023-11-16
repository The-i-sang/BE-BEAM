import React from "react";
import Typewriter from "typewriter-effect";

import { GiTalk } from "react-icons/gi";

export default function Community() {
  return (
    <div className="w-full min-h-screen pt-16 dark:bg-black">
      <div className="w-11/12 mx-auto">
        <div className="w-full mb-6 flex flex-col justify-center items-center">
          <div className="w-full text-[#ff4848] sm:text-[1.5rem] text-[1.2rem] flex justify-center items-center">
            <GiTalk />
            <p className="ml-3 font-semibold">Community</p>
          </div>

          <div className="sm:mt-6 mt-3 sm:text-[2.8rem] text-[2.2rem] dark:text-white text-center font-extrabold">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("관심사가 비슷한 사람들이")
                  .pauseFor(200)
                  .typeString("<br/>모여 하나 되는 커뮤니티")
                  .start()
                  .pauseFor(200);
                // .callFunction(function (state) {
                //   state.elements.cursor.style.display = "none";
                // });
              }}
            />
          </div>

          <p className="sm:mt-7 mt-3 text-[#383535] dark:text-white sm:text-[1.4rem] text-[1.1rem] sm:font-normal text-center tracking-tighter">
            관심사가 비슷한 사람들이 모여 하나 되는 커뮤니티,
            <br />
            관심사에 맞게 커뮤니티를 Pick 하세요!
          </p>
        </div>
      </div>
    </div>
  );
}
