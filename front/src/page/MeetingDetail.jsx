import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MeetingApplyReasonModal from "../component/meeting/MeetingDetail/MeetingApplyReasonModal";
import MeetingApplyAndLikeBtnWrap from "../component/meeting/MeetingDetail/MeetingApplyAndLikeBtnWrap";
import MeetingDetailTop from "../component/meeting/MeetingDetail/MeetingDetailTop";
import MeetingDetailContent from "../component/meeting/MeetingDetail/MeetingDetailContent";
import { MeetingAndToolkitDataFetch } from "../api/meetingAndToolkit";

export default function MeetingDetail() {
  const {
    state: { id },
  } = useLocation();

  const [activity, setActivity] = useState({});

  const {
    isLoading,
    error,
    data: datas,
  } = useQuery(["data"], async () => {
    const result = await MeetingAndToolkitDataFetch();
    return result;
  });

  const data = datas?.activities;

  useEffect(() => {
    if (data) setActivity(data?.find((d) => d.id === id));
  }, [data, activity]);

  const comment = isLoading
    ? "Loading..."
    : error
    ? "An error has occurred...!"
    : null;

  const [meetingApplyReasonModal, setMeetingApplyReasonModal] = useState(false);

  return (
    <div className="w-full pt-10 font-light sm:text-[1rem] text-[0.875rem]">
      {comment}

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
