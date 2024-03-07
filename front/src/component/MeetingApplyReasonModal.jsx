import React from "react";

import { GoX } from "react-icons/go";
import TextArea from "./TextArea";
import useInput from "../customhook/useInput";
import { meetingApplyReasonState } from "../recoil/contentState";
import Button from "./Button";

export default function MeetingApplyReasonModal({
  meetingApplyReasonModal,
  setMeetingApplyReasonModal,
}) {
  const [meetingApplyReasonInput, onMeetingApplyReasonChange] = useInput(
    meetingApplyReasonState
  );

  return (
    <div
      className={`${
        meetingApplyReasonModal ? "opacity-100 z-[99]" : "opacity-0 z-[-99]"
      } sm:w-[30rem] w-[28rem] h-[24rem] p-6 box-border bg-white drop-shadow-xl border-[1px] border-solid border-[#ccc] rounded-2xl fixed top-[50%] mt-[-12rem] left-[50%] sm:ml-[-15rem] ml-[-14rem] transition-all duration-700`}
    >
      <div className="w-full flex items-center justify-end">
        <button
          onClick={(e) => {
            e.preventDefault();

            setMeetingApplyReasonModal(false);
          }}
          className="w-8 h-8 bg-[#ffc35c] rounded-full flex items-center justify-center text-white text-[1.4rem] hover:[transform:rotateY(360deg)] transition-all duration-700"
        >
          <GoX />
        </button>
      </div>

      <div className="text-center text-[0.8125rem] text-[#9d9d9d]">
        <h1 className="text-[1.625rem] font-semibold text-[#282828]">
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
          buttonText="신청하기"
          disabled={!meetingApplyReasonInput.length > 0}
          buttonDisabledStyle={meetingApplyReasonInput.length === 0}
        />
      </div>
    </div>
  );
}
