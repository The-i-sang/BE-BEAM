import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GoX } from "react-icons/go";

export default function Main() {
  const [text, setText] = useState("");
  const [searchToolkits, setSearchToolkits] = useState([]);

  const handleDeleteTitle = () => {
    setText("");
  };

  const {
    isLoading,
    error,
    data: toolkits,
  } = useQuery(["toolkits"], async () => {
    return axios //
      .get("/data/Toolkit.json") //
      .then((res) => res.data.items.toolkits);
  });
  console.log(toolkits);

  const handleSearchToolkit = (e) => {
    e.preventDefault();

    setSearchToolkits(
      toolkits.filter((toolkit) => toolkit.title.includes(text))
    );
  };

  return (
    <div className="bg-[#ffeaa6] pt-32">
      <div className="w-full h-[780px] my-custom-bg-class2 bg-cover bg-fixed bg-no-repeat text-white flex flex-col justify-center items-center">
        <h1 className="text-[5rem]">The 이상</h1>
        <p className="text-[1.7rem] mt-[-10px] mb-24">
          이상한 사회를 이상적인 사회로
        </p>

        <form onSubmit={handleSearchToolkit} className="w-2/5 relative">
          <input
            onChange={(e) => {
              setText(e.target.value);
            }}
            className="w-full p-8 bg-[rgba(0,0,0,0.2)] border-[2px] border-solid border-white text-[1.2rem] text-white outline-none placeholder:text-[1.2rem] placeholder:text-[rgba(255,255,255,0.6)]"
            type="text"
            value={text}
            placeholder="검색어를 입력하세요."
          />

          <button
            onClick={handleDeleteTitle}
            className={`${
              text.length > 0 ? "opacity-1" : "opacity-0"
            } text-[2.4rem] absolute right-20 top-[30%] transition-all duration-700`}
            type="button"
          >
            <GoX />
          </button>

          <button
            type="submit"
            className="text-[2.4rem] absolute right-7 top-[30%]"
          >
            <CiSearch />
          </button>
        </form>
      </div>

      <div className="w-11/12 mx-auto pb-32">
        {isLoading && "Loading..."}
        {error && "An error has occurred...!"}

        {searchToolkits && (
          <div className="w-full">
            {searchToolkits.map((toolkit) => {
              return <div>{toolkit.title}</div>;
            })}
          </div>
        )}

        {searchToolkits.length === 0 && (
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
