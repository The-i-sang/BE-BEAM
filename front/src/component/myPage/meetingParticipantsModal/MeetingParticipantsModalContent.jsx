import { useMemo, useState } from "react";
import useInputGlobal from "../../../customhook/useInputGlobal";
import { searchNicknameState } from "../../../recoil/contentState";
import SearchInput from "./SearchInput";
import FilteredMenu from "./FilteredMenu";

import {
  CheckboxContainer,
  HiddenCheckbox,
  Icon,
  StyledCheckbox2,
} from "../../../StyledComponents";

export default function MeetingParticipantsModalContent() {
  const [searchNicknameInput, onSearchNicknameChange] =
    useInputGlobal(searchNicknameState);

  const [userData, setUserData] = useState([
    {
      pk: "1",
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
  const postsPerPage = 10;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(userData?.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  const indexOfLastPost = currentPage * postsPerPage; // 3 * 10 = 30
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // 30 - 10 = 20
  const currentPosts = filterData.slice(indexOfFirstPost, indexOfLastPost); // slice(20, 30) => index 20부터 30 전까지

  const [check, setCheck] = useState([]);

  const checkBtnEvent = (pk) => {
    if (check.findIndex((el) => el.title === `check-${pk}`) === -1) {
      setCheck((prev) => [...prev, { title: `check-${pk}`, state: true }]);
    } else {
      setCheck((prev) =>
        prev.map((el) => {
          if (el.title === `check-${pk}`) {
            return { ...el, state: !el.state };
          } else {
            return el;
          }
        })
      );
    }
  };

  return (
    <div className="w-full mt-5">
      <SearchInput
        onSearchNicknameChange={onSearchNicknameChange}
        searchNicknameInput={searchNicknameInput}
      />

      <FilteredMenu
        setFilterName={setFilterName}
        filterName={filterName}
        setFilterCount={setFilterCount}
        filterCount={filterCount}
        filterData={filterData}
        check={check}
        setCheck={setCheck}
        userData={userData}
        setUserData={setUserData}
      />

      <div className="w-full">
        <div className="modalContentScroll2">
          {currentPosts.map((post, index) => (
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
                    onClick={() => {
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
                    onClick={() => {
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
  );
}
