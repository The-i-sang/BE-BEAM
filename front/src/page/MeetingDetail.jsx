import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MeetingApplyReasonModal from "../component/meeting/MeetingDetail/MeetingApplyReasonModal";
import MeetingApplyAndLikeBtnWrap from "../component/meeting/MeetingDetail/MeetingApplyAndLikeBtnWrap";
import MeetingDetailTop from "../component/meeting/MeetingDetail/MeetingDetailTop";
import MeetingDetailContent from "../component/meeting/MeetingDetail/MeetingDetailContent";
import { dataFetch } from "../api/meetingAndToolkit";
import { handleConsoleError } from "../common";
import { useRecoilValue } from "recoil";
import { AccessTokenState } from "../recoil/userState";

export default function MeetingDetail() {
  const {
    state: { id },
  } = useLocation();

  const { isLoading, error, data } = useQuery(
    ["meetingDetailData"],
    async () => {
      const result = await dataFetch(accessToken, `meetings/${id}`);
      return result;
    }
  );

  const comment = handleConsoleError(isLoading, error);

  const accessToken = useRecoilValue(AccessTokenState);
  const [meetingApplyReasonModal, setMeetingApplyReasonModal] = useState(false);
  console.log(data);

  return (
    <div className="w-full pt-10 font-light sm:text-[1rem] text-[0.875rem]">
      {comment}

      <MeetingDetailTop data={data} />
      <MeetingDetailContent data={data} />
      <MeetingApplyAndLikeBtnWrap
        data={data}
        accessToken={accessToken}
        setMeetingApplyReasonModal={setMeetingApplyReasonModal}
      />
    </div>
  );
}
