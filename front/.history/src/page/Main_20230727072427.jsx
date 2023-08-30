import { useEffect } from "react";
import Category from "../component/Category";

export default function Main({ setCategoryOn }) {
  useEffect(() => {
    setCategoryOn(false);
  }, []);

  return (
    <div className="bg-[#ffeaa6] pt-32">
      <Category />

      <div className="w-full h-[780px] my-custom-bg-class2 bg-cover bg-fixed bg-no-repeat text-white flex flex-col justify-center items-center">
        <h1 className="text-[6rem]">The 이상</h1>
        <p className="text-[2.4rem] mb-24">이상한 사회를 이상적인 사회로</p>
      </div>

      <div className="w-11/12 mx-auto pb-32">
        <div className="w-full">
          <h2>이상한 사회를 이상적인 사회로</h2>

          <div>
            <div>
              <img
                src={process.env.PUBLIC_URL + "./image/main_img/1.png"}
                alt="intro_img"
              />
              <p>What does it mean?</p>
              <p>
                💡 THE (더)+이상
                <br />더 이상적인 사회를 만들고자 하는 의미를 가지고 있습니다.
              </p>
            </div>

            <div>
              <img
                src={process.env.PUBLIC_URL + "./image/main_img/1.png"}
                alt="intro_img"
              />
              <p>What is the purpose?</p>
              <p>
                💡 사회문제를 연구하고 부산지역 청년들의 사회참여를 기반으로
                사회문제 해결을 목표로 하며 사회문제 해결을 통해 이상적인 사회
                실현을 목적으로 합니다.
              </p>
            </div>

            <div>
              <img
                src={process.env.PUBLIC_URL + "./image/main_img/1.png"}
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
                청년들이 사회문제를 안전하고, 건강한 방식으로 나누기 위한 활동을
                진행합니다.
              </p>
              <ul>
                <li>사회문제를 발굴하고 연구합니다.</li>
                <li>사회문제 해결을 위한 활동을 연구합니다.</li>
                <li>사회문제 당사자를 위한 사업을 수행합니다.</li>
                <li>
                  기타 단체의 목적을 수행하기 위한 모든 사업을 해내고 있습니다.
                </li>
              </ul>
            </div>

            <div>
              <img
                src={process.env.PUBLIC_URL + "./image/main_img/1.png"}
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
        </div>
      </div>
    </div>
  );
}
