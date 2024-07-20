import TextArea from "../../textArea/TextArea";
import { meetingApplyReasonState } from "../../../recoil/contentState";
import Button from "../../button/Button";
import useInputGlobal from "../../../customhook/useInputGlobal";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import { useEffect } from "react";
import {
  userNameState,
  userPhoneNumberState,
  emailState,
  userBirthdayState,
  userGenderState,
} from "../../../recoil/authState";

import { GoX } from "react-icons/go";
import { Toast } from "../../toast/Toast";

export default function MeetingApplyReasonModal({
  meetingApplyReasonModal,
  setMeetingApplyReasonModal,
}) {
  const userIn = useRecoilValue(userState);
  const userName = useRecoilValue(userNameState);
  const userPhoneNumber = useRecoilValue(userPhoneNumberState);
  const userEmail = useRecoilValue(emailState);
  const userBirthday = useRecoilValue(userBirthdayState);
  const userGender = useRecoilValue(userGenderState);
  const [meetingApplyReasonInput, onMeetingApplyReasonChange] = useInputGlobal(
    meetingApplyReasonState
  );

  useEffect(() => {
    setMeetingApplyReasonModal("");
  }, []);

  return (
    <div
      className={`${
        meetingApplyReasonModal ? "opacity-100 z-[99]" : "opacity-0 z-[-99]"
      } w-11/12 max-w-[760px] p-6 box-border bg-white drop-shadow-xl border-[1px] border-solid border-[#ccc] rounded-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700`}
    >
      <div className="flex items-center justify-end w-full">
        <button
          onClick={() => {
            setMeetingApplyReasonModal(false);
          }}
          className="w-8 h-8 bg-[#ffc35c] rounded-full flex items-center justify-center text-white text-[1.4rem] hover:[transform:rotateY(360deg)] transition-all duration-700"
        >
          <GoX />
        </button>
      </div>

      <div className="text-center text-[0.8125rem] text-[#9d9d9d]">
        <h1 className="text-[1.625rem] font-semibold text-[#838181]">
          모임 신청 이유 작성란
        </h1>

        <p className="mt-2 mb-6">
          모임에 신청하는 이유를 적어주세요.
          <br />
          신청 수락될 시, 확인 알림이 갑니다!
        </p>

        <TextArea
          type="text"
          id="meetingApplyReason"
          placeholder="모임에 참여하려는 이유를 적어주세요."
          onChange={(e) => {
            onMeetingApplyReasonChange(e);
          }}
          value={meetingApplyReasonInput}
        />

        <Button
          type="button"
          buttonText="신청하기"
          onClick={() => {
            if (userIn) {
              if (
                !userName ||
                !userPhoneNumber ||
                !userEmail ||
                !userBirthday ||
                !userGender
              ) {
                Toast(
                  "🍒🍓 먼저 마이페이지에서 개인정보들을 모두 입력해주세요!"
                );
              } else {
                // 데이터 서버로 넘기기
              }
            } else {
              Toast("🍇🍋 먼저 로그인을 진행해주세요!");
            }
          }}
          disabled={meetingApplyReasonInput.length === 0}
          basicStyle="h-auto mt-2"
        />
      </div>
    </div>
  );
}
