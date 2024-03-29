import { useState } from "react";

import {
  CheckboxContainer,
  HiddenCheckbox,
  Icon,
  StyledCheckbox2,
} from "../../../StyledComponents";
import { Toast } from "../../toast/Toast";

import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { CiSliderHorizontal } from "react-icons/ci";
import { PiArrowsDownUpThin } from "react-icons/pi";

export default function FilteredMenu({
  setFilterName,
  filterName,
  setFilterCount,
  filterCount,
  filterData,
  check,
  setCheck,
  userData,
  setUserData,
}) {
  const filterTitle = ["이름", "이메일", "전화번호", "신청일"];

  const [allCheck, setAllCheck] = useState(false);
  const [allCheckCount, setAllCheckCount] = useState(0);

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

  const peopleLimitCount = 6;
  const remainPeopleLimitCount =
    peopleLimitCount - userData.filter((user) => user.YesOrNo === true).length;

  const checkedIndexes = check.reduce((acc, cur) => {
    if (cur.state) {
      const index = cur.title.split("-")[1]; // pk만 잘라내기
      acc.push(index);
    }
    return acc;
  }, []);

  return (
    <div className="w-full mt-4 px-[0.625rem] py-3 box-border bg-[#ebebeb] rounded-lg flex items-center text-[0.75rem] text-[#525252]">
      <div className="w-[5%] flex items-center">
        <CheckboxContainer onClick={allBtnEvent}>
          <HiddenCheckbox type="checkbox" id="all-check" checked={allCheck} />
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
            onClick={() => {
              // [0, 2, 4] index의 체크박스를 체크하여 수락으로 바꾸려고 한다.
              // [0, 2, 4] index의 YesOrNo가 false라면 isCheckedIndexes 배열에 index들을 담아준다.
              // 남은 모임신청 사람수(remainPeopleLimitCount)가 더 isCheckedIndexs 배열의 길이보다 크거나 같으면 useData의 해당 index들의 YesOrNo를 true로 바꿔준다.
              const isCheckedIndexes = checkedIndexes.filter(
                (index) =>
                  !userData[userData.findIndex((data) => data.pk === index)]
                    .YesOrNo
              );

              if (remainPeopleLimitCount >= isCheckedIndexes.length) {
                const newUserData = userData.map((user) => {
                  if (isCheckedIndexes.includes(user.pk)) {
                    return { ...user, YesOrNo: true };
                  }
                  return user;
                });
                setUserData(newUserData);
              } else {
                Toast(`⚠️ ${remainPeopleLimitCount}명 내에서 수락해주세요.`);
              }
            }}
          >
            신청 수락
          </button>
          <p className="text-[#ababab]">/</p>
          <button
            onClick={() => {
              const newUserData = userData.map((user) => {
                if (checkedIndexes.includes(user.pk)) {
                  return { ...user, YesOrNo: false };
                }
                return user;
              });
              setUserData(newUserData);
            }}
          >
            신청 거절
          </button>
        </div>

        {filterTitle.map((filter) => (
          <button
            onClick={() => {
              setFilterName(filter);

              setFilterCount((prev) =>
                prev.map((f) => {
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
              (filterCount.filter((f) => f.name === filterName)[0].count % 2 !==
              0 ? (
                <FaArrowDownLong className="text-[0.75rem] text-[#ffb22d]" />
              ) : (
                <FaArrowUpLong className="text-[0.75rem] text-[#ffb22d]" />
              ))}

            <PiArrowsDownUpThin
              className={`${filter !== filterName ? "block" : "hidden"}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
