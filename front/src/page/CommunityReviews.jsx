// 실시간 커뮤니티 리뷰 페이지

import { useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { CommunityReviewSlidesToShowState } from "../recoil/contentState";
import { MeetingReviewsState } from "../recoil/meetingState";
import SwipeToSlide from "../component/category/SwipeToSlide";
import Card from "../component/communityReview/Card";
import TypeWriter from "../component/typeWriter/TypeWriter";
import CommunityReviewsWrap from "../component/communityReview/CommunityReviewsWrap";

import { CiMemoPad } from "react-icons/ci";

export default function CommunityReviews() {
  const slidesToShow = useRecoilValue(CommunityReviewSlidesToShowState);
  const [reviewDatas, setReviewDatas] = useRecoilState(MeetingReviewsState);
  const bestReviewDatas = useMemo(
    () => [
      {
        reviewId: "2f239a47-2fec-465c-b02f-b499707a6236",
        userEmail: "tjttjr@naver.com",
        profileImg:
          "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "이한울",
        nickName: "아람쌈쌈 싸무라",
        rating: 5,
        text: "매우 즐거웠어요! 시간 가는 줄 몰르고 즐겼네요 정말... 요즘 코로나라 마음도 뒤숭숭하고 집 밖으로도 자주 못 나갔는데 오랜만에 이렇게 사진도 찍고 예쁜 풍경들 보니까 기분이 너무 좋았어요!XD",
        image: [
          "https://plus.unsplash.com/premium_photo-1718563299826-30c033c31789?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        creatingAt: 1724466015502,
        likes: [
          "dpdrpfflzk@naver.com",
          "dpdrpfflzk@gmail.com",
          "dodo@naver.com",
        ],
        meeting: {
          id: "6a1d506d-4899-4311-a90f-ddd54e99e359",
          type: "정기모임",
          title: "사진출사모임 : 나를 기록하는 사진관 (정기모임) (모집마감)",
          thumbnail: "/image/activity_img/picture_0.png",
          averageRating: 4.5,
          reviewNum: 2,
        },
      },
      {
        reviewId: "96d1974d-59f4-46db-8738-4d7c4ba3e956",
        userEmail: "sferhjy@gmail.com",
        profileImg:
          "https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "조지웅",
        nickName: "토끼는 딸기를 좋아해",
        rating: 3,
        text: "매우 즐거웠어요! 시간 가는 줄 몰르고 즐겼네요 정말... 요즘 코로나라 마음도 뒤숭숭하고 집 밖으로도 자주 못 나갔는데 오랜만에 이렇게 사람들이랑 얘기도 나누고, 맛있는 음식도 먹으니 기분이 너무 좋았어요!XD",
        image: [
          "https://plus.unsplash.com/premium_photo-1673580742890-4af144293960?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        creatingAt: 1724467296928,
        likes: [
          "hfdfd@gmail.com",
          "wrqeqss@naver.com",
          "ehythrg@hanmail.com",
          "dpdrpfflzk@naver.com",
        ],
        meeting: {
          id: "437a4e23-df25-4345-a70a-4d65dfdc06a4",
          type: "소모임",
          title: "소셜다이닝 : 이상식탁",
          thumbnail: "/image/activity_img/dining_0.png",
          averageRating: 3,
          reviewNum: 1,
        },
      },
      {
        reviewId: "b776cfba-74c2-4798-853d-bad4799584dc",
        userEmail: "rrhrh@hanmail.com",
        profileImg:
          "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "유라임",
        nickName: "쥐구",
        rating: 4,
        text: "매우 즐거웠어요! 시간 가는 줄 몰르고 즐겼네요 정말... 요즘 코로나라 마음도 뒤숭숭하고 집 밖으로도 자주 못 나갔는데 오랜만에 이렇게 책도 읽고 사람들이랑 책에 관하여 얘기도 주고 받으니까 기분이 너무 좋았어요!XD",
        image: [
          "https://images.unsplash.com/photo-1419640303358-44f0d27f48e7?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1465929639680-64ee080eb3ed?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        creatingAt: 1724467527207,
        likes: ["dnjfht@gmail.com", "rgegwewsd@naver.com"],
        meeting: {
          id: "8319ee81-e21a-4abb-9f17-876ae19ddd51",
          type: "정기모임",
          title: "독서모임: 북페어링 (상시모집)",
          thumbnail: "/image/activity_img/book_0.png",
          averageRating: 4,
          reviewNum: 1,
        },
      },
      {
        reviewId: "6384df90-fdd3-46c3-b88d-490e56ddbe03",
        userEmail: "edvvdvdvd@gmail.com",
        profileImg:
          "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=1852&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "정구름",
        nickName: "최강 정글러",
        rating: 2,
        text: "매우 즐거웠어요! 시간 가는 줄 몰르고 즐겼네요 정말... 요즘 코로나라 마음도 뒤숭숭하고 집 밖으로도 자주 못 나갔는데 오랜만에 이렇게 사람들이랑 같이 모여서 운동하니까 기분이 너무 좋았어요!XD 특히 끝나고 먹는 막걸리가 크... 최고였습니다!",
        image: [
          "https://plus.unsplash.com/premium_photo-1676464844981-09762ef89491?q=80&w=1950&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        creatingAt: 1724322097434,
        likes: ["rgthyf@hanmail.com"],
        meeting: {
          id: "6c070b2c-f228-4065-b93b-ab3579faaf5e",
          type: "소모임",
          title: "운동모임:정기산행 (상시모집)",
          thumbnail: "/image/activity_img/hiking_0.png",
          averageRating: 2,
          reviewNum: 1,
        },
      },
      {
        reviewId: "200d8293-e3f6-403b-87dd-08418f981216",
        userEmail: "sfsfgf@naver.com",
        profileImg:
          "https://plus.unsplash.com/premium_photo-1676478746739-36954ee805ec?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "장윤지",
        nickName: "치토스 짱",
        rating: 5,
        text: "평소에 운동 부족인데... 이걸 하면 정말 도움이 될까?하고 반신반의로 신청했었답니다... 그런데 막상 해보니 힘들지만 너무 보람차고 기분이 좋네요 ㅎㅎ 다음에 또 신청하겠습니다!",
        image: [
          "https://plus.unsplash.com/premium_photo-1679938885972-180ed418f466?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        creatingAt: 1724022097434,
        likes: [],
        meeting: {
          id: "e799ab56-566d-4b73-b645-816b24f1f7e3",
          type: "소모임",
          title: "운동모임 : 선셋 러닝 (상시모집) (모집중)",
          thumbnail: "/image/activity_img/jogging_0.png",
          averageRating: 5,
          reviewNum: 1,
        },
      },
    ],
    []
  );

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
          <SwipeToSlide slidesToShow={slidesToShow}>
            {bestReviewDatas.map((data) => (
              <Card key={data.reviewId} data={data} />
            ))}
          </SwipeToSlide>

          <div className="w-full mt-10">
            <CommunityReviewsWrap
              datas={reviewDatas}
              setReviewDatas={setReviewDatas}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
