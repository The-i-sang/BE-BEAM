import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { AccessTokenState } from "../recoil/userState";
import { dataFetch } from "../api/meetingAndToolkit";
import { handleConsoleError } from "../common";

import MeetingDetailTop from "../component/meeting/MeetingDetail/MeetingDetailTop";
import MeetingApplyAndLikeBtnWrap from "../component/meeting/MeetingDetail/MeetingApplyAndLikeBtnWrap";
import MeetingDetailContent from "../component/meeting/MeetingDetail/MeetingDetailContent";
import MeetingApplyReasonModal from "../component/modal/meeting/MeetingApplyReasonModal";

export default function MeetingDetail() {
  const {
    state: { id },
  } = useLocation();

  const accessToken = useRecoilValue(AccessTokenState);
  const [meetingApplyReasonModal, setMeetingApplyReasonModal] = useState(false);
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

  const comment = handleConsoleError(isLoading, error);
  const aboutPaymentsComment =
    data?.paymentAmount !== 0 &&
    `이후에 "토스뱅크 1000-5552-9626"으로 "${data?.paymentAmount}원"을 입금해주시면 됩니다.`;

  return (
    <div className="w-full pt-10 font-light sm:text-[1rem] text-[0.875rem]">
      {comment}

      <MeetingDetailTop data={data} />
      <MeetingDetailContent data={data} />
      <MeetingApplyAndLikeBtnWrap
        data={data}
        accessToken={accessToken}
        updateMeetingData={updateMeetingData}
        setMeetingApplyReasonModal={setMeetingApplyReasonModal}
      />
      <MeetingApplyReasonModal
        accessToken={accessToken}
        meetingId={data?.id}
        updateMeetingData={updateMeetingData}
        aboutPaymentsComment={aboutPaymentsComment}
        meetingApplyReasonModal={meetingApplyReasonModal}
        setMeetingApplyReasonModal={setMeetingApplyReasonModal}
      />
    </div>
  );
}
