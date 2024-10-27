import { formatTimeAgo } from "../../common";

import { CiHeart } from "react-icons/ci";

const isLike = false;

export default function CommunityReviewsWrap2({
  comment,
  datas,
  filter,
  setFilter,
  styles,
}) {
  return (
    <div className={`${styles} w-full`}>
      {comment}

      <ul className="w-full pt-5 pb-12">
        {datas?.map((data) => (
          <li
            key={data.reviewId}
            className="w-full py-4 border-b-[1px] border-solid border-[#e1e5e9] text-[#a8aeb7]"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center w-full gap-x-2">
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  src={data.profileImg}
                  alt="editor_profileImg"
                />
                <p>
                  <span className="mr-1 font-bold text-text-light-default dark:text-text-dark-default">
                    {data.nickname}
                  </span>
                  님
                </p>
                <p
                  className={`${
                    formatTimeAgo(data.createdAt) === "방금 전"
                      ? "block"
                      : "hidden"
                  } w-5 h-5 bg-[#d15d4d] text-white rounded-full flex justify-center items-center text-[0.75rem]`}
                >
                  N
                </p>
                |<p>{formatTimeAgo(data.createdAt)}</p>
              </div>
              <p>{data.rating}</p>
            </div>

            <p className="mt-4 text-[1.1rem] text-text-light-90 dark:text-text-dark-80">
              {data.text}
            </p>

            <div className="flex flex-wrap items-center w-full mt-4 sm:justify-normal 2sm:justify-between gap-x-4">
              {data.images.map((img, idx) => (
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
                {data.likesCount
                  ? "첫 번째 좋아요 어때요!?"
                  : `${data.likesCount}명이 좋아합니다!`}
              </p>

              <button
                className={`${
                  isLike
                    ? "bg-[#dadada] dark:text-text-dark-70"
                    : "bg-transparent dark:text-text-dark-default"
                } flex items-center gap-x-2 border-[1px] border-solid border-[#dadada] rounded-full px-4 py-2 font-bold text-text-light-60 transition-all duration-700`}
                onClick={() => {}}
                disabled={!isLike}
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
