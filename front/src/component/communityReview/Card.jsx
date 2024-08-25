import { useNavigate } from "react-router-dom";
import { formatDate2 } from "../../common";
import RatingStar from "../rating/RatingStar";

export default function Card({ data }) {
  const navigate = useNavigate();

  return (
    <li
      className="box-border relative p-4 mx-2 overflow-hidden text-white bg-center bg-cover rounded-lg text-[0.875rem]"
      style={{
        backgroundImage: `url(${data.image})`,
      }}
    >
      <div className="absolute inset-0 w-full h-full bg-[rgba(0,0,0,0.5)]" />

      <div className="relative z-10 w-full sm:mt-40 mt-52">
        <div className="w-full py-4">
          <RatingStar rating={data.rating} />
          <p className="mt-2 line-clamp-3">{data.text}</p>
          <p>{formatDate2(data.creatingAt)}</p>
        </div>

        <div
          onClick={() => {
            navigate(`/meeting/detail/${data.meeting.id}`, {
              state: { id: data.meeting.id },
            });
          }}
          className="w-full border-t-[1px] border-solid border-[#a0a0a0] py-4 flex items-center gap-x-4 cursor-pointer"
        >
          <img
            src={data.meeting.thumbnail}
            alt="meeting_thumbnail"
            className="object-cover w-1/5 rounded-lg aspect-square"
          />
          <div className="w-4/5">
            <p className="line-clamp-1">{data.meeting.title}</p>
            <p>
              평점 <span>{data.meeting.averageRating}점</span>
            </p>
            <p>
              리뷰 <span>{data.meeting.reviewNum}개</span>
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
