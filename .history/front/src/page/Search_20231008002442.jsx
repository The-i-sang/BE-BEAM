import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GoX } from "react-icons/go";
import ToolkitCard from "../component/ToolkitCard";

export default function Search({ setCategoryOn }) {
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

  const [text, setText] = useState("");
  const [searchToolkits, setSearchToolkits] = useState([]);
  const [errorMessage, setErrorMessage] = useState("검색결과가 없습니다.");

  const handleDeleteTitle = () => {
    setText("");
  };

  const handleSearchToolkit = (e) => {
    e.preventDefault();

    const trimmedText = text.trim();

    if (trimmedText !== "") {
      setSearchToolkits(
        toolkits.filter((toolkit) => {
          const removedSpaceTitle = toolkit.title.replace(/ /g, "");
          const removedSpaceDescription = toolkit.description.replace(/ /g, "");

          const removedSpaceText = text.replace(/ /g, "");

          return (
            removedSpaceTitle.replace(/ /g, "").includes(removedSpaceText) ||
            removedSpaceDescription.includes(removedSpaceText)
          );
        })
      );

      if (searchToolkits.length === 0) {
        setErrorMessage("검색결과가 없습니다.");
      }
    } else if (trimmedText == "" || searchToolkits.length === 0) {
      setSearchToolkits([]);
      setErrorMessage("검색결과가 없습니다.");
    }
  };

  console.log(searchToolkits);

  useEffect(() => {
    if (searchToolkits.length !== 0) {
      setErrorMessage("");
    }
  }, [searchToolkits]);

  useEffect(() => {
    setCategoryOn(false);
  }, []);

  return (
    <div className="bg-[#ffffff] pt-32">
      <div className="w-full h-[780px] my-custom-bg-class bg-cover bg-fixed bg-no-repeat text-white flex flex-col justify-center items-center">
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

      {isLoading && "Loading..."}
      {error && "An error has occurred...!"}

      <div className="w-11/12 mx-auto pb-32 pt-14">
        <p className="text-[1.2rem] mb-10">{`총 ${searchToolkits.length}개의 툴킷이 검색되었습니다.`}</p>

        {errorMessage !== "" && (
          <div className="w-full flex flex-col items-center text-[1.1rem]">
            <p>{errorMessage}</p>
            <p>정확한 검색어인지 확인하시고 다시 검색해 주세요.</p>
          </div>
        )}

        <ul className="w-full flex flex-wrap [&>*:last-child]:ml-0">
          {searchToolkits.length !== 0 &&
            searchToolkits.map((toolkit, index) => {
              return (
                <ToolkitCard toolkit={toolkit} key={toolkit.id} index={index} />
              );
            })}
        </ul>
      </div>
    </div>
  );
}
