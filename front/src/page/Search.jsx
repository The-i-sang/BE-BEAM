import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MeetingAndToolkitDataFetch } from "../api/meetingAndToolkit";
import SearchInputForm from "../component/input/SearchInputForm";
import useInput from "../customhook/useInput";
import { handleConsoleError } from "../common";
import Card from "../component/toolkit/Card";

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

  const onHandleSearchTextChange = (e) => {
    onSearchTextChange(e);
  };

  const handleSearchData = (e) => {
    e.preventDefault();

    if (!Array.isArray(datas)) return;

    let filtered = datas;

    const trimmedSearchTerm = searchText.trim();

    if (
      (searchText.length > 0 || searchText.length === 0) &&
      trimmedSearchTerm === ""
    ) {
      setFilteredDatas([]);
    } else {
      const refinedSearchTerm = searchText.replace(/\s+/g, "").toLowerCase();

      const filteredResults = filtered.filter(
        (data) =>
          data?.title
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes(refinedSearchTerm) ||
          data?.description
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes(refinedSearchTerm)
      );

      setFilteredDatas(filteredResults);
    }
  };

  return (
    <div className="text-center text-white bg-bg-light-default dark:bg-bg-dark-default">
      <div className="w-full sm:h-[780px] h-[500px] my-custom-bg-class bg-cover bg-fixed bg-no-repeat bg-[center_bottom_50%] flex flex-col justify-center items-center relative">
        <div className="w-full h-full bg-[rgba(0,0,0,0.2)] absolute" />
        <div className="w-11/12 h-full max-w-[90%] absolute top-0 flex flex-col justify-center">
          <h1 className="w-full z-[99] sm:text-[3rem] text-[2rem] sm:mb-20 mb-14 font-semibold">
            지금 무엇을 찾고 계신가요?
          </h1>

          <SearchInputForm
            placeholder="검색어를 입력하세요."
            searchText={searchText}
            onChange={onHandleSearchTextChange}
            setSearchText={setSearchText}
            handleSearchData={handleSearchData}
            formStyle="w-full max-w-[760px] mx-auto text-white sm:text-[1.2rem] text-[0.9rem]"
            inputStyle="sm:p-8 p-5 rounded-full bg-[rgba(0,0,0,0.2)] border-white placeholder:text-[rgba(255,255,255,0.6)] sm:placeholder:text-[1.2rem] placeholder:text-[0.9rem]"
            deleteBtnStyle="sm:text-[2.4rem] text-[1.5rem] sm:top-[30%] top-[36%] sm:right-20 right-12"
            searchBtnStyle="sm:text-[2.4rem] text-[1.5rem] sm:right-7 right-4 sm:top-[30%] top-[36%]"
          />
        </div>
      </div>

      <div className="box-border w-full px-4 py-24 pt-6 text-center text-text-light-default dark:text-text-dark-default">
        {comment}

        <ul className="w-full text-left md:grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-x-5">
          {filteredDatas.map((data) => (
            <Card
              data={data}
              key={data.id}
              onClick={() => {
                if (data.finish_type) {
                  navigate(`/meeting/detail/${data.id}`, {
                    state: { id: data.id },
                  });
                } else {
                  navigate(`/toolkit/detail/${data.id}`, {
                    state: { toolkit: data },
                  });
                }
              }}
              thumbnailImg={data.thumbnail}
              bgColor="bg-[#8db88f]"
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
