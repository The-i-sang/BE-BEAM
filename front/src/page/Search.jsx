import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GoX } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();

  const {
    isLoading: isLoadingToolkits,
    error: errorToolkits,
    data: toolkits,
  } = useQuery(["toolkits"], async () => {
    return axios //
      .get(process.env.PUBLIC_URL + "/data/Toolkit.json") //
      .then((res) => res.data.items.toolkits);
  });

  const {
    isLoading: isLoadingActivities,
    error: errorActivities,
    data: activities,
  } = useQuery(["activities"], async () => {
    return axios //
      .get(process.env.PUBLIC_URL + "/data/Toolkit.json") //
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
      navigate(`/meeting/detail/${data.id}`, { state: { activity } });
    } else if (data.type !== "소모임" || data.type !== "정기모임") {
      const toolkit = data;
      navigate(`/toolkit/detail/${data.id}`, { state: { toolkit } });
    }
  };

  return (
    <div className="bg-[#ffffff] dark:bg-black">
      <div className="w-full sm:h-[780px] h-[500px] my-custom-bg-class bg-cover bg-fixed bg-no-repeat bg-[center_bottom_0] text-white flex flex-col justify-center items-center relative">
        <div className="w-11/12 max-w-[1400px]">
          <div className="w-full z-[999] flex flex-col justify-center items-center">
            <p className="sm:text-[3rem] text-[2rem] sm:mb-20 mb-14 text-center">
              지금{" "}
              <span className="sm:text-[3.2rem] text-[2.2rem] font-semibold">
                무엇을
              </span>{" "}
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
              className="w-full sm:p-8 p-5 box-border bg-[rgba(0,0,0,0.2)] rounded-full border-[2px] border-solid border-white sm:text-[1.2rem] text-[0.9rem] text-white outline-none sm:placeholder:text-[1.2rem] placeholder:text-[0.9rem] placeholder:text-[rgba(255,255,255,0.6)]"
              type="text"
              value={text}
              placeholder="검색어를 입력하세요."
            />

            <button
              onClick={handleDeleteTitle}
              className={`${
                text.length > 0 ? "opacity-1" : "opacity-0"
              } sm:text-[2.4rem] text-[1.5rem] absolute sm:right-20 right-12 sm:top-[30%] top-[36%] transition-all duration-700`}
              type="button"
            >
              <GoX />
            </button>

            <button
              type="submit"
              className="sm:text-[2.4rem] text-[1.5rem] absolute sm:right-7 right-4 sm:top-[30%] top-[36%]"
            >
              <CiSearch />
            </button>
          </form>
        </div>
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

      <div className="w-11/12 mx-auto sm:pb-32 pb-20 sm:pt-14 pt-8 dark:text-white">
        <p className="sm:text-[1.2rem] text-[0.9rem] mb-10">
          총 <span className="font-semibold">{searchData.length}</span>개의
          데이터가 검색되었습니다.
        </p>

        {errorMessage !== "" && (
          <div className="w-full flex flex-col items-center sm:text-[1.1rem] text-[0.8rem] dark:text-[#e1e1e1]">
            <p>{errorMessage}</p>
            <p>정확한 검색어인지 확인하시고 다시 검색해 주세요.</p>
          </div>
        )}
        <ul className="w-full sm:grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-4">
          {searchData.length !== 0 &&
            searchData.map((data) => {
              return (
                <li
                  className="lg:mb-16 md:mb-8 cursor-pointer"
                  key={data.id}
                  onClick={(e) => onClickDetailNavigate(e, data)}
                >
                  <div className="relative group">
                    <img
                      className="w-full aspect-square object-bottom object-cover mx-auto rounded-2xl border-[2px] border-solid border-[#f5aa15]"
                      src={
                        process.env.PUBLIC_URL +
                        data.squareImage.replace("./", "/")
                      }
                      alt="data_img"
                    />
                    <div className="2xl:group-hover:h-24 xl:group-hover:h-20 lg:group-hover:h-20 md:group-hover:h-16 sm:group-hover:h-24 group-hover:h-24 absolute bottom-0 w-full h-0 bg-[rgba(40,40,40,0.94)] rounded-b-lg text-white flex justify-center items-center xl:text-xl lg:text-lg md:text-[1rem] sm:text-xl text-xl transition-all duration-700 overflow-hidden">
                      <p>자세히 보기</p>
                    </div>
                  </div>

                  <p className="lg:mt-8 md:mt-4 sm:mt-8 mt-6 text-[#282828] dark:text-[#79B1FF] lg:text-[1.8rem] md:text-[1.6rem] sm:text-[1.4rem] text-[1.4rem] font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                    {data.title}
                  </p>
                  <p className="lg:mt-6 md:mt-4 sm:mt-2 mt-4 md:mb-0 sm:mb-14 mb-10 lg:text-[1.2rem] md:text-[1rem] sm:text-[0.9rem] text-[0.9rem] font-normal dark:text-white whitespace-normal">
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
