import React, { Fragment, useState } from "react";
import { Tab } from "@headlessui/react";
import TabContent from "./TabContent";

export default function Tabs({ title }) {
  const [tabCount, setTabCount] = useState(0);

  const handleChange = (index) => {
    setTabCount(index);
  };

  return (
    <div className="w-full">
      <Tab.Group onChange={handleChange}>
        <div className="w-full px-[1.25rem] border-b-[1px] border-solid border-[#ddd] dark:border-[#7a7a7a]">
          <Tab.List>
            <Tab as={Fragment}>
              {({ selected }) => (
                /* Use the `selected` state to conditionally style the selected tab. */
                <button
                  className={`${
                    selected
                      ? "border-[#111] dark:border-[#fff] text-[#3f3f3f] dark:text-white font-semibold"
                      : "border-[rgba(0,0,0,0)] text-[#5b5b5b] dark:text-[#939393]"
                  } mr-[1.25rem] py-4 border-b-[2px] border-solid outline-none transition-all duration-700`}
                >
                  {title === "내가 찜한 모임"
                    ? "찜한 소모임"
                    : "참여 중인 모임"}
                </button>
              )}
            </Tab>
            <Tab>
              {({ selected }) => (
                <button
                  className={`${
                    selected
                      ? "border-[#111] text-[#3f3f3f] font-semibold"
                      : "border-[rgba(0,0,0,0)] text-[#5b5b5b]"
                  } mr-[1.25rem] py-4 border-b-[2px] border-solid outline-none transition-all duration-700`}
                >
                  {title === "내가 찜한 모임"
                    ? "찜한 정기모임"
                    : "내가 개설한 모임"}
                </button>
              )}
            </Tab>
            {title === "나의 모임" && (
              <Tab>
                {({ selected }) => (
                  <button
                    className={`${
                      selected
                        ? "border-[#111] text-[#3f3f3f] font-semibold"
                        : "border-[rgba(0,0,0,0)] text-[#5b5b5b]"
                    } py-4 border-b-[2px] border-solid outline-none transition-all duration-700`}
                  >
                    신청 중인 모임
                  </button>
                )}
              </Tab>
            )}
          </Tab.List>
        </div>

        <div className="w-full">
          <Tab.Panels>
            <Tab.Panel>
              <TabContent title={title} tabCount={tabCount} />
            </Tab.Panel>
            <Tab.Panel>
              <TabContent title={title} tabCount={tabCount} />
            </Tab.Panel>
            {title === "나의 모임" && (
              <Tab.Panel>
                <TabContent title={title} tabCount={tabCount} />
              </Tab.Panel>
            )}
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  );
}
