import React from "react";

import { GoX } from "react-icons/go";
import { FaCircleCheck } from "react-icons/fa6";

import styled, { keyframes } from "styled-components";
import { fadeInRight } from "react-animations";
import Button from "./Button";

const fadeInAnimation = keyframes`${fadeInRight}`;

const FadeInDiv = styled.div`
  animation: 2s ${fadeInAnimation};
`;

export default function PersonalInfoProcessingDetailModal({
  modalOpenIndex,
  checkboxData,
  modalOpen,
  setModalOpen,
  onClick,
}) {
  const data = checkboxData[modalOpenIndex];

  console.log(data);

  return (
    <div
      className={`${
        modalOpen ? "opacity-100 z-[99]" : "opacity-0 z-[-99]"
      } w-[80%] h-[90vh] p-6 box-border bg-white drop-shadow-xl border-[1px] border-solid border-[#ccc] rounded-2xl fixed top-[50%] left-[50%] ml-[-40%] mt-[-45vh] transition-all duration-1000 flex flex-col justify-between`}
    >
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <FaCircleCheck className="text-[1.2rem] text-[#ffba44] animate-scale" />

          {modalOpen && (
            <FadeInDiv>
              <h1>{data.title}</h1>
            </FadeInDiv>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();

            setModalOpen(false);
          }}
          className="w-8 h-8 bg-[#ffc35c] rounded-full flex items-center justify-center text-white text-[1.4rem] hover:[transform:rotateY(360deg)] transition-all duration-700"
        >
          <GoX />
        </button>
      </div>

      <div className="modalContentScroll">
        <p className="whitespace-pre-line text-[0.8rem] text-[#333333]">
          {data.content}
        </p>
      </div>

      <Button
        onClick={(e) => {
          e.preventDefault();
          onClick();

          setModalOpen(false);
        }}
        buttonText="동의하기"
        disabled={false}
      />
    </div>
  );
}
