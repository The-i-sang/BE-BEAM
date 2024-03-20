import { useNavigate } from "react-router-dom";

import { BsHeart } from "react-icons/bs";

export default function MeetingApplyAndLikeBtnWrap({
  activity,
  setMeetingApplyReasonModal,
}) {
  const navigate = useNavigate();

  const price = activity.price === 0 ? 0 : activity.price;

  return (
    <div className="w-full fixed bottom-6 left-0 flex justify-center items-center">
      <div className="w-11/12 max-w-[760px] p-4 box-border bg-white border-[1px] border-solid border-[#b0b0b0] rounded-lg flex">
        <div className="mr-[10px] flex-1">
          <h1 className="text-[#282828] font-semibold sm:text-[1rem] text-[0.875rem]">
            월 <span className="sm:text-[1.5rem] text-[1.2rem]">{price}</span>원
          </h1>
          <p className="text-[#999999] sm:text-[1rem] text-[0.875rem]">
            월 {price}원
          </p>
        </div>

        <button
          onClick={() => {
            setMeetingApplyReasonModal(true);
          }}
          className="w-full flex-1 bg-[#282828] rounded-lg round text-white sm:text-[1rem] text-[0.875rem]"
          disabled={activity.state === "모집 마감"}
        >
          <p>{activity.state}</p>
        </button>
        <button className="w-[60px] h-[60px] p-2 box-border ml-[6px] border-[1px] border-solid border-[#b0b0b0] rounded-lg flex flex-col items-center justify-center text-[0.7rem] font-semibold dark:text-black">
          <BsHeart className="text-[1.2rem]" />
          <p className="mt-1 leading-none">찜 0</p>
        </button>
      </div>
    </div>
  );
}
