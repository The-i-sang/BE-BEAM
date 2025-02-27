import React from "react";

export default function MeetingParticipantsModalSmallContent({
  mobileText,
  text,
  basicStyle,
  smStyle,
}) {
  return (
    <div className={`${basicStyle} ${smStyle}`}>
      <p className="sm:hidden block sm:text-text-light-defualt text-[#939393] font-normal">
        {mobileText}
      </p>
      {text}
    </div>
  );
}
