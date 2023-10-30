import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GoX } from "react-icons/go";
import ToolkitCard from "../component/ToolkitCard";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();

  const {
    isLoading: isLoadingToolkits,
    error: errorToolkits,
    data: toolkits,
  } = useQuery(["toolkits"], async () => {
    return axios //
      .get("/data/Toolkit.json") //
      .then((res) => res.data.items.toolkits);
  });

  const {
    isLoading: isLoadingActivities,
    error: errorActivities,
    data: activities,
  } = useQuery(["activities"], async () => {
    return axios //
      .get("/data/Toolkit.json") //
      .then((res) => res.data.items.activities);
  });

  const [allData, setAllData] = useState([]);

  const [text, setText] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("검색결과가 없습니다.");

  const handleDeleteTitle = () => {
    setText("");
  };

  const handleSearchData = (e) => {
    e.preventDefault();

    const trimmedText = text.trim();

    if (trimmedText !== "") {
      setSearchData(
        allData.filter((data) => {
          const removedSpaceTitle = data.title.replace(/ /g, "");
          const removedSpaceDescription = data.description.replace(/ /g, "");

          const removedSpaceText = text.replace(/ /g, "");

          return (
            removedSpaceTitle.replace(/ /g, "").includes(removedSpaceText) ||
            removedSpaceDescription.includes(removedSpaceText)
          );
        })
      );

      if (searchData.length === 0) {
        setErrorMessage("검색결과가 없습니다.");
      }
    } else if (trimmedText === "" || searchData.length === 0) {
      setSearchData([]);
      setErrorMessage("검색결과가 없습니다.");
    }
  };

  console.log(searchData);

  console.log(allData);

  useEffect(() => {
    if (!isLoadingToolkits && !isLoadingActivities) {
      setAllData([...toolkits, ...activities]);
    }
  }, [toolkits, activities, isLoadingToolkits, isLoadingActivities]);

  useEffect(() => {
    if (searchData.length !== 0) {
      setErrorMessage("");
    }
  }, [searchData]);

  const onClickDetailNavigate = (e, data) => {
    e.preventDefault();

    if (data.type === "소모임" || data.type === "정기모임") {
      const activity = data;
      navigate(`/activity/detail/${data.id}`, { state: { activity } });
    } else if (data.type !== "소모임" || data.type !== "정기모임") {
      const toolkit = data;
      navigate(`/toolkit/detail/${data.id}`, { state: { toolkit } });
    }
  };

  return (
    <div className="bg-[#ffffff] dark:bg-black">
      <div className="w-full h-[780px] my-custom-bg-class bg-cover bg-fixed bg-no-repeat bg-[center_bottom_0] text-white flex flex-col justify-center items-center relative">
        <div className="w-full h-full bg-black opacity-20 absolute top-0 left-0" />
        <div className="w-full z-[999] flex flex-col justify-center items-center">
          <p className="text-[3rem] mb-20">
            지금 <span className="text-[3.2rem] font-semibold">무엇을</span>{" "}
            찾고 계신가요?
          </p>
        </div>

        <form
          onSubmit={handleSearchData}
          className="w-full max-w-[760px] mx-auto relative"
        >
          <input
            onChange={(e) => {
              setText(e.target.value);
            }}
            className="w-full p-8 bg-[rgba(0,0,0,0.2)] rounded-full border-[2px] border-solid border-white text-[1.2rem] text-white outline-none placeholder:text-[1.2rem] placeholder:text-[rgba(255,255,255,0.6)]"
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

      {isLoadingToolkits && !isLoadingActivities ? (
        "Loading..."
      ) : !isLoadingToolkits && isLoadingActivities ? (
        "Loading..."
      ) : isLoadingToolkits && isLoadingActivities ? (
        "Loading..."
      ) : (
        <></>
      )}
      {errorToolkits && !errorActivities ? (
        "An error has occurred...!"
      ) : !errorToolkits && errorActivities ? (
        "An error has occurred...!"
      ) : errorToolkits && errorActivities ? (
        "An error has occurred...!"
      ) : (
        <></>
      )}

      <div className="w-11/12 mx-auto pb-32 pt-14 dark:text-white">
        <p className="text-[1.2rem] mb-10">{`총 ${searchData.length}개의 데이터가 검색되었습니다.`}</p>

        {errorMessage !== "" && (
          <div className="w-full flex flex-col items-center text-[1.1rem] dark:text-[#e1e1e1]">
            <p>{errorMessage}</p>
            <p>정확한 검색어인지 확인하시고 다시 검색해 주세요.</p>
          </div>
        )}

        <ul className="w-full grid grid-cols-4 gap-x-4">
          {searchData.length !== 0 &&
            searchData.map((data) => {
              return (
                <li
                  className="cursor-pointer"
                  key={data.id}
                  onClick={(e) => onClickDetailNavigate(e, data)}
                >
                  <img
                    className="w-full aspect-square object-center object-cover mx-auto rounded-2xl"
                    src={process.env.PUBLIC_URL + `${data.thumbnail}`}
                    alt="data_img"
                  />

                  <p className="lg:mt-8 md:mt-4 sm:mt-8 mt-8 text-[#282828] dark:text-[#f5aa15]  lg:text-[1.8rem] md:text-[1.4rem] sm:text-[1.8rem] text-[1.8rem] font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                    {data.title}
                  </p>
                  <p className="lg:mt-6 md:mt-4 sm:mt-4 mt-4 md:mb-0 sm:mb-14 mb-14 lg:text-[1.2rem] sm:text-[1rem] font-normal">
                    {data.description}
                  </p>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
