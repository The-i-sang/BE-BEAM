import { useRecoilValue } from "recoil";
import { ResponsiveSize } from "../../recoil/contentState";

import SearchInput from "../input/SearchInput";
import BasicSelect from "../select/BasicSelect";
import CommunityReviewCard from "../card/communityReview/CommunityReviewCard";

export default function CommunityReviewsWrap({
  comment,
  datas,
  filter,
  setFilter,
  accessToken,
  updateMeetingData,
  styles,
  isHidden,
}) {
  const responsiveSize = useRecoilValue(ResponsiveSize);

  const reviews = datas?.reviews;
  const reviewsRatingAvg = datas?.ratingAvg ?? 0;
  const reviewsLength = datas?.totalReviewCount ?? 0;

  const satisfaction =
    reviewsRatingAvg > 0 && reviewsRatingAvg < 1
      ? "매우 낮음:("
      : reviewsRatingAvg >= 1 && reviewsRatingAvg < 2
      ? "낮음:("
      : reviewsRatingAvg >= 2 && reviewsRatingAvg < 3
      ? "보통:)"
      : reviewsRatingAvg >= 3 && reviewsRatingAvg < 4
      ? "높음:)"
      : reviewsRatingAvg >= 4
      ? "아주 높음:)"
      : "과연...?";

  const selectStyles = {
    width:
      responsiveSize === "2sm" || responsiveSize === "3sm" ? "100%" : "120px",
    marginTop:
      responsiveSize === "2sm" || responsiveSize === "3sm" ? "14px" : 0,
  };

  return (
    <div
      className={`${styles} w-full border-t-[2px] border-solid border-black`}
    >
      <div className="sm:flex items-center w-full py-5 border-b-[1px] border-solid border-[#e1e5e9]">
        <div className="sm:w-[190px] w-full sm:py-4 pt-3 pb-4 pr-12 box-border flex items-center sm:justify-normal justify-center gap-x-4 text-[3.4rem] font-bold sm:border-r-[2px] sm:border-b-0 border-b-[2px]  border-solid border-[#dadada]">
          <img className="w-12 h-12" src="/../image/star.png" alt="star" />
          <h1>{reviewsRatingAvg}</h1>
        </div>

        <div className="box-border flex flex-col justify-center w-full pt-5 text-center sm:pl-12 sm:pt-0 sm:w-auto sm:text-left">
          <p>
            현재까지
            <span className="ml-1 text-[1.25rem] font-bold">
              {reviewsLength}개의 찐 모임 후기
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

      <div className="w-full py-5 border-b-[1px] border-solid border-[#e1e5e9] flex sm:flex-row flex-col justify-between items-center sm:gap-y-0 gap-y-1">
        <div className="flex flex-col flex-wrap items-center w-full sm:flex-row sm:w-auto gap-x-2 sm:gap-y-0 gap-y-1">
          <SearchInput
            placeholder="검색어를 입력하세요."
            searchText={filter.search}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, search: e.target.value }))
            }
            handleDeleteText={() =>
              setFilter((prev) => ({ ...prev, search: "" }))
            }
            wrapStyle="sm:w-[260px] w-full text-text-light-default dark:text-text-dark-default sm:text-[1rem] text-[0.875rem]"
            inputStyle="sm:px-2 sm:py-2 px-2 py-2 rounded-lg bg-[#f2f2f2] border-white placeholder:text-text-light-20 sm:placeholder:text-[1rem] placeholder:text-[0.875rem]"
            deleteBtnPositionStyles="sm:top-[24%] top-[26%] right-2 sm:text-[1.4rem] text-[1.2rem]"
          />

          <BasicSelect
            id="review-type"
            typeText="리뷰 종류"
            value={filter.type}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, type: e.target.value }))
            }
            datas={[
              { value: "text", title: "텍스트" },
              { value: "image", title: "사진" },
            ]}
            wrapStyle={selectStyles}
          />
          <BasicSelect
            id="meeting-type"
            typeText="모임 종류"
            value={filter.recruitmentType}
            onChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                recruitmentType: e.target.value,
              }))
            }
            datas={[
              { value: "all", title: "전체" },
              { value: "regular", title: "정기모임" },
              { value: "small", title: "소모임" },
            ]}
            wrapStyle={`${isHidden ? "hidden" : ""} ${selectStyles}`}
          />
        </div>

        <div className="w-full sm:w-auto">
          <BasicSelect
            id="review-sort"
            typeText="정렬"
            value={filter.sort}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, sort: e.target.value }))
            }
            datas={[
              { value: "recent", title: "최신순" },
              { value: "likes", title: "좋아요순" },
            ]}
            wrapStyle={selectStyles}
          />
        </div>
      </div>

      {comment}

      <ul className="w-full pt-5 pb-12">
        {reviews?.map((review) => (
          <CommunityReviewCard
            data={review}
            accessToken={accessToken}
            updateMeetingData={updateMeetingData}
          />
        ))}
      </ul>
    </div>
  );
}
