import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AccessTokenState } from "../recoil/userState";
import { fetchMypageInfo } from "../api/user.js";
import { handleConsoleError2 } from "../common.js";

import MypageMyProfile from "../component/myPage/MypageMyProfile";
import BasicTab from "../component/tab/BasicTab.jsx";
import TabSliderContent from "../component/tab/TabSliderContent.jsx";
import Button from "../component/button/Button.jsx";
import { btnBasicStyle, btnStyle } from "../common2.js";
import EditMeetingReviewModal from "../component/modal/meeting/EditMeetingReviewModal.jsx";

export default function Mypage() {
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const accessToken = useRecoilValue(AccessTokenState);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [meetingDataQueryKeyPostFix, setMeetingDataQueryKeyPostFix] =
    useState(0);
  const updateMeetingData = () => {
    setMeetingDataQueryKeyPostFix(Date.now());
  };

  const {
    isLoading,
    error,
    data: datas,
  } = useQuery({
    queryKey: ["mypageData", accessToken, meetingDataQueryKeyPostFix],
    queryFn: async () => {
      const result = await fetchMypageInfo(accessToken);
      return result;
    },
  });

  const comment = handleConsoleError2(isLoading, error, datas);
  console.log("mypageDatas", datas);

  // 좋아요 누른 모임
  const myLikedMeetings = [
    datas?.likedMeetings?.regularMeetings,
    datas?.likedMeetings?.smallMeetings,
  ];

  // 나의 모임
  const myMeetings = [
    datas?.myMeetings?.participatingMeetings,
    datas?.myMeetings?.createdMeetings,
    datas?.myMeetings?.appliedMeetings,
  ];

  // 나의 리뷰
  const myReviews = [
    datas?.myReviews?.writtenReviews,
    datas?.myReviews?.likeReviews,
    datas?.myReviews?.reviewableMeetings,
  ];

  useEffect(() => {
    if (accessToken === "") {
      navigate("/");
    } else {
      navigate(path);
    }
  }, [accessToken, path, navigate]);

  const divStyles = "w-full mt-14";

  return (
    <div className="w-full bg-[#f6f6f6] dark:bg-black">
      <div className="w-11/12 mx-auto pt-[3.75rem] pb-[2rem]">
        {comment}

        <MypageMyProfile
          profileImage={datas?.profileImage}
          nickname={datas?.nickname}
          hashtags={datas?.hashtags}
          introduction={datas?.introduction}
        />

        <BasicTab
          title="내가 찜한 모임"
          divStyles={divStyles}
          tabTitleList={["찜한 정기모임", "찜한 소모임"]}
        >
          {myLikedMeetings.map((data, idx) => (
            <TabSliderContent
              key={idx}
              datas={data}
              tabTitle={["찜한 정기모임", "찜한 소모임"][idx]}
              isLikeMeeting={true}
              updateMeetingData={updateMeetingData}
            >
              <Button
                buttonText="모임 구경하기"
                onClick={() => {
                  navigate("/");
                }}
                basicStyle={btnBasicStyle.basic}
                styles={`${btnStyle.blackBg} mt-3 px-5 py-3`}
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
          {myMeetings.map((data, idx) => (
            <TabSliderContent
              key={idx}
              datas={data}
              tabTitle={
                ["참여 중인 모임", "내가 개설한 모임", "신청 중인 모임"][idx]
              }
              isCancelApplication={[false, false, true][idx]}
              updateMeetingData={updateMeetingData}
            >
              <Button
                buttonText="모임 구경하기"
                onClick={() => {
                  navigate("/");
                }}
                basicStyle={btnBasicStyle.basic}
                styles={`${btnStyle.blackBg} mt-3 px-5 py-3`}
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
          {myReviews.map((data, idx) => (
            <TabSliderContent
              key={idx}
              datas={data}
              tabTitle={
                ["내가 쓴 리뷰", "좋아요 누른 리뷰", "리뷰 작성 가능한 모임"][
                  idx
                ]
              }
              isLikeReview={[false, true, false][idx]}
              isDeleteReview={[true, false, false][idx]}
              updateMeetingData={updateMeetingData}
              setModalOpen={setModalOpen}
              setSelectedId={setSelectedId}
            />
          ))}
        </BasicTab>
      </div>

      <EditMeetingReviewModal
        accessToken={accessToken}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        data={datas?.myReviews?.writtenReviews?.find(
          (review) => review?.reviewId === selectedId
        )}
        updateMeetingData={updateMeetingData}
      />
    </div>
  );
}
