import { useState } from "react";
import { Toast } from "../../toast/Toast";
import AllCheckbox from "./AllCheckbox";

import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
import { CiSliderHorizontal } from "react-icons/ci";
import { PiArrowsDownUpThin } from "react-icons/pi";

export default function FilteredMenu({
  setFilterName,
  filterName,
  setFilterCount,
  filterCount,
  check,
  setCheck,
  userData,
  setUserData,
}) {
  const filterTitle = ["이름", "이메일", "전화번호", "신청일"];

  const [allCheck, setAllCheck] = useState(false);

  const allBtnEvent = () => {
    setAllCheck(!allCheck);

    setCheck((prev) =>
      prev.map((check) => {
        return { ...check, state: !allCheck };
      })
    );
  };

  const peopleLimitCount = 6;
  const remainPeopleLimitCount =
    peopleLimitCount - userData.filter((user) => user.YesOrNo === true).length;

  const checkedIndexs = check.reduce((acc, cur) => {
    if (cur.state) {
      const index = cur.title.split("-")[1];
      acc.push(index);
    }
    return acc;
  }, []);

  return (
    <div className="w-full mt-4 px-[0.625rem] py-3 box-border bg-[#ebebeb] rounded-lg flex items-center text-[0.75rem] text-[#525252]">
      <AllCheckbox allCheck={allCheck} allBtnEvent={allBtnEvent} />

      <div className="w-[95%] flex items-center justify-between gap-x-10">
        <div className="w-[20%] flex items-center gap-x-1">
          <button
            onClick={() => {
              const ischeckedIndexs = checkedIndexs.filter(
                (index) =>
                  !userData[userData.findIndex((data) => data.pk === index)]
                    .YesOrNo
              );

              if (remainPeopleLimitCount >= ischeckedIndexs.length) {
                const newUserData = userData.map((user) => {
                  if (ischeckedIndexs.includes(user.pk)) {
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
                if (checkedIndexs.includes(user.pk)) {
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
