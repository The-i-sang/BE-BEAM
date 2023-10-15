import React from "react";
import Typewriter from "typewriter-effect";

import { GiTalk } from "react-icons/gi";

export default function Community() {
  return (
    <div className="w-full min-h- pt-16">
      <div className="w-11/12 mx-auto">
        <div className="w-full mb-6 flex flex-col justify-center items-center">
          <div className="w-full text-[#ff4848] text-[1.5rem] flex justify-center items-center">
            <GiTalk />
            <p className="ml-3 font-semibold">Community</p>
          </div>

          <div className="mt-6 text-[2.8rem] text-center font-extrabold leading-normal">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("관심사가 비슷한 사람들이 모여")
                  .pauseFor(200)
                  .typeString("<br/>하나 되는 커뮤니티")
                  .start()
                  .pauseFor(200);
                // .callFunction(function (state) {
                //   state.elements.cursor.style.display = "none";
                // });
              }}
            />
          </div>

          <p className="mt-7 text-[#383535] text-[1.4rem] text-center tracking-tighter">
            관심사가 비슷한 사람들이 모여 하나 되는 커뮤니티,
            <br />
            관심사에 맞게 커뮤니티를 Pick 하세요!
          </p>
        </div>
      </div>
    </div>
  );
}
