import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { MeetingReviewsState } from "../recoil/meetingState.js";
import {
  UserDataState,
  UserNecessaryDataState,
  userState,
} from "../recoil/userState";
import MypageMyProfile from "../component/myPage/MypageMyProfile";
import BasicTab from "../component/myPage/tab/BasicTab.jsx";
import TabSliderContent from "../component/myPage/tab/TabSliderContent";
import Button from "../component/button/Button.jsx";

export default function Mypage() {
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const userIn = useRecoilValue(userState);
  const userNecessaryData = useRecoilValue(UserNecessaryDataState);
  const { userEmail } = userNecessaryData;
  const userData = useRecoilValue(UserDataState);
  console.log(userData);

  const reviewDatas = useRecoilValue(MeetingReviewsState);
  const filterMyReviewDatas = reviewDatas.filter(
    (review) => review.userEmail === userEmail
  );
  const filterMyLikeReviewDatas = reviewDatas.filter((review) =>
    review.likes.includes(userEmail)
  );

  const datas_1 = [
    [
      {
        type: "소모임",
        thumbnail: "/image/activity_img/dining_0.png",
        title: "소셜다이닝 : 이상식탁",
      },
      {
        type: "소모임",
        thumbnail: "/image/activity_img/hiking_0.png",
        title: "운동모임 : 정기산행",
      },
    ],
    [
      {
        type: "정기모임",
        thumbnail: "/image/activity_img/book_0.png",
        title: "독서모임 : 북페어링",
      },
    ],
  ];
  const datas_2 = [
    [
      {
        type: "소모임",
        thumbnail: "/image/activity_img/dining_0.png",
        title: "소셜다이닝 : 이상식탁",
      },
      {
        type: "정기모임",
        thumbnail: "/image/activity_img/book_0.png",
        title: "독서모임 : 북페어링",
      },
      {
        type: "소모임",
        thumbnail: "/image/activity_img/hiking_0.png",
        title: "운동모임 : 정기산행",
      },
    ],
    [
      {
        type: "소모임",
        thumbnail: "/image/activity_img/hiking_0.png",
        title: "운동모임 : 정기산행",
      },
    ],
    [
      {
        type: "소모임",
        thumbnail: "/image/activity_img/dining_0.png",
        title: "소셜다이닝 : 이상식탁",
      },
      {
        type: "정기모임",
        thumbnail: "/image/activity_img/picture_0.png",
        title: "사진출사모임 : 나를 기록하는 사진관",
      },
    ],
  ];
  const datas_3 = [
    filterMyReviewDatas,
    filterMyLikeReviewDatas,
    [
      {
        type: "소모임",
        thumbnail: "/image/activity_img/hiking_0.png",
        title: "운동모임:정기산행 (상시모집)",
      },
    ],
  ];

  // user가 없을시 Mypage에 접근 불가.
  useEffect(() => {
    if (!userIn) {
      navigate("/");
    } else {
      navigate(path);
    }
  }, [userIn, path, navigate]);

  const divStyles = "w-full mt-14";

  return (
    <div className="w-full bg-[#f6f6f6] dark:bg-black">
      <div className="w-11/12 mx-auto pt-[3.75rem] pb-[2rem]">
        <MypageMyProfile userData={userData} />

        <BasicTab
          title="내가 찜한 모임"
          divStyles={divStyles}
          tabTitleList={["찜한 소모임", "찜한 정기모임"]}
        >
          {datas_1.map((data, idx) => (
            <TabSliderContent
              key={idx}
              datas={data}
              tabTitle={["찜한 소모임", "찜한 정기모임"][idx]}
              isLikeBtn={true}
            >
              <Button
                onClick={() => {
                  navigate("/");
                }}
                buttonText="모임 구경하기"
                basicStyle="w-full max-w-[20rem] mt-4"
              />
            </TabSliderContent>
          ))}
        </BasicTab>

        <BasicTab
          title="나의 모임"
          divStyles={divStyles}
          tabTitleList={[
            "참여 중인 모임",
            "내가 개설한 모임",
            "신청 중인 모임",
          ]}
        >
          {datas_2.map((data, idx) => (
            <TabSliderContent
              key={idx}
              datas={data}
              tabTitle={
                ["참여 중인 모임", "내가 개설한 모임", "신청 중인 모임"][idx]
              }
            >
              <Button
                onClick={() => {
                  navigate("/");
                }}
                buttonText="모임 구경하기"
                basicStyle="w-full max-w-[20rem] mt-4"
              />
            </TabSliderContent>
          ))}
        </BasicTab>

        <BasicTab
          title="나의 리뷰"
          divStyles={divStyles}
          tabTitleList={[
            "내가 쓴 리뷰",
            "좋아요 누른 리뷰",
            "리뷰 작성 가능한 모임",
          ]}
        >
          {datas_3.map((data, idx) => (
            <TabSliderContent
              key={idx}
              datas={data}
              tabTitle={
                ["내가 쓴 리뷰", "좋아요 누른 리뷰", "리뷰 작성 가능한 모임"][
                  idx
                ]
              }
              isLikeBtn={idx === 1}
            />
          ))}
        </BasicTab>
      </div>
    </div>
  );
}
