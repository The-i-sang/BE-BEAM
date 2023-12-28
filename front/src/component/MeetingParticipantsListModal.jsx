import React, { useEffect, useState } from "react";
import Input from "./Input";
import useInput from "../customhook/useInput";

import { searchNicknameState } from "../recoil/contentState";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { GoX } from "react-icons/go";
import { FaMeetup } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

import styled, { keyframes } from "styled-components";
import { fadeInRight } from "react-animations";

import { HiddenCheckbox, Icon, StyledCheckbox2 } from "../StyledComponents";
import { MdOutlineAlternateEmail } from "react-icons/md";

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

  // 임시 해당 모임 신청자 리스트
  const [userData, setUserData] = useState([
    {
      name: "홍길동",
      sex: "남성",
      email: "hong@theIsang.com",
      phoneNumber: "010-5124-0540",
      applyDay: "2023-12-01",
      applyDes: "책책책을 읽자",
      YesOrNo: "수락",
    },
    {
      name: "도경수",
      sex: "남성",
      email: "DO@theIsang.com",
      phoneNumber: "010-4270-5821",
      applyDay: "2023-12-02",
      applyDes: "노래가 좋아",
      YesOrNo: "수락",
    },
    {
      name: "강아지",
      sex: "여성",
      email: "DOG@theIsang.com",
      phoneNumber: "010-8859-4444",
      applyDay: "2023-12-11",
      applyDes: "헤헷",
      YesOrNo: "거절",
    },
    {
      name: "사람",
      sex: "여성",
      email: "person@theIsang.com",
      phoneNumber: "010-1720-4875",
      applyDay: "2023-12-11",
      applyDes: "헤헷",
      YesOrNo: "거절",
    },
    {
      name: "어린아이",
      sex: "여성",
      email: "child@theIsang.com",
      phoneNumber: "010-2983-1580",
      applyDay: "2023-12-15",
      applyDes: "헤헷",
      YesOrNo: "거절",
    },
    {
      name: "오리",
      sex: "여성",
      email: "duck@theIsang.com",
      phoneNumber: "010-2158-4320",
      applyDay: "2023-12-18",
      applyDes: "헤헷",
      YesOrNo: "거절",
    },
    {
      name: "하기싫다",
      sex: "여성",
      email: "npppppppp@theIsang.com",
      phoneNumber: "010-1254-1200",
      applyDay: "2023-12-20",
      applyDes: "헤헷",
      YesOrNo: "수락",
    },
    {
      name: "개발자",
      sex: "여성",
      email: "fjdjs@theIsang.com",
      phoneNumber: "010-1500-2700",
      applyDay: "2023-12-20",
      applyDes: "적을 말이 없어요",
      YesOrNo: "수락",
    },
    {
      name: "ㅇㄹㅇㄹㅇㄹㅇㄹ",
      sex: "여성",
      email: "dfdgrgrf@theIsang.com",
      phoneNumber: "010-5453-1557",
      applyDay: "2023-12-21",
      applyDes: "dvrgegefw",
      YesOrNo: "거절",
    },
    {
      name: "외국인",
      sex: "여성",
      email: "wdwefefdx@theIsang.com",
      phoneNumber: "010-7875-1510",
      applyDay: "2023-12-23",
      applyDes: "erknewkreojwl",
      YesOrNo: "거절",
    },
    {
      name: "유승민",
      sex: "여성",
      email: "dnjfht@naver.com",
      phoneNumber: "010-5220-2817",
      applyDay: "2023-12-25",
      applyDes: ".",
      YesOrNo: "수락",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  // 한 페이지당 10개의 리스트를 보여줄 것.
  const postsPerPage = 10;

  // 페이지네이션 버튼
  // userData의 갯수를 10으로 나눠 페이지 계산.
  // ex) useData가 12개일시 페이지네이션 버튼은 1,2 두 개.
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(userData?.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userData?.slice(indexOfFirstPost, indexOfLastPost);
  console.log(currentPosts);

  // 페이지네이션 버튼 클릭 이벤트
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className={`${
        modalOpen ? "opacity-100 z-[99]" : "opacity-0 z-[-99]"
      } w-[80%] h-[96vh] p-6 box-border bg-white drop-shadow-xl border-[1px] border-solid border-[#ccc] rounded-2xl fixed top-[50%] left-[50%] ml-[-40%] mt-[-48vh] transition-all duration-1000`}
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

      <div className="w-full mt-5">
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

        {/* table 위에 filter 따로 추가 */}
        <div className="w-full mt-4 py-2">filter area</div>

        {/* 수락돠어 넘어갈시 수락된 사용자에게 오픈채팅방 링크와 함께 수락되었다는 카톡 전송. */}
        {/* 거절돠어 넘어갈시 거절된 사용자에게 거절되었다는 카톡 전송. */}

        <div className="w-full">
          <div className="modalContentScroll2">
            {currentPosts.map((post, index) => (
              <div
                key={index}
                className="w-full py-3 box-border flex items-center gap-x-2 text-left sm:text-[0.83rem] text-[0.8rem] sm:font-normal font-thin word-break: break-all sm:border-none border-b-[1px] border-solid border-[#dcdcdc]"
              >
                <div className="w-1/12">
                  <HiddenCheckbox type="checkbox" id={`check-${index}`} />
                  <StyledCheckbox2>
                    <Icon viewBox="0 0 24 24" className="scale-75">
                      <polyline points="20 6 9 17 4 12" />
                    </Icon>
                  </StyledCheckbox2>
                </div>
                <div className="w-11/12 flex sm:flex-row flex-col">
                  <div className="sm:w-2/12 flex flex-row sm:mb-0 mb-1">
                    <div className="sm:w-6/12 sm:pr-0 pr-2 sm:font-normal font-semibold text-[0.83rem] ">
                      {post.name}
                    </div>
                    <div className="sm:w-6/12 sm:pl-0 pl-2 sm:border-none border-l-[1px] border-solid border-[#d1d1d1] sm:text-[#000] text-[#c15d5d]">
                      {post.sex}
                    </div>
                  </div>
                  <div className="sm:w-2/12 sm:mb-0 mb-1 flex items-center">
                    <p className="sm:hidden block sm:text-[#000] text-[#939393] font-normal">
                      E :{" "}
                    </p>
                    {post.email}
                  </div>
                  <div className="sm:w-2/12 sm:mb-0 mb-1 flex items-center">
                    <p className="sm:hidden block sm:text-[#000] text-[#939393] font-normal">
                      H.P :{" "}
                    </p>
                    {post.phoneNumber}
                  </div>
                  <div className="sm:w-1/12 sm:mb-0 mb-1 flex items-center">
                    <p className="sm:hidden block sm:text-[#000] text-[#939393] font-normal">
                      신청일 :{" "}
                    </p>
                    {post.applyDay}
                  </div>
                  <div className="sm:w-3/12 sm:bg-transparent sm:my-0 my-2 sm:p-0 p-2 box-border bg-[#ebebeb] rounded-md">
                    <p className="sm:hidden block sm:text-[#000] text-[#939393] font-normal">
                      신청 이유 :{" "}
                    </p>
                    {post.applyDes}
                  </div>
                  <div className="sm:w-1/12 flex items-center">
                    <p className="sm:hidden block sm:text-[#000] text-[#939393] font-normal">
                      수락 여부 :{" "}
                    </p>
                    {post.YesOrNo}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {pageNumbers.map((number) => (
              <button
                onClick={() => paginate(number)}
                className="mx-1 px-3 py-1 border rounded"
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
