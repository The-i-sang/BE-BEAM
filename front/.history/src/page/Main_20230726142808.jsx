import React from "react";

export default function Main() {
  return (
    <div className="bg-[#ffeaa6] pt-32">
      <div className="w-full h-[800px] bg-[url('https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-fixed bg-no-repeat flex justify-center items-center">
        <h1 className="text-[4rem] text-white">The이상</h1>
      </div>
      <div className="w-11/12 mx-auto pb-32">
        <div className="w-full">
          <h2>이상한 사회를 이상적인 사회로</h2>
          <p>이상한 사회를 이상적인 사회로</p>

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
  );
}
