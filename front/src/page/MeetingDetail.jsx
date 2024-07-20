import { useState } from "react";
import { useLocation } from "react-router-dom";
import MeetingApplyReasonModal from "../component/meeting/MeetingDetail/MeetingApplyReasonModal";
import MeetingApplyAndLikeBtnWrap from "../component/meeting/MeetingDetail/MeetingApplyAndLikeBtnWrap";
import MeetingDetailTop from "../component/meeting/MeetingDetail/MeetingDetailTop";
import MeetingDetailContent from "../component/meeting/MeetingDetail/MeetingDetailContent";

export default function MeetingDetail() {
  const {
    state: { activity },
  } = useLocation();
  console.log(activity);

  const [meetingApplyReasonModal, setMeetingApplyReasonModal] = useState(false);

  return (
    <div className="w-full pt-10 font-light">
      <MeetingDetailTop activity={activity} />

      <MeetingDetailContent activity={activity} />

      <MeetingApplyAndLikeBtnWrap
        activity={activity}
        setMeetingApplyReasonModal={setMeetingApplyReasonModal}
      />

      <MeetingApplyReasonModal
        meetingApplyReasonModal={meetingApplyReasonModal}
        setMeetingApplyReasonModal={setMeetingApplyReasonModal}
      />
    </div>
  );
}
