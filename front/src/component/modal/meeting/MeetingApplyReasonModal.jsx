import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { UserPersonalInfoState } from "../../../recoil/userState";
import { fetchSendMeetingApplyReason } from "../../../api/meetingAndToolkit";

import BasicModal from "../../modal/BasicModal";
import Button from "../../button/Button";
import TextArea from "../../textArea/TextArea";
import { Toast } from "../../toast/Toast";
import { isValid } from "../../../common";
import { btnBasicStyle } from "../../../common2";

export default function MeetingApplyReasonModal({
  meetingId,
  accessToken,
  updateMeetingData,
  aboutPaymentsComment,
  meetingApplyReasonModal,
  setMeetingApplyReasonModal,
}) {
  const userPersonalInfo = useRecoilValue(UserPersonalInfoState);
  const [meetingApplyReason, setMeetingApplyReason] = useState("");

  useEffect(() => {
    setMeetingApplyReasonModal("");
  }, []);

  const sendMeetingApplyReasonMutation = useMutation({
    mutationFn: () =>
      fetchSendMeetingApplyReason(
        accessToken,
        meetingId,
        meetingApplyReason,
        "post"
      ),
    onSuccess: () => {
      updateMeetingData();
      Toast("🍒🍓 모임 신청이 완료되었습니다!");
      setMeetingApplyReason("");
      setMeetingApplyReasonModal(false);
    },
  });

  return (
    <BasicModal
      setModal={setMeetingApplyReasonModal}
      wrapStyles={`${
        meetingApplyReasonModal ? "opacity-100 z-[99]" : "opacity-0 z-[-99]"
      }`}
    >
      <div className="text-center text-[0.8125rem] text-[#9d9d9d]">
        <h1 className="text-[1.625rem] font-semibold text-[#838181]">
          모임 신청 이유 작성란
        </h1>

        <p className="mt-2 mb-6">
          모임에 신청하는 이유를 적어주세요.
          <br />
          신청 수락될 시, 확인 알림이 갑니다!
          <br />
          {aboutPaymentsComment}
        </p>

        <TextArea
          type="text"
          id="meetingApplyReason"
          placeholder="모임에 참여하려는 이유를 적어주세요."
          onChange={(e) => setMeetingApplyReason(e.target.value)}
          value={meetingApplyReason}
          styles="mt-2 border-[#f5aa15] placeholder:text-[#F5AA15]"
        />

        <Button
          buttonText="신청하기"
          onClick={async () => {
            if (!isValid(userPersonalInfo)) {
              Toast("🍒🍓 먼저 마이페이지에서 개인정보들을 모두 입력해주세요!");
            } else {
              try {
                sendMeetingApplyReasonMutation.mutate();
              } catch (error) {
                Toast("모임 신청에 실패했습니다. 다시 시도해주세요.😢");
              }
            }
          }}
          basicStyle={btnBasicStyle.basic}
          styles="w-full mt-2 py-3 rounded-lg text-white text-[1rem]"
          enableStyles="bg-[#282828]"
          disabled={!isValid(userPersonalInfo) || meetingApplyReason === ""}
        />
      </div>
    </BasicModal>
  );
}
