import { useEffect, useState } from "react";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/5.png";
import img6 from "../assets/6.png";

export default function Main() {
  const [scrollHeight, setScrollHeight] = useState(0);

  function onScroll() {
    setScrollHeight(window.scrollY);
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  console.log(scrollHeight);

  return (
    <div className="w-full mx-auto pt-4 sm:pb-32 pb-20 dark:bg-black dark:text-white">
      <div className="w-full relative">
        <div
          className={`${
            scrollHeight > 100
              ? "absolute sm:top-[22rem] top-[13rem] text-white"
              : "absolute top-0"
          } w-full h-[300px] text-center transition-all duration-1000 z-[99] flex flex-col justify-center items-center`}
        >
          <h1 className="sm:text-[4.8rem] text-[3rem] font-extrabold">
            BE:BEAM
          </h1>
          <p className="sm:text-[2.4rem] text-[1.4rem] mt-2">
            연결망을 통한 따뜻한 사회로
          </p>
        </div>

        <div
          className={`${
            scrollHeight > 100
              ? "top-40"
              : "sm:max-w-[1400px] max-w-[470px] top-96"
          } w-full mx-auto sm:h-[720px] h-[400px] my-custom-bg-class bg-cover bg-fixed bg-no-repeat bg-[center_bottom_0] text-white relative transition-all duration-700`}
        >
          <div className="w-full h-full bg-black opacity-20 absolute top-0 left-0" />
        </div>
      </div>

      <div className="w-full mx-auto mt-40">
        <div className="w-full max-w-[1400px] mx-auto sm:pt-32 pt-20">
          <h2 className="mb-20 md:text-[3rem] sm:text-[2.625rem] text-[1.4rem] text-[#282828] dark:text-white font-semibold text-center">
            연결망을 통한{" "}
            <span className="text-[#ffffff] dark:text-black text-stroke">
              따뜻한 사회
            </span>
            로
          </h2>

          <div className="w-full lg:mb-32 sm:mb-20 mb-10 lg:flex items-center group text-[#282828] dark:text-white text-center">
            <img
              className="xl:w-[700px] lg:w-[600px] sm:w-[94%] w-[94%] lg:mx-0 sm:mx-auto mx-auto aspect-w-1 aspect-h-1 aspect-square object-cover"
              src={img5}
              alt="intro_img"
            />

            <div className="lg:w-full sm:w-[94%] w-[94%] lg:mx-0 sm:mx-auto mx-auto lg:p-14 box-border">
              <p className="lg:mt-[48px] sm:mt-[30px] mt-[20px] text-[1.125rem] font-medium text-left">
                What does it mean?
              </p>
              <h1 className="lg:mt-5 sm:mt-2 mt-2 lg:mb-20 sm:mb-10 mb-6 sm:text-[2.625rem] text-[1.9rem] font-semibold text-left">
                BE:BEAM이{" "}
                <span className="text-white dark:text-black text-stroke">
                  의미
                </span>
                하는 것은?
              </h1>
              <p className="sm:text-[1rem] text-[0.8rem] font-light text-left">
                💡 안녕하세요! 부산에서 청년 커뮤니티를 기획운영하고 있는
                BE:BEAM입니다. BE:BEAM(비빔)은 비빔밥의 재료처럼 다양한 청년들이
                모여, 빛줄기(BEAM)처럼 따뜻한 연결망을 이어나간다는 의미가
                있습니다. 2022년 소셜다이닝을 시작으로 여러 활동을 준비하고
                진행하고 있습니다. 또 저희는 커뮤니티를 기획운영하는 것에서
                그치지 않고, 누구나 사회참여활동을 시작하실 수 있도록 그 문턱을
                낮추는 활동도 함께 진행하고 있습니다. 많은 관심 부탁드립니다:)
              </p>
            </div>
          </div>

          <div className="w-full lg:mb-32 sm:mb-20 mb-10 flex lg:flex-row sm:flex-col-reverse flex-col-reverse lg:items-center group text-[#282828] dark:text-white text-center">
            <div className="lg:w-full sm:w-[94%] w-[94%] lg:mx-0 sm:mx-auto mx-auto lg:p-14 box-border">
              <p className="lg:mt-[48px] sm:mt-[30px] mt-[20px] text-[1.125rem] font-medium text-left">
                What is the vision of this?
              </p>
              <h1 className="lg:mt-5 sm:mt-2 mt-2 lg:mb-20 sm:mb-10 mb-6 sm:text-[2.625rem] text-[1.9rem] font-semibold text-left">
                BE:BEAM의{" "}
                <span className="text-white dark:text-black text-stroke">
                  비전
                </span>
                은?
              </h1>
              <p className="sm:text-[1rem] text-[0.8rem] font-light text-left">
                💡 오늘날의 청년들은 일상에서 다양한 문제들과 마주하며 살아가고
                있지만 함께 이야기하고, 공감하고, 고민할 자리는 점점 사라지고
                있습니다. 이러한 기회의 부족은 청년들을 외롭게하고, 고립이라는
                사회적문제를 발생시킵니다. 따라서 BE:BEAM은 청년들이 느슨하지만
                따뜻한 연결을 경험하는 기회를 제공하고자 합니다.
              </p>
              <p className="mt-6 sm:text-[1rem] text-[0.8rem] font-light text-left">
                1. BE:BEAM은 취향, 취미를 기반으로 한 오프라인 모임을 통해서
                가벼우면서도 안정적인 일상의 느슨한 연결망을 만드는 활동을
                원칙으로 합니다.
              </p>
              <p className="sm:text-[1rem] text-[0.8rem] font-light text-left">
                2. BE:BEAM의 커뮤니티는 누구나 참여 가능할 수 있도록, 누구나
                운영할 수 있도록 지원하는 것을 원칙으로 합니다.
              </p>
            </div>

            <img
              className="xl:w-[700px] lg:w-[600px] sm:w-[94%] w-[94%] lg:mx-0 sm:mx-auto mx-auto aspect-w-1 aspect-h-1 aspect-square"
              src={img4}
              alt="intro_img"
            />
          </div>

          <div className="w-full lg:mb-32 sm:mb-20 mb-10 lg:flex items-center group text-[#282828] dark:text-white text-center">
            <img
              className="xl:w-[700px] lg:w-[600px] sm:w-[94%] w-[94%] lg:mx-0 sm:mx-auto mx-auto aspect-w-1 aspect-h-1 aspect-square object-cover"
              src={img6}
              alt="intro_img"
            />

            <div className="lg:w-full sm:w-[94%] w-[94%] lg:mx-0 sm:mx-auto mx-auto lg:p-14 box-border">
              <p className="lg:mt-[48px] sm:mt-[30px] mt-[20px] text-[1.125rem] font-medium text-left">
                What is the purpose?
              </p>
              <h1 className="lg:mt-5 sm:mt-2 mt-2 lg:mb-20 sm:mb-10 mb-6 sm:text-[2.625rem] text-[1.9rem] font-semibold text-left">
                BE:BEAM의{" "}
                <span className="text-white dark:text-black text-stroke">
                  목적
                </span>
                은?
              </h1>
              <p className="sm:text-[1rem] text-[0.8rem] font-light text-left">
                💡 BE:BEAM은 취향과 취미를 기반으로한 다양한 활동들을 통해서
                사람과 사람간, 사람과 지역간 느슨한 연결망을 만드는 것을
                목적으로 하고 있습니다.
              </p>
            </div>
          </div>

          <div className="w-full lg:mb-32 sm:mb-20 flex lg:flex-row sm:flex-col-reverse flex-col-reverse lg:items-center group text-[#282828] dark:text-white text-center">
            <div className="lg:w-full sm:w-[94%] w-[94%] lg:mx-0 sm:mx-auto mx-auto lg:p-14 box-border">
              <p className="lg:mt-[48px] sm:mt-[30px] mt-[20px] text-[1.125rem] font-medium text-left">
                What is the core value of this?
              </p>
              <h1 className="lg:mt-5 sm:mt-2 mt-2 lg:mb-20 sm:mb-10 mb-6 sm:text-[2.625rem] text-[1.9rem] font-semibold text-left">
                BE:BEAM의{" "}
                <span className="text-white dark:text-black text-stroke">
                  가치
                </span>
                는?
              </h1>
              <ul className="sm:text-[1rem] text-[0.8rem] font-light text-left">
                <li className="mb-4">
                  <span className="text-[1rem] text-[#f5aa15]">
                    연결망 (SOCIAL NETWORK)
                  </span>{" "}
                  :
                  <br />
                  사람과 사람간, 지역과 사람간 느슨한 연결망을 만드는 활동을
                  진행합니다.
                </li>
                <li className="mb-4">
                  <span className="text-[1rem] text-[#f5aa15]">
                    청년 (YOUTH)
                  </span>{" "}
                  :
                  <br />
                  청년의 주체성 있는 사회참여활동을 기반으로 합니다.
                </li>
                <li className="mb-4">
                  <span className="text-[1rem] text-[#f5aa15]">
                    행동 (ACTION)
                  </span>{" "}
                  :
                  <br />
                  주체성이 담긴 행동을 통해서 사회 구성원의 인식 및 행동의
                  변화를 이끌어냅니다.
                </li>
                <li className="mb-4">
                  <span className="text-[1rem] text-[#f5aa15]">
                    공감 (SYMPATHY)
                  </span>{" "}
                  :
                  <br />
                  사회 구성원에 대한 공감대를 기반으로 서로에게 즐겁고, 따뜻한
                  활동을 진행합니다.
                </li>
                <li className="mb-4">
                  <span className="text-[1rem] text-[#f5aa15]">
                    안정 (STABILITY)
                  </span>{" "}
                  :
                  <br />
                  서로를 존중하고 배려하여 서로에게 안정감을 줄 수 있는 활동을
                  진행합니다.
                </li>
                <li className="mb-4">
                  <span className="text-[1rem] text-[#f5aa15]">
                    의사소통 (communication)
                  </span>{" "}
                  :
                  <br />
                  서로의 이야기를 경청하고, 존중하는 대화를 통해 활동을
                  진행합니다.
                </li>
              </ul>
            </div>

            <img
              className="xl:w-[700px] lg:w-[600px] sm:w-[94%] w-[94%] lg:mx-0 sm:mx-auto mx-auto aspect-w-1 aspect-h-1 aspect-square"
              src={img3}
              alt="intro_img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
