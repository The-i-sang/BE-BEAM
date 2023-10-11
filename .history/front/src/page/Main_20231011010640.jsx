import { useEffect, useState } from "react";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/5.png";

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
    <div className="w-full mx-auto mt-4">
      <div className="w-full relative">
        <div
          className={`${
            scrollHeight > 100
              ? "absolute top-[22rem] text-white"
              : "absolute top-0"
          } w-full h-[300px] text-center transition-all duration-1000 z-[9999] flex flex-col justify-center items-center`}
        >
          <h1 className="text-[4.8rem] font-extrabold">The 이상</h1>
          <p className="text-[2.4rem] mt-2">이상한 사회를 이상적인 사회로</p>
        </div>

        <div
          className={`${
            scrollHeight > 100 ? "w-full top-40" : "w-11/12 top-96"
          } mx-auto h-[720px] my-custom-bg-class bg-cover bg-fixed bg-no-repeat bg-[center_bottom_0] text-white relative transition-all duration-700`}
        >
          <div className="w-full h-full bg-black opacity-20 absolute top-0 left-0" />
        </div>
      </div>

      <div className="w-full mx-auto mt-40">
        <div className="w-11/12 mx-auto pt-32">
          <h2 className="mb-20 text-[3rem] text-[#282828] font-semibold text-center">
            이상한 사회를{" "}
            <span className="text-[#ffffff] text-stroke">이상적인 사회</span>로
          </h2>

          <div className="w-full mb-32 flex items-center group text-[#282828] text-center">
            <img className="w-6/12 object-cover" src={img5} alt="intro_img" />

            <div className="w-6/12 p-14 box-border flex flex-col items-start">
              <p className="mt-[48px] text-[1.125rem] font-medium">
                What does it mean?
              </p>
              <h1 className="mb-20 text-[2.625rem] font-semibold">
                The 이상이 <span className="text-white text-stroke">의미</span>
                하는 것은?
              </h1>
              <p className="text-[1rem] text-left leading-7">
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

          <div className="w-full mb-32 flex items-center group text-[#282828] text-center">
            <div className="w-6/12 p-14 box-border flex flex-col items-">
              <p className="mt-[48px] text-[1.125rem] font-medium">
                What is the vision of this?
              </p>
              <h1 className="mb-20 text-[2.625rem] font-semibold">
                The 이상의 <span className="text-white text-stroke">비전</span>
                은?
              </h1>
              <p className="text-[1rem] text-left leading-7">
                💡 오늘날의 청년들은 일상에서 다양한 문제들과 마주하며 살아가고
                있지만 함께 이야기하고, 공감하고, 고민할 자리는 점점 사라지고
                있습니다. 이러한 기회의 부족은 청년들을 외롭게하고, 고립이라는
                사회적문제를 발생시킵니다. 따라서 BE:BEAM은 청년들이 느슨하지만
                따뜻한 연결을 경험하는 기회를 제공하고자 합니다.
              </p>
              <p className="text-[1rem] text-left leading-7">
                1. BE:BEAM은 취향, 취미를 기반으로 한 오프라인 모임을 통해서
                가벼우면서도 안정적인 일상의 느슨한 연결망을 만드는 활동을
                원칙으로 합니다.
              </p>
              <p className="text-[1rem] text-left leading-7">
                2. BE:BEAM의 커뮤니티는 누구나 참여 가능할 수 있도록, 누구나
                운영할 수 있도록 지원하는 것을 원칙으로 합니다.
              </p>
            </div>

            <img className="w-6/12 object-cover" src={img4} alt="intro_img" />
          </div>

          <div className="w-full mb-32 flex items-center group text-[#282828] text-center">
            <div className="w-6/12 p-14 box-border flex flex-col items-end">
              <p className="mt-[48px] text-[1.125rem] font-medium">
                What is the purpose?
              </p>
              <h1 className="mb-20 text-[2.625rem] font-semibold">
                The 이상의 <span className="text-white text-stroke">목적</span>
                은?
              </h1>
              <p className="text-[1rem] text-right leading-7">
                💡 사회문제를 연구하고 부산지역 청년들의 사회참여를 기반으로{" "}
                사회문제 해결을 목표로 하며 사회문제 해결을 통해 이상적인 사회
                실현을 목적으로 합니다.
              </p>
            </div>

            <img className="w-6/12 object-cover" src={img2} alt="intro_img" />
          </div>

          <div className="w-full mb-60 flex flex-col items-center group text-[#282828] text-center">
            <img className="w-full object-cover" src={img3} alt="intro_img" />
            <p className="mt-[48px] text-[1.125rem] font-medium">
              What is the core value of this?
            </p>
            <h1 className="text-[2.625rem] font-semibold mt-[1rem]">
              The 이상의 <span className="text-white text-stroke">가치</span>
              는?
            </h1>
            <ul className="mt-[2rem] text-[1.125rem] text-left">
              <li className="mb-4">
                <span className="text-[#f5aa15]">IDEA/L</span> - 발상/이상:{" "}
                <br />
                사회문제 해결을 위한 기발한 발상으로 이상적인 사회를 만들어
                갑니다.
              </li>
              <li className="mb-4">
                <span className="text-[#f5aa15]">ODD</span> - 이상한, 특이한:{" "}
                <br />
                이상하지만 특이한 우리들만의 방식으로 사회문제를 바라보고,
                해결하고자 합니다.
              </li>
              <li className="mb-4">
                <span className="text-[#f5aa15]">YOUTH</span> - 청년: <br />
                청년의 주체성 있는 사회참여활동을 기반으로 이상적인 사회로
                나아갑니다.
              </li>
              <li className="mb-4">
                <span className="text-[#f5aa15]">ACTION</span> - 행동: <br />
                주체성이 담긴 행동을 통해서 사회 구성원의 인식 및 행동의 변화를
                이끌어냅니다.
              </li>
              <li className="mb-4">
                <span className="text-[#f5aa15]">SYMPATHY</span> - 공감: <br />
                사회 구성원에 대한 공감대를 기반으로 서로에게 즐겁고, 따뜻한
                활동을 진행합니다.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
