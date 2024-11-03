import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { AccessTokenState } from "../recoil/userState";
import { dataFetch } from "../api/meetingAndToolkit";
import { handleConsoleError2 } from "../common";

import MeetingDetailTop from "../component/meeting/MeetingDetail/MeetingDetailTop";
import MeetingApplyAndLikeBtnWrap from "../component/meeting/MeetingDetail/MeetingApplyAndLikeBtnWrap";
import MeetingDetailContent from "../component/meeting/MeetingDetail/MeetingDetailContent";
import MeetingApplyReasonModal from "../component/modal/meeting/MeetingApplyReasonModal";
import MeetingDetailImageModal from "../component/modal/meeting/MeetingDetailImageModal";

export default function MeetingDetail() {
  const pathname = useLocation().pathname;
  const match = pathname.match(/\/detail\/(\d+)/);
  const id = match ? match[1] : null;

  const accessToken = useRecoilValue(AccessTokenState);
  const [meetingApplyReasonModal, setMeetingApplyReasonModal] = useState(false);
  const [detailImageModal, setDetailImageModal] = useState(false);
  const [selectImageIndex, setSelectImageIndex] = useState(0);
  const [meetingDataQueryKeyPostFix, setMeetingDataQueryKeyPostFix] =
    useState(0);
  const updateMeetingData = () => {
    setMeetingDataQueryKeyPostFix(Date.now());
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["meetingDetailData", meetingDataQueryKeyPostFix],
    queryFn: async () => {
      const result = await dataFetch(accessToken, `meetings/${id}`);
      return result;
    },
  });

  const comment = handleConsoleError2(isLoading, error);
  const aboutPaymentsComment =
    data?.paymentAmount !== 0 &&
    `신청 후에 "토스뱅크 1000-5552-9626"으로 "${data?.paymentAmount}원"을 입금해주시면 됩니다.`;

  console.log(data);

  return (
    <div className="w-full pt-6 font-light sm:text-[1rem] text-[0.875rem]">
      {comment}

      <MeetingDetailTop data={data} />
      <MeetingDetailContent
        data={data}
        accessToken={accessToken}
        setDetailImageModal={setDetailImageModal}
        setSelectImageIndex={setSelectImageIndex}
      />
      <MeetingApplyAndLikeBtnWrap
        data={data}
        accessToken={accessToken}
        updateMeetingData={updateMeetingData}
        setMeetingApplyReasonModal={setMeetingApplyReasonModal}
      />

      <MeetingDetailImageModal
        detailImageModal={detailImageModal}
        setDetailImageModal={setDetailImageModal}
        images={data?.meetingImages}
        selectImageIndex={selectImageIndex}
        setSelectImageIndex={setSelectImageIndex}
      />

      <MeetingApplyReasonModal
        accessToken={accessToken}
        meetingId={data?.id}
        updateMeetingData={updateMeetingData}
        aboutPaymentsComment={aboutPaymentsComment}
        meetingApplyReasonModal={meetingApplyReasonModal}
        setMeetingApplyReasonModal={setMeetingApplyReasonModal}
        reviewable={data?.reviewable}
      />
    </div>
  );
}
