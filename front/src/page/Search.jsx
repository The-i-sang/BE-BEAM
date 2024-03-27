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
    setFilteredDatas([]);

    onSearchTextChange(e);
  };

  return (
    <div className="bg-[#ffffff] dark:bg-black">
      <div className="w-full sm:h-[780px] h-[500px] my-custom-bg-class bg-cover bg-fixed bg-no-repeat bg-[center_bottom_50%] text-white flex flex-col justify-center items-center relative">
        <div className="w-full h-full bg-[rgba(0,0,0,0.2)] absolute" />
        <div className="w-11/12 h-full max-w-[90%] absolute top-0 flex flex-col justify-center">
          <div className="w-full z-[99] flex flex-col justify-center items-center">
            <p className="sm:text-[3rem] text-[2rem] sm:mb-20 mb-14 text-center font-semibold">
              지금 무엇을 찾고 계신가요?
            </p>
          </div>

          <SearchInputForm
            placeholder="검색어를 입력하세요."
            searchText={searchText}
            onChange={onHandleSearchTextChange}
            setSearchText={setSearchText}
            data={datas}
            setFilteredDatas={setFilteredDatas}
            formStyle="max-w-[760px] mx-auto text-white"
            inputStyle="bg-[rgba(0,0,0,0.2)] border-white placeholder:text-[rgba(255,255,255,0.6)]"
          />
        </div>
      </div>

      <div className="w-full px-4 pt-6 py-24 box-border text-center">
        <p>{comment}</p>

        <ul className="w-full md:grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-x-5 text-left">
          {searchText.length > 0 &&
            filteredDatas.map((data) => {
              return (
                <Card
                  data={data}
                  key={data.id}
                  onClick={() => {
                    if (data.finish_type) {
                      navigate(`/meeting/detail/${data.id}`, {
                        state: { activity: data },
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
              );
            })}
        </ul>
      </div>
    </div>
  );
}
