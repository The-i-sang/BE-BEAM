import styled, { keyframes } from "styled-components";
import { fadeInRight } from "react-animations";

import { GoX } from "react-icons/go";
import { FaMeetup } from "react-icons/fa6";

const fadeInAnimation = keyframes`${fadeInRight}`;

const FadeInDiv = styled.div`
  animation: 2s ${fadeInAnimation};
`;

export default function MeetingParticipantsModalTop({
  setModalOpen,
  modalOpen,
  data,
}) {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="w-full flex items-center gap-x-3 text-[0.96rem] font-semibold text-[#4e4b4b]">
        <FaMeetup className="text-[2rem] text-[#ffba44] animate-scale" />
        {modalOpen && (
          <FadeInDiv>
            <p>{data.title}</p>
          </FadeInDiv>
        )}
      </div>

      <button
        onClick={() => {
          setModalOpen(false);
        }}
        className="w-8 h-8 bg-[#ffc35c] rounded-full flex items-center justify-center text-white text-[1.4rem] hover:[transform:rotateY(360deg)] transition-all duration-700"
      >
        <GoX />
      </button>
    </div>
  );
}
