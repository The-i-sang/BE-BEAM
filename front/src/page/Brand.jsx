import { useEffect, useState } from "react";
import MainIntroContent from "../component/brand/MainIntroContent";

export default function Brand() {
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

  const content1 =
    "💡 안녕하세요! 부산에서 청년 커뮤니티를 기획운영하고 있는 BE:BEAM입니다. BE:BEAM(비빔)은 비빔밥의 재료처럼 다양한 청년들이 모여, 빛줄기(BEAM)처럼 따뜻한 연결망을 이어나간다는 의미가 있습니다. 2022년 소셜다이닝을 시작으로 여러 활동을 준비하고 진행하고 있습니다. 또 저희는 커뮤니티를 기획운영하는 것에서 그치지 않고, 누구나 사회참여활동을 시작하실 수 있도록 그 문턱을 낮추는 활동도 함께 진행하고 있습니다. 많은 관심 부탁드립니다:)";
  const content2 =
    "💡 BE:BEAM은 취향과 취미를 기반으로한 다양한 활동들을 통해서 사람과 사람간, 사람과 지역간 느슨한 연결망을 만드는 것을 목적으로 하고 있습니다.";
  const content3 =
    "💡 오늘날의 청년들은 일상에서 다양한 문제들과 마주하며 살아가고 있지만 함께 이야기하고, 공감하고, 고민할 자리는 점점 사라지고 있습니다. 이러한 기회의 부족은 청년들을 외롭게하고, 고립이라는 사회적문제를 발생시킵니다. 따라서 BE:BEAM은 청년들이 느슨하지만 따뜻한 연결을 경험하는 기회를 제공하고자 합니다.\n\n1. BE:BEAM은 취향, 취미를 기반으로 한 오프라인 모임을 통해서 가벼우면서도 안정적인 일상의 느슨한 연결망을 만드는 활동을 원칙으로 합니다.\n2. BE:BEAM의 커뮤니티는 누구나 참여 가능할 수 있도록, 누구나 운영할 수 있도록 지원하는 것을 원칙으로 합니다.";
  const content4 =
    "연결망 (SOCIAL NETWORK) :\n사람과 사람간, 지역과 사람간 느슨한 연결망을 만드는 활동을 진행합니다.\n\n청년 (YOUTH) :\n청년의 주체성 있는 사회참여활동을 기반으로 합니다.\n\n행동 (ACTION) :\n주체성이 담긴 행동을 통해서 사회 구성원의 인식 및 행동의 변화를 이끌어냅니다.\n\n공감 (SYMPATHY) :\n사회 구성원에 대한 공감대를 기반으로 서로에게 즐겁고, 따뜻한 활동을 진행합니다.\n\n안정 (STABILITY) :\n서로를 존중하고 배려하여 서로에게 안정감을 줄 수 있는 활동을 진행합니다.\n\n의사소통 (COMMUNICATION) :\n서로의 이야기를 경청하고, 존중하는 대화를 통해 활동을 진행합니다.";

  const divStyles = "lg:mb-32 sm:mb-20 mb-10";

  return (
    <div className="w-full pt-4 pb-20 mx-auto sm:pb-20">
      <div className="relative w-full">
        <div
          className={`${
            scrollHeight > 100
              ? "sm:top-[22rem] top-[13rem] text-white"
              : "top-0"
          } w-full h-[300px] text-center sm:text-[2.4rem] text-[1.4rem] transition-all duration-1000 z-[99] flex flex-col justify-center items-center absolute`}
        >
          <h1 className="mb-2 sm:text-[4.8rem] text-[3rem] font-extrabold">
            BE:BEAM
          </h1>
          연결망을 통한 따뜻한 사회로
        </div>

        <div
          className={`${
            scrollHeight > 100
              ? "top-40"
              : "sm:max-w-[90%] max-w-[470px] top-96"
          } w-full mx-auto sm:h-[720px] h-[400px] my-custom-bg-class bg-cover bg-fixed bg-no-repeat bg-[center_bottom_50%] text-white relative transition-all duration-700`}
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1615192606632-9c9d005f6a2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)]" />
        </div>
      </div>

      <div className="w-full mx-auto mt-40 text-text-light-90 dark:text-text-dark-default">
        <div className="w-full max-w-[90%] mx-auto sm:pt-32 pt-20 md:text-[3rem] sm:text-[2.625rem] text-[1.4rem]">
          <h2 className="mb-20 font-semibold text-center">
            연결망을 통한
            <span className="ml-2 md:ml-4 sm:ml-2 text-text-light-10 dark:text-text-dark-90 text-stroke">
              따뜻한 사회
            </span>
            로
          </h2>

          <MainIntroContent
            img="/image/brand/1.png"
            subTitle="What does it mean?"
            titleFront="BE:BEAM이"
            titleMiddle="의미"
            titleBack="하는 것은?"
            content={content1}
            divStyles={divStyles}
          />

          <MainIntroContent
            img="/image/brand/2.png"
            subTitle="What is the vision of this?"
            titleFront="BE:BEAM의"
            titleMiddle="비전"
            titleBack="은?"
            content={content3}
            isEven={true}
            divStyles={divStyles}
          />

          <MainIntroContent
            img="/image/brand/3.png"
            subTitle="What is the purpose?"
            titleFront="BE:BEAM의"
            titleMiddle="목적"
            titleBack="은?"
            content={content2}
            divStyles={divStyles}
          />

          <MainIntroContent
            img="/image/brand/4.png"
            subTitle=" What is the core value of this?"
            titleFront="BE:BEAM의"
            titleMiddle="가치"
            titleBack="는?"
            content={content4}
            isEven={true}
          />
        </div>
      </div>
    </div>
  );
}
