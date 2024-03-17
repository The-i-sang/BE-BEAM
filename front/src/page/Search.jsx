import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MeetingAndToolkitDataFetch } from "../api/meetingAndToolkit";
import SearchInputForm from "../component/input/SearchInputForm";
import useInput from "../customhook/useInput";
import { handleConsoleError } from "../common";

export default function Search() {
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery(["data"], async () => {
    const result = await MeetingAndToolkitDataFetch();
    return result;
  });

  const [datas, setDatas] = useState([]);
  const [searchText, onSearchTextChange, setSearchText] = useInput("");
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (data?.toolkits && data?.activities)
      setDatas([...data?.toolkits, ...data?.activities]);
  }, [data?.toolkits, data?.activities]);

  useEffect(() => {
    setComment(handleConsoleError(isLoading, error, searchText, filteredDatas));
  }, [isLoading, error, searchText, filteredDatas]);

  return (
    <div className="bg-[#ffffff] dark:bg-black">
      <div className="w-full sm:h-[780px] h-[500px] my-custom-bg-class bg-cover bg-fixed bg-no-repeat bg-[center_bottom_50%] text-white flex flex-col justify-center items-center relative">
        <div className="w-full h-full bg-[rgba(0,0,0,0.2)] absolute" />
        <div className="w-11/12 h-full max-w-[1400px] absolute top-0 flex flex-col justify-center">
          <div className="w-full z-[99] flex flex-col justify-center items-center">
            <p className="sm:text-[3rem] text-[2rem] sm:mb-20 mb-14 text-center font-semibold">
              지금 무엇을 찾고 계신가요?
            </p>
          </div>

          <SearchInputForm
            placeholder="검색어를 입력하세요."
            searchText={searchText}
            onChange={onSearchTextChange}
            setSearchText={setSearchText}
            data={datas}
            setFilteredDatas={setFilteredDatas}
          />
        </div>
      </div>

      <div>
        {filteredDatas.map((data) => {
          return (
            <div>
              <h1 className="text-[3rem]">{data.title}</h1>
              <p>{data.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
