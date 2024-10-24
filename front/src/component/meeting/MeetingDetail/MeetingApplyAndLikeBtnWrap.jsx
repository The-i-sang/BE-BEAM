import Button from "../../button/Button";
import { btnBasicStyle } from "../../../common2";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { BsHeart, BsHeartFill } from "react-icons/bs";
import { fetchMeetingLikeOrCancel } from "../../../api/meetingAndToolkit";

export default function MeetingApplyAndLikeBtnWrap({
  data,
  accessToken,
  setMeetingApplyReasonModal,
}) {
  const queryClient = useQueryClient();
  const { mutate: meetingDetailPageLikeOrCancelMutate } = useMutation(
    async () =>
      await fetchMeetingLikeOrCancel(
        accessToken,
        data.id,
        data?.liked ? "delete" : "post"
      )
  );

  const price = data?.paymentAmount === 0 ? "무료" : data?.paymentAmount + "원";

  return (
    <div className="fixed left-0 flex items-center justify-center w-full bottom-6">
      <div className="w-11/12 max-w-[760px] p-4 box-border bg-white border-[1px] border-solid border-[#b0b0b0] rounded-lg flex">
        <div className="mr-[10px] flex-1">
          <h1 className="text-[#282828] font-semibold sm:text-[1rem] text-[0.875rem]">
            월 <span className="sm:text-[1.5rem] text-[1.2rem]">{price}</span>
          </h1>
          <p className="text-[#999999] sm:text-[1rem] text-[0.875rem]">
            월 {price}
          </p>
        </div>

        <Button
          buttonText={data?.state}
          onClick={() => setMeetingApplyReasonModal(true)}
          basicStyle={btnBasicStyle.basic}
          styles="w-full flex-1 rounded-lg sm:text-[1rem] text-[0.875rem]"
          enableStyles="bg-[#282828] text-white"
          disabled={data?.state === "모집완료"}
        />
        <Button
          icon={data?.liked ? <BsHeartFill /> : <BsHeart />}
          onClick={() =>
            meetingDetailPageLikeOrCancelMutate({
              onSuccess: () => {
                return queryClient.invalidateQueries(["meetingDetailData"]);
              },
              onError: (err) => {
                console.log(err);
              },
            })
          }
          basicStyle={btnBasicStyle.border}
          styles="w-[60px] h-[60px] p-2 ml-[6px] border-[1px] border-[#b0b0b0] rounded-lg flex-col gap-y-[2px] text-[1.2rem] font-semibold text-black"
        >
          <p className="text-[0.7rem]">찜 {data?.likesCount}</p>
        </Button>
      </div>
    </div>
  );
}
