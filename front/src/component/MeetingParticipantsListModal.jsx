import React, { useEffect } from "react";
import Input from "./Input";
import useInput from "../customhook/useInput";

import { searchNicknameState } from "../recoil/contentState";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { GoX } from "react-icons/go";
import { FaMeetup } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

import styled, { keyframes } from "styled-components";
import { fadeInRight } from "react-animations";

const fadeInAnimation = keyframes`${fadeInRight}`;

const FadeInDiv = styled.div`
  animation: 2s ${fadeInAnimation};
`;

export default function MeetingParticipantsListModal({
  modalOpen,
  setModalOpen,
  data,
}) {
  const [searchNicknameInput, onSearchNicknameChange] =
    useInput(searchNicknameState);

  return (
    <div
      className={`${
        modalOpen ? "opacity-100 z-[99]" : "opacity-0 z-[-99]"
      } w-[80%] h-[90vh] p-6 box-border bg-white drop-shadow-xl border-[1px] border-solid border-[#ccc] rounded-2xl fixed top-[50%] left-[50%] ml-[-40%] mt-[-45vh] transition-all duration-1000`}
    >
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
          onClick={(e) => {
            e.preventDefault();

            setModalOpen(false);
          }}
          className="w-8 h-8 bg-[#ffc35c] rounded-full flex items-center justify-center text-white text-[1.4rem] hover:[transform:rotateY(360deg)] transition-all duration-700"
        >
          <GoX />
        </button>
      </div>

      <div className="w-full mt-7">
        <div className="w-full relative">
          <Input
            type="text"
            id="search"
            placeholder="검색어를 입력하세요."
            onChange={(e) => {
              onSearchNicknameChange(e);
            }}
            value={searchNicknameInput}
          />
          <CiSearch className="text-[1.4rem] text-[#f58d15] absolute top-[38%] left-4" />
        </div>
        {/* filter가 필요하다면 추후에 추가 */}
      </div>
    </div>
  );
}
