// 실시간 커뮤니티 리뷰 페이지

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { CommunityReviewSlidesToShowState } from "../recoil/contentState";
import { AccessTokenState } from "../recoil/userState";
import {
  MeetingReviewsFetch,
  RecentMeetingReviewsFetch,
} from "../api/meetingAndToolkit";
import { handleConsoleError } from "../common";

import BasicSlider from "../component/slider/BasicSlider";
import RecentCommunityReviewCard from "../component/card/communityReview/RecentCommunityReviewCard";
import TypeWriter from "../component/typeWriter/TypeWriter";
import CommunityReviewsWrap from "../component/communityReview/CommunityReviewsWrap";

import { CiMemoPad } from "react-icons/ci";

export default function CommunityReviews() {
  const slidesToShow = useRecoilValue(CommunityReviewSlidesToShowState);
  const accessToken = useRecoilValue(AccessTokenState);

  const [filter, setFilter] = useState({
    search: "",
    sort: "recent",
    type: "text",
    recruitmentType: "all",
  });
  const [
    meetingReviewDataQueryKeyPostFix,
    setMeetingReviewDataQueryKeyPostFix,
  ] = useState(0);
  const updateMeetingData = () => {
    setMeetingReviewDataQueryKeyPostFix(Date.now());
  };

  const { data: recentMeetingReviewdatas } = useQuery({
    queryKey: ["recentMeetingReviewDatas"],
    queryFn: async () => {
      const result = await RecentMeetingReviewsFetch();
      return result;
    },
  });

  const {
    isLoading,
    error,
    data: meetingReviewdatas,
  } = useQuery({
    queryKey: [
      "meetingReviewDatas",
      accessToken,
      filter,
      meetingReviewDataQueryKeyPostFix,
    ],
    queryFn: async () => {
      const result = await MeetingReviewsFetch(accessToken, filter);
      return result;
    },
  });

  const comment = handleConsoleError(isLoading, error, meetingReviewdatas);

  return (
    <div className="w-full pt-16 dark:bg-black dark:text-white">
      <div className="w-11/12 max-w-[90%] mx-auto">
        <div className="flex flex-col items-center w-full mb-12 lg:mb-28 md:mb-20 sm:mb-12 lg:flex-row lg:justify-between">
          <TypeWriter
            type="Community-Reviews"
            icon={<CiMemoPad />}
            titleFirst="다양한 사람들이"
            titleBack="<br/>다양하게 남긴 모임 후기!"
            subTitleFirst="다양한 사람들이 다양하게 남긴,"
            subTitleBack="찐 모임 후기들을 실시간으로 만나보세요!"
            textColor="text-meeting"
          />
          <img
            className="w-full lg:max-w-[450px] max-w-[600px] aspect-square animate-fadeIn"
            src="image/community_reviews_main_img.png"
            alt="main_img"
          />
        </div>

        <div className="relative w-full">
          <BasicSlider
            slidesToShow={slidesToShow}
            isDots={false}
            prevArrowStyles="top-[40%] left-0 rounded-lg"
            nextArrowStyles="top-[40%] right-0 rounded-lg"
            arrowFontStyles="text-[4rem] text-white"
            isInfinite={recentMeetingReviewdatas?.length >= slidesToShow}
          >
            {recentMeetingReviewdatas?.map((data) => (
              <RecentCommunityReviewCard key={data.reviewId} data={data} />
            ))}
          </BasicSlider>

          <CommunityReviewsWrap
            comment={comment}
            datas={meetingReviewdatas}
            filter={filter}
            setFilter={setFilter}
            accessToken={accessToken}
            updateMeetingData={updateMeetingData}
            styles="mt-10"
          />
        </div>
      </div>
    </div>
  );
}
