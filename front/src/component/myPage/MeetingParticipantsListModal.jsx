import { useMemo, useState } from "react";
import Input from "../input/Input";
import useInputGlobal from "../../customhook/useInputGlobal";
import { fadeInRight } from "react-animations";
import { searchNicknameState } from "../../recoil/contentState";
import styled, { keyframes } from "styled-components";
import {
  CheckboxContainer,
  HiddenCheckbox,
  Icon,
  StyledCheckbox2,
} from "../../StyledComponents";

import { GoX } from "react-icons/go";
import { FaMeetup, FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { CiSearch, CiSliderHorizontal } from "react-icons/ci";
import { PiArrowsDownUpThin } from "react-icons/pi";

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
    useInputGlobal(searchNicknameState);

  // 임시 해당 모임 신청자 리스트
  const [userData, setUserData] = useState([
    {
      pk: "1", // PK = Primary Key
      name: "홍길동",
      sex: "남성",
      email: "hong@theIsang.com",
      phoneNumber: "010-5124-0540",
      applyDay: "2023-12-01",
      applyDes: "책책책을 읽자",
      YesOrNo: false,
    },
    {
      pk: "2",
      name: "도경수",
      sex: "남성",
      email: "DO@theIsang.com",
      phoneNumber: "010-4270-5821",
      applyDay: "2023-12-02",
      applyDes: "노래가 좋아",
      YesOrNo: false,
    },
    {
      pk: "3",
      name: "강아지",
      sex: "여성",
      email: "DOG@theIsang.com",
      phoneNumber: "010-8859-4444",
      applyDay: "2023-12-11",
      applyDes: "헤헷",
      YesOrNo: false,
    },
    {
      pk: "4",
      name: "사람",
      sex: "여성",
      email: "person@theIsang.com",
      phoneNumber: "010-1720-4875",
      applyDay: "2023-12-11",
      applyDes: "헤헷",
      YesOrNo: false,
    },
    {
      pk: "5",
      name: "어린아이",
      sex: "여성",
      email: "child@theIsang.com",
      phoneNumber: "010-2983-1580",
      applyDay: "2023-12-15",
      applyDes: "헤헷",
      YesOrNo: false,
    },
    {
      pk: "6",
      name: "오리",
      sex: "여성",
      email: "duck@theIsang.com",
      phoneNumber: "010-2158-4320",
      applyDay: "2023-12-18",
      applyDes: "헤헷",
      YesOrNo: false,
    },
    {
      pk: "7",
      name: "하기싫다",
      sex: "여성",
      email: "npppppppp@theIsang.com",
      phoneNumber: "010-1254-1200",
      applyDay: "2023-12-20",
      applyDes:
        "다양한 사람들도 만나보고 여러 가지 경험을 해보고 싶어서 지원했습니다.",
      YesOrNo: false,
    },
    {
      pk: "8",
      name: "개발자",
      sex: "여성",
      email: "fjdjs@theIsang.com",
      phoneNumber: "010-1500-2700",
      applyDay: "2023-12-20",
      applyDes: "적을 말이 없어요",
      YesOrNo: false,
    },
    {
      pk: "9",
      name: "ㅇㄹㅇㄹㅇㄹㅇㄹ",
      sex: "여성",
      email: "dfdgrgrf@theIsang.com",
      phoneNumber: "010-5453-1557",
      applyDay: "2023-12-21",
      applyDes: "dvrgegefw",
      YesOrNo: false,
    },
    {
      pk: "10",
      name: "외국인",
      sex: "여성",
      email: "wdwefefdx@theIsang.com",
      phoneNumber: "010-7875-1510",
      applyDay: "2023-12-23",
      applyDes: "erknewkreojwl",
      YesOrNo: false,
    },
    {
      pk: "11",
      name: "유승민",
      sex: "여성",
      email: "dnjfht@naver.com",
      phoneNumber: "010-5220-2817",
      applyDay: "2023-12-25",
      applyDes: ".",
      YesOrNo: false,
    },
    {
      pk: "12",
      name: "아야어여오요",
      sex: "남성",
      email: "arrrrrrrrrrrrrrrrr@naver.com",
      phoneNumber: "010-7800-5903",
      applyDay: "2023-12-27",
      applyDes: "안녕하세요. 꼭 참여하고 싶어요",
      YesOrNo: false,
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

  const filterTitle = ["이름", "이메일", "전화번호", "신청일"];

  const [filterName, setFilterName] = useState("");
  const [filterCount, setFilterCount] = useState([
    { name: "이름", count: 0 },
    { name: "이메일", count: 0 },
    { name: "전화번호", count: 0 },
    { name: "신청일", count: 0 },
  ]);

  const filterData = useMemo(() => {
    let tempData = [...userData];

    const filter = filterCount.find((item) => item.name === filterName);

    if (searchNicknameInput !== "") {
      const regex = new RegExp([...searchNicknameInput].join("\\s*"), "i");
      tempData = tempData.filter((user) => regex.test(user.name));
    } else {
      tempData = [...userData];
    }

    if (filter) {
      const { count } = filter;

      if (count % 2 !== 0) {
        switch (filterName) {
          case "이름":
            tempData.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case "이메일":
            tempData.sort((a, b) => a.email.localeCompare(b.email));
            break;
          case "전화번호":
            tempData.sort(
              (a, b) =>
                a.phoneNumber.replace(/[-.]/g, "") -
                b.phoneNumber.replace(/[-.]/g, "")
            );
            break;
          case "신청일":
            tempData.sort(
              (a, b) =>
                a.applyDay.replace(/[-.]/g, "") -
                b.applyDay.replace(/[-.]/g, "")
            );
            break;
          default:
            break;
        }
      } else {
        switch (filterName) {
          case "이름":
            tempData.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case "이메일":
            tempData.sort((a, b) => b.email.localeCompare(a.email));
            break;
          case "전화번호":
            tempData.sort(
              (a, b) =>
                b.phoneNumber.replace(/[-.]/g, "") -
                a.phoneNumber.replace(/[-.]/g, "")
            );
            break;
          case "신청일":
            tempData.sort(
              (a, b) =>
                b.applyDay.replace(/[-.]/g, "") -
                a.applyDay.replace(/[-.]/g, "")
            );
            break;
          default:
            break;
        }
      }
    }
    return tempData;
  }, [userData, filterName, filterCount, searchNicknameInput]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filterData?.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지네이션 버튼 클릭 이벤트
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 이용 약관 동의 useState
  const [allCheck, setAllCheck] = useState(false);
  const [allCheckCount, setAllCheckCount] = useState(0);
  const [check, setCheck] = useState([]);

  const allBtnEvent = () => {
    setAllCheckCount((prev) => prev + 1);

    if (allCheck === false) {
      setAllCheck(true);

      if (allCheckCount === 0) {
        for (let i = 0; i < filterData?.length; i++) {
          const user = filterData[i];
          if (
            check?.findIndex((el) => el.title === `check-${user.pk}`) === -1
          ) {
            setCheck((prev) => [
              ...prev,
              { title: `check-${user.pk}`, state: true },
            ]);
          }
        }
      } else {
        setCheck((prev) =>
          prev?.map((check) => {
            return { ...check, state: true };
          })
        );
      }
    } else {
      setAllCheck(false);

      setCheck((prev) =>
        prev?.map((check) => {
          return { ...check, state: false };
        })
      );
    }
  };

  const checkBtnEvent = (pk) => {
    if (check?.findIndex((el) => el.title === `check-${pk}`) === -1) {
      setCheck((prev) => [...prev, { title: `check-${pk}`, state: true }]);
    } else {
      setCheck((prev) =>
        prev?.map((el) => {
          if (el.title === `check-${pk}`) {
            return { ...el, state: !el.state };
          } else {
            return el;
          }
        })
      );
    }
  };

  // 신청을 받을 수 있는 인원(임시).
  const peopleLimitCount = 6;
  // 신청을 받을 수 있는 남은 인원.
  const remainPeopleLimitCount =
    peopleLimitCount -
    userData?.filter((user) => user.YesOrNo === true)?.length;

  // 체크박스 상태가 true인 항목의 index를 찾음.
  const checkedIndexes = check?.reduce((acc, cur) => {
    if (cur.state) {
      const index = cur.title.split("-")[1];
      acc.push(index);
    }
    return acc;
  }, []);

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
            placeholder="검색할 닉네임을 입력하세요."
            onChange={(e) => {
              onSearchNicknameChange(e);
            }}
            value={searchNicknameInput}
            basicStyle="placeholder:text-[0.9rem] text-[0.9rem]"
          />
          <CiSearch className="text-[1.4rem] text-[#f58d15] absolute top-[38%] left-4" />
        </div>

        <div className="w-full mt-4 px-[0.625rem] py-3 box-border bg-[#ebebeb] rounded-lg flex items-center text-[0.75rem] text-[#525252]">
          <div className="w-[5%] flex items-center">
            <CheckboxContainer onClick={allBtnEvent}>
              <HiddenCheckbox
                type="checkbox"
                id="all-check"
                checked={allCheck}
              />
              <StyledCheckbox2 checked={allCheck} onChange={allBtnEvent}>
                <Icon viewBox="0 0 24 24" className="scale-75">
                  <polyline points="20 6 9 17 4 12" />
                </Icon>
              </StyledCheckbox2>
            </CheckboxContainer>
          </div>

          <div className="w-[95%] flex items-center justify-between gap-x-10">
            <div className="w-[20%] flex items-center gap-x-1">
              <button
                onClick={(e) => {
                  e.preventDefault();

                  // YesOrNo가 false인 userData의 index만을 가진 새로운 checkedIndexes를 만듦.
                  const isCheckedIndexes = checkedIndexes.filter(
                    (index) =>
                      !userData[
                        userData?.findIndex((data) => data.pk === index)
                      ].YesOrNo
                  );

                  console.log(checkedIndexes, isCheckedIndexes, userData);

                  if (remainPeopleLimitCount >= isCheckedIndexes?.length) {
                    // 체크된 index에 해당하는 userData의 YesOrNo를 true로 변경.
                    const newUserData = userData?.map((user) => {
                      if (isCheckedIndexes.includes(user.pk)) {
                        return { ...user, YesOrNo: true };
                      }
                      return user;
                    });

                    // userData를 업데이트.
                    setUserData(newUserData);
                  } else {
                    alert(`${remainPeopleLimitCount}명 내에서 수락해주세요.`);
                  }
                }}
              >
                신청 수락
              </button>
              <p className="text-[#ababab]">/</p>
              <button
                onClick={(e) => {
                  e.preventDefault();

                  console.log(checkedIndexes);

                  // 체크된 index에 해당하는 userData의 YesOrNo를 true로 변경.
                  const newUserData = userData?.map((user) => {
                    if (checkedIndexes.includes(user.pk)) {
                      return { ...user, YesOrNo: false };
                    }
                    return user;
                  });

                  // userData를 업데이트.
                  setUserData(newUserData);
                }}
              >
                신청 거절
              </button>
            </div>

            {filterTitle?.map((filter) => {
              return (
                <button
                  onClick={(e) => {
                    e.preventDefault();

                    setFilterName(filter);

                    setFilterCount((prev) =>
                      prev?.map((f) => {
                        if (f.name === filter) {
                          return { ...f, count: f.count + 1 };
                        } else {
                          return f;
                        }
                      })
                    );
                  }}
                  className="w-[20%] flex items-center gap-x-4 text-[1rem] text-[#a0a0a0]"
                >
                  <p className="text-[0.8125rem] text-[#707070] font-semibold">
                    {filter}
                  </p>
                  <CiSliderHorizontal />

                  {filter === filterName &&
                  filterCount?.filter((f) => f.name === filterName)[0].count %
                    2 !==
                    0 ? (
                    <FaArrowDownLong className="text-[0.75rem] text-[#ffb22d]" />
                  ) : filter === filterName &&
                    filterCount?.filter((f) => f.name === filterName)[0].count %
                      2 ===
                      0 ? (
                    <FaArrowUpLong className="text-[0.75rem] text-[#ffb22d]" />
                  ) : (
                    <PiArrowsDownUpThin />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 수락돠어 넘어갈시 수락된 사용자에게 수락되었으니 언제까지 입금하라는 알림 / 문자 / 카톡 전송. */}

        <div className="w-full">
          <div className="modalContentScroll2">
            {currentPosts?.map((post, index) => (
              <div
                key={post.pk}
                className="w-full py-3 box-border flex items-center gap-x-1 text-left sm:text-[0.83rem] text-[0.8rem] sm:font-normal font-thin word-break: break-all sm:border-none border-b-[1px] border-solid border-[#dcdcdc]"
              >
                <div className="w-[5%] flex items-center">
                  <CheckboxContainer onClick={() => checkBtnEvent(post.pk)}>
                    <HiddenCheckbox
                      type="checkbox"
                      id={`check-${post.pk}`}
                      checked={
                        check[
                          check?.findIndex(
                            (el) => el.title === `check-${post.pk}`
                          )
                        ]?.state
                      }
                    />
                    <StyledCheckbox2
                      checked={
                        check[
                          check?.findIndex(
                            (el) => el.title === `check-${post.pk}`
                          )
                        ]?.state
                      }
                      onChange={() => checkBtnEvent(post.pk)}
                    >
                      <Icon viewBox="0 0 24 24" className="scale-75">
                        <polyline points="20 6 9 17 4 12" />
                      </Icon>
                    </StyledCheckbox2>
                  </CheckboxContainer>
                </div>
                <div className="w-[95%] flex sm:flex-row flex-col sm:items-center justify-center">
                  <div className="sm:w-[20%] flex flex-row sm:mb-0 mb-1">
                    <div className="sm:w-[70%] sm:pr-0 pr-2 sm:font-normal font-semibold text-[0.83rem] ">
                      {post.name}
                    </div>
                    <div className="sm:w-[30%] sm:pl-0 pl-2 sm:border-none border-l-[1px] border-solid border-[#d1d1d1] sm:text-[#000] text-[#c15d5d]">
                      {post.sex}
                    </div>
                  </div>

                  <div className="sm:w-[15%] sm:mb-0 mb-1 flex items-center">
                    <p className="sm:hidden block sm:text-[#000] text-[#939393] font-normal">
                      E :{" "}
                    </p>
                    {post.email}
                  </div>

                  <div className="sm:w-[12%] sm:mb-0 mb-1 flex items-center">
                    <p className="sm:hidden block sm:text-[#000] text-[#939393] font-normal">
                      H.P :{" "}
                    </p>
                    {post.phoneNumber}
                  </div>

                  <div className="sm:w-[10%] sm:mb-0 mb-1 flex items-center">
                    <p className="sm:hidden block sm:text-[#000] text-[#939393] font-normal">
                      신청일 :{" "}
                    </p>
                    {post.applyDay}
                  </div>

                  <div className="sm:w-[20%] sm:bg-transparent sm:my-0 my-2 sm:p-0 p-2 box-border bg-[#ebebeb] rounded-md">
                    <p className="sm:hidden block sm:text-[#000] text-[#939393] font-normal">
                      신청 이유 :{" "}
                    </p>
                    {post.applyDes}
                  </div>

                  <div className="sm:w-[18%] sm:my-0 my-1 flex sm:flex-col flex-row sm:items-start items-center sm:gap-y-1 gap-x-1 text-[0.75rem]">
                    <button
                      onClick={(e) => {
                        e.preventDefault();

                        console.log(index);

                        setUserData((prev) =>
                          prev?.map((user) => {
                            if (user.pk === post.pk) {
                              return { ...user, YesOrNo: true };
                            } else {
                              return user;
                            }
                          })
                        );
                      }}
                      className="px-4 py-1 box-border border-[1px] border-solid border-[#282828] rounded-sm bg-[#282828] text-white"
                    >
                      신청 수락
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();

                        setUserData((prev) =>
                          prev?.map((user) => {
                            if (user.pk === post.pk) {
                              return { ...user, YesOrNo: false };
                            } else {
                              return user;
                            }
                          })
                        );
                      }}
                      className="px-4 py-1 box-border border-[1px] border-solid border-[#bebebe] rounded-sm"
                    >
                      신청 거절
                    </button>
                  </div>

                  <div className="sm:w-[5%] flex items-center">
                    <p className="sm:hidden block sm:text-[#000] text-[#939393] font-normal">
                      수락 여부 :{" "}
                    </p>
                    {post.YesOrNo === false ? "거절" : "수락"}
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
