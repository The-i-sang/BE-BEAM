import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { ResponsiveSize } from "../../recoil/contentState";
import SearchInputForm from "../input/SearchInputForm";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { UserDataState } from "../../recoil/userState";
import { formatTimeAgo } from "../../common";
import useInput from "../../customhook/useInput";

import { CiHeart } from "react-icons/ci";

export default function CommunityReviewsWrap({
  datas,
  styles,
  isMeetingDetail,
  setReviewDatas,
}) {
  const responsiveSize = useRecoilValue(ResponsiveSize);
  const userData = useRecoilValue(UserDataState);
  const [topic, setTopic] = useState("all");
  const [type, setType] = useState("텍스트");
  const [sort, setSort] = useState("최신순");
  const [displaySearchText, onDisplaySearchTextChange, setDisplaySearchText] =
    useInput("");
  const [searchText, _, setSearchText] = useInput("");
  const [filteredDatas, setFilteredDatas] = useState([]);

  const filterData = useCallback(() => {
    if (!Array.isArray(datas)) return;

    let filtered = datas;

    const newFilteredData = filtered.filter((item) => {
      const trimmedSearchTerm = displaySearchText.trim();
      const refinedSearchTerm = displaySearchText
        .replace(/\s+/g, "")
        .toLowerCase();

      const matchesSearch =
        displaySearchText.length > 0 && trimmedSearchTerm === ""
          ? []
          : item.text
              .replace(/\s+/g, "")
              .toLowerCase()
              .includes(refinedSearchTerm);

      const matchesTopic = topic !== "all" ? item.meeting.type === topic : true;
      const matchesType = type === "사진" ? item.image.length > 0 : true;
      return matchesSearch && matchesTopic && matchesType;
    });

    // 정렬 추가
    const sortedData = newFilteredData.sort((a, b) => {
      if (sort === "최신순") {
        return b.creatingAt - a.creatingAt; // 최신순 정렬
      } else if (sort === "좋아요순") {
        return b.likes.length - a.likes.length; // 좋아요순 정렬
      }
      return 0; // 기본값
    });

    setFilteredDatas(sortedData);
  }, [datas, searchText, topic, type, sort]);

  const handleSearchData = (e) => {
    e.preventDefault();

    setSearchText(displaySearchText);
    filterData();
  };

  const averageRating = (
    datas.reduce((acc, review) => acc + review.rating, 0) / datas.length
  ).toFixed(1);

  const satisfaction =
    averageRating < 1
      ? "매우 낮음:("
      : averageRating >= 1 && averageRating < 2
      ? "낮음:("
      : averageRating >= 2 && averageRating < 3
      ? "보통:)"
      : averageRating >= 3 && averageRating < 4
      ? "높음:)"
      : averageRating >= 4
      ? "아주 높음:)"
      : null;

  useEffect(() => {
    setFilteredDatas(datas);
  }, [datas]);

  useEffect(() => {
    filterData();
  }, [filterData]);

  return (
    <div className={`${styles} w-full`}>
      <h1 className="w-full py-2 border-b-[2px] border-solid border-bg-light-90 dark:border-bg-dark-10 text-[1.1rem] font-bold">
        {isMeetingDetail ? "" : "커뮤니티 리뷰"}
      </h1>

      <div className="sm:flex items-center w-full py-5 border-b-[1px] border-solid border-[#e1e5e9]">
        <div className="sm:w-[190px] w-full sm:py-4 pt-3 pb-4 pr-12 box-border flex items-center sm:justify-normal justify-center gap-x-4 text-[3.4rem] font-bold sm:border-r-[2px] sm:border-b-0 border-b-[2px]  border-solid border-[#dadada]">
          <img
            className="w-12 h-12"
            src={process.env.PUBLIC_URL + "/../image/star.png"}
            alt="star"
          />
          <h1>{averageRating}</h1>
        </div>

        <div className="box-border flex flex-col justify-center w-full pt-5 text-center sm:pl-12 sm:pt-0 sm:w-auto sm:text-left">
          <p>
            현재까지
            <span className="ml-1 text-[1.25rem] font-bold">
              {datas.length}개의 찐 모임 후기
            </span>
            가 달렸습니다.
            <br />
            모임 참여자들의 만족도
            <span className="ml-1 text-[1.25rem] font-bold text-mainColor">
              {satisfaction}
            </span>
          </p>
        </div>
      </div>

      <div className="w-full py-5 border-b-[1px] border-solid border-[#e1e5e9] sm:flex justify-between items-center">
        <div className="flex flex-wrap items-center w-full sm:w-auto gap-x-2">
          <SearchInputForm
            placeholder="검색어를 입력하세요."
            searchText={displaySearchText}
            onChange={onDisplaySearchTextChange}
            setSearchText={setDisplaySearchText}
            handleSearchData={handleSearchData}
            formStyle="sm:w-[260px] w-full text-text-light-default dark:text-text-dark-default sm:text-[1rem] text-[0.875rem]"
            inputStyle="sm:px-2 sm:py-2 px-2 py-2 rounded-lg bg-[#f2f2f2] border-white placeholder:text-text-light-20 sm:placeholder:text-[1rem] placeholder:text-[0.875rem]"
            deleteBtnStyle="sm:text-[1.4rem] text-[1.2rem] sm:top-[24%] top-[26%] sm:right-10 right-8"
            searchBtnStyle="sm:text-[1.4rem] text-[1.2rem] sm:right-3 right-2 sm:top-[24%] top-[26%]"
          />

          <FormControl
            fullWidth
            sx={{
              width:
                responsiveSize === "2sm" || responsiveSize === "3sm"
                  ? "100%"
                  : 120,
              marginTop:
                responsiveSize === "2sm" || responsiveSize === "3sm"
                  ? "14px"
                  : 0,
              display: isMeetingDetail ? "none" : "",
            }}
          >
            <InputLabel id="review-topic">리뷰 주제</InputLabel>
            <Select
              labelId="review-topic"
              id="review-topic-select"
              value={topic}
              label="topic"
              onChange={(e) => setTopic(e.target.value)}
              sx={{
                height: "43px",
              }}
            >
              <MenuItem value="all">전체</MenuItem>
              <MenuItem value="정기모임">정기모임</MenuItem>
              <MenuItem value="소모임">소모임</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            fullWidth
            sx={{
              width:
                responsiveSize === "2sm" || responsiveSize === "3sm"
                  ? "100%"
                  : 120,
              marginTop:
                responsiveSize === "2sm" || responsiveSize === "3sm"
                  ? "14px"
                  : 0,
            }}
          >
            <InputLabel id="review-type">리뷰 종류</InputLabel>
            <Select
              labelId="review-type"
              id="review-type-select"
              value={type}
              label="type"
              onChange={(e) => setType(e.target.value)}
              sx={{
                height: "43px",
              }}
            >
              <MenuItem value="사진">사진</MenuItem>
              <MenuItem value="텍스트">텍스트</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="w-full sm:w-auto">
          <FormControl
            fullWidth
            sx={{
              width:
                responsiveSize === "2sm" || responsiveSize === "3sm"
                  ? "100%"
                  : 120,
              marginTop:
                responsiveSize === "2sm" || responsiveSize === "3sm"
                  ? "14px"
                  : 0,
            }}
          >
            <InputLabel id="review-sort">정렬</InputLabel>
            <Select
              labelId="review-sort"
              id="review-sort-select"
              value={sort}
              label="sort"
              onChange={(e) => setSort(e.target.value)}
              sx={{
                height: "43px",
              }}
            >
              <MenuItem value="최신순">최신순</MenuItem>
              <MenuItem value="좋아요순">좋아요순</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <ul className="w-full pt-5 pb-12">
        {filteredDatas?.map((data) => (
          <li
            key={data.reviewId}
            className="w-full py-4 border-b-[1px] border-solid border-[#e1e5e9] text-[#a8aeb7]"
          >
            <div className="flex items-center w-full gap-x-2">
              <img
                className="object-cover w-10 h-10 rounded-full"
                src={data.profileImg}
                alt="profileImg"
              />
              <p>
                <span className="mr-1 font-bold text-text-light-default dark:text-text-dark-default">
                  {data.nickName}
                </span>
                님
              </p>
              <p
                className={`${
                  formatTimeAgo(data.creatingAt) === "방금 전"
                    ? "block"
                    : "hidden"
                } w-5 h-5 bg-[#d15d4d] text-white rounded-full flex justify-center items-center text-[0.75rem]`}
              >
                N
              </p>
              |<p>{formatTimeAgo(data.creatingAt)}</p>
            </div>
            <p className="mt-4 text-[1.1rem] text-text-light-90 dark:text-text-dark-80">
              {data.text}
            </p>

            <div className="flex flex-wrap items-center w-full mt-4 sm:justify-normal 2sm:justify-between gap-x-4">
              {data?.image?.map((img, idx) => (
                <img
                  key={idx}
                  className="object-cover mb-4 rounded-lg sm:w-52 2sm:w-[48%] 3sm:w-full sm:h-52 aspect-square"
                  src={img}
                  alt="reviewImg"
                />
              ))}
            </div>
            <p className="mt-2 text-[0.95rem]">{data?.meeting?.title}</p>

            <div className="flex items-center justify-end w-full mt-5 gap-x-4 sm:mt-0">
              <p>
                {data?.likes?.length === 0
                  ? "첫 번째 좋아요 어때요!?"
                  : `${data?.likes?.length}명이 좋아합니다!`}
              </p>

              <button
                className={`${
                  data?.likes?.find(
                    (like) => like === userData?.kakao_account?.email
                    // (userData?.emailAddresses?.length > 0
                    //   ? userData?.emailAddresses[0]?.value
                    //   : null)
                  )
                    ? "bg-[#dadada] dark:text-text-dark-70"
                    : "bg-transparent dark:text-text-dark-default"
                } flex items-center gap-x-2 border-[1px] border-solid border-[#dadada] rounded-full px-4 py-2 font-bold text-text-light-60 transition-all duration-700`}
                onClick={() => {
                  setReviewDatas((prev) =>
                    prev.map((d) => {
                      if (d.reviewId === data.reviewId) {
                        const userEmail = userData?.kakao_account?.email;
                        // ?? userData?.emailAddresses[0]?.value;
                        if (!d.likes.includes(userEmail)) {
                          return {
                            ...d,
                            likes: [...d.likes, userEmail],
                          };
                        } else {
                          return {
                            ...d,
                            likes: d.likes.filter((like) => like !== userEmail),
                          };
                        }
                      } else if (d.reviewId !== data.reviewId) {
                        return d;
                      }
                    })
                  );
                }}
                disabled={Object.keys(userData).length === 0}
              >
                <CiHeart />
                좋아요
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
