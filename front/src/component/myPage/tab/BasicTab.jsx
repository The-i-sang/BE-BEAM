// 기본 Tab. => Tab을 사용하고 싶으면 가져다 사용.

import { Fragment } from "react";
import { Tab } from "@headlessui/react";

export default function BasicTab({ title, divStyles, tabTitleList, children }) {
  const selectedStyle =
    "border-[#111] dark:border-white text-[#3f3f3f] dark:text-white font-semibold";
  const selectedNoneStyle =
    "border-[rgba(0,0,0,0)] text-[#5b5b5b] dark:text-[#b1b1b1]";

  return (
    <div className={`${divStyles} overflow-hidden`}>
      <p className="text-[1.125rem] font-semibold dark:text-white">{title}</p>

      <div className="w-full mt-5 bg-white dark:bg-[rgba(255,255,255,0.2)] rounded-2xl border-[1px] border-solid border-[#ddd] dark:border-[#5b5b5b] overflow-hidden">
        <Tab.Group>
          <div className="w-full px-[1.25rem] border-b-[1px] border-solid border-[#ddd] dark:border-[#7a7a7a]">
            {tabTitleList.map((title, idx) => (
              <Tab as={Fragment} key={idx}>
                {({ selected }) => (
                  <button
                    className={`${selected ? selectedStyle : selectedNoneStyle}
                  mr-[1.25rem] py-4 border-b-[2px] border-solid outline-none transition-all duration-700`}
                  >
                    {title}
                  </button>
                )}
              </Tab>
            ))}
          </div>

          <div className="w-full">{children}</div>
        </Tab.Group>
      </div>
    </div>
  );
}
