import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate2 } from "../../../common";
import RatingStar from "../../rating/RatingStar";
import { borderStyle } from "../../../common2";
import Button from "../../button/Button";

import { GoChevronDown, GoChevronUp } from "react-icons/go";

export default function RecentCommunityReviewCard({ data }) {
  const navigate = useNavigate();

  const [isDropdown, setIsDrondown] = useState(false);

  return (
    <div
      className={`${borderStyle.basic} box-border relative p-4 mx-2 border-[1px] overflow-hidden text-white bg-center bg-cover rounded-lg text-[0.875rem]`}
      style={{
        backgroundImage: `url(${data.images?.[0]})`,
      }}
    >
      <div className="absolute inset-0 w-full h-full bg-[rgba(0,0,0,0.5)]" />

      <div className="relative z-10 w-full sm:mt-40 mt-52">
        <div className="w-full py-4">
          <RatingStar rating={data.rating} />
          <p className={`${isDropdown ? "" : "line-clamp-1"} mt-2`}>
            {data.text}
          </p>
          <p>{formatDate2(data.createdAt)}</p>
        </div>

        <div
          onClick={() => {
            navigate(`/meeting/detail/${data.meeting.id}`, {
              state: { id: data.meeting.id },
            });
          }}
          className={`${borderStyle.basic} w-full border-t-[1px] py-4 flex items-center gap-x-4 cursor-pointer`}
        >
          <img
            src={data.meeting.thumbnail}
            alt="meeting_thumbnail"
            className="object-cover w-1/5 rounded-lg aspect-square"
          />
          <div className="w-4/5">
            <p className="line-clamp-1">{data.meeting.name}</p>
            <p>
              평점 <span>{data.meeting.averageRating}점</span>
            </p>
            <p>
              리뷰 <span>{data.meeting.reviewCount}개</span>
            </p>
          </div>
        </div>

        <Button
          icon={isDropdown ? <GoChevronUp /> : <GoChevronDown />}
          onClick={() => setIsDrondown((prev) => !prev)}
          styles="block ml-auto text-[1.2rem]"
        />
      </div>
    </div>
  );
}
