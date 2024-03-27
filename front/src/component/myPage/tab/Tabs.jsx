import { Fragment, useState } from "react";
import { Tab } from "@headlessui/react";
import TabContent from "./TabContent";

export default function Tabs({ title }) {
  const [tabCount, setTabCount] = useState(0);

  const handleChange = (index) => {
    setTabCount(index);
  };

  const selectedStyle = "border-[#111] text-[#3f3f3f] font-semibold";
  const selectedNoneStyle = "border-[rgba(0,0,0,0)] text-[#5b5b5b]";
  const likeMeetingTitle =
    title === "내가 찜한 모임" ? "찜한 소모임" : "참여 중인 모임";
  const myMeetingTitle =
    title === "내가 찜한 모임" ? "찜한 정기모임" : "내가 개설한 모임";

  const likeMeetings = [
    {
      type: "소모임",
      thumbnail: "./image/activity_img/dining_0.png",
      title: "소셜다이닝 : 이상식탁",
    },
    {
      type: "소모임",
      thumbnail: "./image/activity_img/hiking_0.png",
      title: "운동모임:정기산행 (상시모집)",
    },
    {
      type: "정기모임",
      thumbnail: "./image/activity_img/book_0.png",
      title: "독서모임: 북페어링 (상시모집)",
    },
  ];
  const likeSmallMeeting = likeMeetings.filter(
    (data) => data.type === "소모임"
  );
  const likeRegMeeting = likeMeetings.filter(
    (data) => data.type === "정기모임"
  );
  const joinMeetings = [
    {
      type: "정기모임",
      thumbnail: "./image/activity_img/book_0.png",
      title: "독서모임: 북페어링 (상시모집)",
    },
    {
      type: "소모임",
      thumbnail: "./image/activity_img/jogging_0.png",
      title: "운동모임 : 선셋 러닝 (상시모집) (모집중)",
    },
  ];
  const creatingMeetings = [
    {
      type: "정기모임",
      thumbnail: "./image/activity_img/picture_0.png",
      title: "사진출사모임 : 나를 기록하는 사진관 (정기모임) (모집마감)",
    },
  ];
  const applyingMeetings = [
    {
      type: "소모임",
      thumbnail: "./image/activity_img/dining_0.png",
      title: "소셜다이닝 : 이상식탁",
    },
  ];

  return (
    <div className="w-full">
      <Tab.Group onChange={handleChange}>
        <div className="w-full px-[1.25rem] border-b-[1px] border-solid border-[#ddd] dark:border-[#7a7a7a]">
          <Tab.List>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`${
                    selected ? selectedStyle : selectedNoneStyle
                  } mr-[1.25rem] py-4 border-b-[2px] border-solid outline-none transition-all duration-700`}
                >
                  {likeMeetingTitle}
                </button>
              )}
            </Tab>
            <Tab>
              {({ selected }) => (
                <button
                  className={`${
                    selected ? selectedStyle : selectedNoneStyle
                  } mr-[1.25rem] py-4 border-b-[2px] border-solid outline-none transition-all duration-700`}
                >
                  {myMeetingTitle}
                </button>
              )}
            </Tab>
            <Tab>
              {({ selected }) => (
                <button
                  className={`${title === "나의 모임" ? "block" : "hidden"} ${
                    selected ? selectedStyle : selectedNoneStyle
                  } py-4 border-b-[2px] border-solid outline-none transition-all duration-700`}
                >
                  신청 중인 모임
                </button>
              )}
            </Tab>
          </Tab.List>
        </div>

        <div className="w-full">
          <Tab.Panels>
            <Tab.Panel>
              <TabContent
                title={title}
                tabCount={tabCount}
                datas={
                  title === "내가 찜한 모임" ? likeSmallMeeting : joinMeetings
                }
              />
            </Tab.Panel>
            <Tab.Panel>
              <TabContent
                title={title}
                tabCount={tabCount}
                datas={
                  title === "내가 찜한 모임" ? likeRegMeeting : creatingMeetings
                }
              />
            </Tab.Panel>
            <Tab.Panel>
              <TabContent
                className={title === "나의 모임" ? "block" : "hidden"}
                title={title}
                tabCount={tabCount}
                datas={title === "내가 찜한 모임" ? null : applyingMeetings}
              />
            </Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  );
}
