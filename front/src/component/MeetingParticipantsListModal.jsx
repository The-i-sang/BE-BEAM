import React from "react";

import { GoX } from "react-icons/go";
import { FaMeetup } from "react-icons/fa6";

export default function MeetingParticipantsListModal({
  modalOpen,
  setModalOpen,
  data,
}) {
  return (
    <div
      className={`${
        modalOpen ? "w-[80%] h-[90vh] opacity-100" : "w-0 h-0 opacity-0"
      } p-6 box-border bg-white drop-shadow-xl border-[1px] border-solid border-[#ccc] rounded-2xl fixed top-[50%] left-[50%] ml-[-40%] mt-[-45vh] z-[99] transition-all duration-700`}
    >
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex items-center gap-x-3 text-[1.06rem]">
          <FaMeetup className="text-[2rem] text-[#ffba44]" />
          <p>{data.title}</p>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();

            setModalOpen(false);
          }}
          className="w-8 h-8 bg-[#ffc35c] rounded-full flex items-center justify-center text-white text-[1.4rem]"
        >
          <GoX />
        </button>
      </div>
    </div>
  );
}
