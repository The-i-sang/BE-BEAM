import { useEffect } from "react";
import Category from "../component/Category";
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/5.png";
import img6 from "../assets/6.png";

export default function Main({ setCategoryOn }) {
  useEffect(() => {
    setCategoryOn(false);
  }, []);

  return (
    <div className="bg-[#ffffff] pt-32">
      <Category />

      <div className="w-full h-[780px] my-custom-bg-class bg-cover bg-fixed bg-no-repeat text-white flex flex-col justify-center items-center">
        <h1 className="text-[6rem]">The 이상</h1>
        <p className="text-[2.4rem] mb-24">이상한 사회를 이상적인 사회로</p>
      </div>

      <div className="w-11/12 mx-auto pb-32">
        <div className="w-full pt-7">
          <h2 className="text-[4rem] text-[#282828] font-semibold text-center">
            이상한 사회를{" "}
            <span className="text-[#ffffff] text-stroke">이상적인 사회</span>로
          </h2>

          <div className="w-full mt-32 flex justify-between">
            <div className="w-5/12">
              <div className="w-full mb-60 flex flex-col items-center">
                <img
                  className="w-full object-cover"
                  src={img5}
                  alt="intro_img"
                />
                <p className="mt-[48px] text-[1.125rem] font-medium">
                  What does it mean?
                </p>
                <h1>💡 THE (더)+이상</h1>
                <p className="text-center">
                  더 이상적인 사회를 만들고자 하는 의미를 가지고 있습니다.
                </p>
              </div>

              <div className="w-full">
                <img
                  className="w-full object-cover"
                  src={img2}
                  alt="intro_img"
                />
                <p>What is the purpose?</p>
                <p>
                  💡 사회문제를 연구하고 부산지역 청년들의 사회참여를 기반으로
                  사회문제 해결을 목표로 하며 사회문제 해결을 통해 이상적인 사회
                  실현을 목적으로 합니다.
                </p>
              </div>
            </div>

            <div className="w-5/12">
              <div className="w-full mb-60">
                <img
                  className="w-full object-cover"
                  src={img4}
                  alt="intro_img"
                />
                <p>What is the vision of this?</p>
                <p>
                  현재 오늘날의 청년들은 일상에서 다양한 문제들과 마주하며
                  살아가고 있습니다.
                </p>
                <p>
                  여러 사회 문제들을 일상에서 나누고, 해결 방법을 생각하고
                  행동하는 기회가 부족한 상황입니다. 따라서 우리는 일상에서
                  청년들이 사회문제를 안전하고, 건강한 방식으로 나누기 위한
                  활동을 진행합니다.
                </p>
                <ul>
                  <li>사회문제를 발굴하고 연구합니다.</li>
                  <li>사회문제 해결을 위한 활동을 연구합니다.</li>
                  <li>사회문제 당사자를 위한 사업을 수행합니다.</li>
                  <li>
                    기타 단체의 목적을 수행하기 위한 모든 사업을 해내고
                    있습니다.
                  </li>
                </ul>
                <p>
                  THE 이상은 오프라인 및 온라인을 기반으로 활동을 진행합니다.
                </p>
                <ul>
                  <li>
                    오프라인으로는 청년 호스트를 양성하여, 취향을 기반으로
                    사회문제를 이야기할 수 있는 청년들의 독자적인 모임을 활성화
                    합니다.
                  </li>
                  <li>
                    당사자를 기반으로 한 사회참여활동의 활성화를 위해 각종
                    인프라를 구축할 계획입니다.
                  </li>
                  <li>
                    청년들이 사회문제에 관심을 가지도록 연구, 각종 콘텐츠를
                    제작할 예정입니다.
                  </li>
                </ul>
              </div>

              <div className="w-full">
                <img
                  className="w-full object-cover"
                  src={img3}
                  alt="intro_img"
                />
                <p>What is the core value of this?</p>
                <ul>
                  <li>
                    IDEA/L - 발상/이상: 사회문제 해결을 위한 기발한 발상으로
                    이상적인 사회를 만들어 갑니다.
                  </li>
                  <li>
                    ODD - 이상한, 특이한: 이상하지만 특이한 우리들만의 방식으로
                    사회문제를 바라보고, 해결하고자 합니다.
                  </li>
                  <li>
                    YOUTH - 청년: 청년의 주체성 있는 사회참여활동을 기반으로
                    이상적인 사회로 나아갑니다.
                  </li>
                  <li>
                    ACTION - 행동: 주체성이 담긴 행동을 통해서 사회 구성원의
                    인식 및 행동의 변화를 이끌어냅니다.
                  </li>
                  <li>
                    SYMPATHY - 공감: 사회 구성원에 대한 공감대를 기반으로
                    서로에게 즐겁고, 따뜻한 활동을 진행합니다.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
