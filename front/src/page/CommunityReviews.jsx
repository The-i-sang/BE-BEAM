// 실시간 커뮤니티 리뷰 페이지
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  CommunityReviewSlidesToShowState,
  ResponsiveSize,
} from "../recoil/contentState";
import SwipeToSlide from "../component/category/SwipeToSlide";
import Card from "../component/communityReview/Card";
import TypeWriter from "../component/typeWriter/TypeWriter";
import SearchInputForm from "../component/input/SearchInputForm";
import useInput from "../customhook/useInput";
import { formatTimeAgo } from "../common";
import { UserDataState } from "../recoil/userState";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { CiMemoPad, CiHeart } from "react-icons/ci";

export default function CommunityReviews() {
  const slidesToShow = useRecoilValue(CommunityReviewSlidesToShowState);
  const responsiveSize = useRecoilValue(ResponsiveSize);
  const userData = useRecoilValue(UserDataState);

  const [filteredDatas, setFilteredDatas] = useState([]);
  const [displaySearchText, onDisplaySearchTextChange, setDisplaySearchText] =
    useInput("");
  const [searchText, _, setSearchText] = useInput("");

  const [topic, setTopic] = useState("all");
  const [type, setType] = useState("텍스트");
  const [sort, setSort] = useState("최신순");

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

  const reviewDatas = useMemo(
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
          averageRating: 5,
          reviewNum: 1,
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
        reviewId: "3323af04-7dfb-446d-b999-0faf329ddf18",
        userEmail: "eoeotjeojo@gmail.com",
        profileImg:
          "https://images.unsplash.com/photo-1516834474-48c0abc2a902?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "이지안",
        nickName: "송강 존잘",
        rating: 4,
        text: "평소 사진 찍는 걸 엄청 좋아하는데 마음에 비해 잘 찍지는 못했거든요... 그런데 여기 나오면서 사진 찍는 거에 대한 자신감이 생겼어요! 그리고 사진 찍는게 엄청 좋아졌답니다 ㅎㅎㅎ 어떻게 해야 사진이 잘 나오는지까지 익혀서 이제 사진 찍히는 것도 좋아한니다! 좋은 추억을 쌓기에 충분하니까 여러분들도 한 번 참여해보세요!",
        image: [],
        creatingAt: 1724321067434,
        likes: ["sdgddgdg@naver.com", "xzxzc@gmail.com", "dnjfht@naver.com"],
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

  const averageRating = (
    reviewDatas.reduce((acc, review) => acc + review.rating, 0) /
    reviewDatas.length
  ).toFixed(1);

  const satisfaction =
    averageRating < 1
      ? "매우 낮음:("
      : averageRating >= 1 && averageRating < 2
      ? "낮음:("
      : averageRating >= 2 && averageRating < 3
      ? "보통:)"
      : averageRating >= 3 && averageRating < 4
      ? "높음:)"
      : averageRating >= 4
      ? "아주 높음:)"
      : null;

  const filterData = useCallback(() => {
    if (!Array.isArray(reviewDatas)) return;

    let filtered = reviewDatas;

    const newFilteredData = filtered.filter((item) => {
      const trimmedSearchTerm = displaySearchText.trim();
      const refinedSearchTerm = displaySearchText
        .replace(/\s+/g, "")
        .toLowerCase();

      const matchesSearch =
        displaySearchText.length > 0 && trimmedSearchTerm === ""
          ? []
          : item.text
              .replace(/\s+/g, "")
              .toLowerCase()
              .includes(refinedSearchTerm);

      const matchesTopic = topic !== "all" ? item.meeting.type === topic : true;
      const matchesType = type === "사진" ? item.image.length > 0 : true;
      return matchesSearch && matchesTopic && matchesType;
    });

    // 정렬 추가
    const sortedData = newFilteredData.sort((a, b) => {
      if (sort === "최신순") {
        return b.creatingAt - a.creatingAt; // 최신순 정렬
      } else if (sort === "좋아요순") {
        return b.likes.length - a.likes.length; // 좋아요순 정렬
      }
      return 0; // 기본값
    });

    setFilteredDatas(sortedData);
  }, [reviewDatas, searchText, topic, type, sort]);

  const handleSearchData = (e) => {
    e.preventDefault();

    setSearchText(displaySearchText);
    filterData();
  };

  useEffect(() => {
    setFilteredDatas(reviewDatas);
  }, [reviewDatas]);

  useEffect(() => {
    filterData();
  }, [filterData]);

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
            <div className="w-full">
              <h1 className="w-full py-2 border-b-[2px] border-solid border-bg-light-90 dark:border-bg-dark-10 text-[1.1rem] font-bold">
                커뮤니티 리뷰
              </h1>

              <div className="sm:flex items-center w-full py-5 border-b-[1px] border-solid border-[#e1e5e9]">
                <div className="sm:w-[190px] w-full sm:py-4 pt-3 pb-4 pr-12 box-border flex items-center sm:justify-normal justify-center gap-x-4 text-[3.4rem] font-bold sm:border-r-[2px] sm:border-b-0 border-b-[2px]  border-solid border-[#dadada]">
                  <img
                    className="w-12 h-12"
                    src={process.env.PUBLIC_URL + "/../image/star.png"}
                    alt="star"
                  />
                  <h1>{averageRating}</h1>
                </div>

                <div className="box-border flex flex-col justify-center w-full pt-5 text-center sm:pl-12 sm:pt-0 sm:w-auto sm:text-left">
                  <p>
                    현재까지
                    <span className="ml-1 text-[1.25rem] font-bold">
                      {reviewDatas.length}개의 찐 모임 후기
                    </span>
                    가 달렸습니다.
                    <br />
                    모임 참여자들의 만족도
                    <span className="ml-1 text-[1.25rem] font-bold text-mainColor">
                      {satisfaction}
                    </span>
                  </p>
                </div>
              </div>

              <div className="w-full py-5 border-b-[1px] border-solid border-[#e1e5e9] sm:flex justify-between items-center">
                <div className="flex flex-wrap items-center w-full sm:w-auto gap-x-2">
                  <SearchInputForm
                    placeholder="검색어를 입력하세요."
                    searchText={displaySearchText}
                    onChange={onDisplaySearchTextChange}
                    setSearchText={setDisplaySearchText}
                    handleSearchData={handleSearchData}
                    formStyle="sm:w-[260px] w-full text-text-light-default dark:text-text-dark-default sm:text-[1rem] text-[0.875rem]"
                    inputStyle="sm:px-2 sm:py-2 px-2 py-2 rounded-lg bg-[#f2f2f2] border-white placeholder:text-text-light-20 sm:placeholder:text-[1rem] placeholder:text-[0.875rem]"
                    deleteBtnStyle="sm:text-[1.4rem] text-[1.2rem] sm:top-[24%] top-[26%] sm:right-10 right-8"
                    searchBtnStyle="sm:text-[1.4rem] text-[1.2rem] sm:right-3 right-2 sm:top-[24%] top-[26%]"
                  />

                  <FormControl
                    fullWidth
                    sx={{
                      width:
                        responsiveSize === "2sm" || responsiveSize === "3sm"
                          ? "100%"
                          : 120,
                      marginTop:
                        responsiveSize === "2sm" || responsiveSize === "3sm"
                          ? "14px"
                          : 0,
                    }}
                  >
                    <InputLabel id="review-topic">리뷰 주제</InputLabel>
                    <Select
                      labelId="review-topic"
                      id="review-topic-select"
                      value={topic}
                      label="topic"
                      onChange={(e) => setTopic(e.target.value)}
                      sx={{
                        height: "43px",
                      }}
                    >
                      <MenuItem value="all">전체</MenuItem>
                      <MenuItem value="정기모임">정기모임</MenuItem>
                      <MenuItem value="소모임">소모임</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl
                    fullWidth
                    sx={{
                      width:
                        responsiveSize === "2sm" || responsiveSize === "3sm"
                          ? "100%"
                          : 120,
                      marginTop:
                        responsiveSize === "2sm" || responsiveSize === "3sm"
                          ? "14px"
                          : 0,
                    }}
                  >
                    <InputLabel id="review-type">리뷰 종류</InputLabel>
                    <Select
                      labelId="review-type"
                      id="review-type-select"
                      value={type}
                      label="type"
                      onChange={(e) => setType(e.target.value)}
                      sx={{
                        height: "43px",
                      }}
                    >
                      <MenuItem value="사진">사진</MenuItem>
                      <MenuItem value="텍스트">텍스트</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className="w-full sm:w-auto">
                  <FormControl
                    fullWidth
                    sx={{
                      width:
                        responsiveSize === "2sm" || responsiveSize === "3sm"
                          ? "100%"
                          : 120,
                      marginTop:
                        responsiveSize === "2sm" || responsiveSize === "3sm"
                          ? "14px"
                          : 0,
                    }}
                  >
                    <InputLabel id="review-sort">정렬</InputLabel>
                    <Select
                      labelId="review-sort"
                      id="review-sort-select"
                      value={sort}
                      label="sort"
                      onChange={(e) => setSort(e.target.value)}
                      sx={{
                        height: "43px",
                      }}
                    >
                      <MenuItem value="최신순">최신순</MenuItem>
                      <MenuItem value="좋아요순">좋아요순</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>

              <ul className="w-full pt-5 pb-12">
                {filteredDatas?.map((data) => (
                  <li
                    key={data.reviewId}
                    className="w-full py-4 border-b-[1px] border-solid border-[#e1e5e9] text-[#a8aeb7]"
                  >
                    <div className="flex items-center w-full gap-x-2">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={data.profileImg}
                        alt="profileImg"
                      />
                      <p>
                        <span className="mr-1 font-bold text-text-light-default dark:text-text-dark-default">
                          {data.nickName}
                        </span>
                        님
                      </p>
                      <p
                        className={`${
                          formatTimeAgo(data.creatingAt) === "방금 전"
                            ? "block"
                            : "hidden"
                        } w-5 h-5 bg-[#d15d4d] text-white rounded-full flex justify-center items-center text-[0.75rem]`}
                      >
                        N
                      </p>
                      |<p>{formatTimeAgo(data.creatingAt)}</p>
                    </div>
                    <p className="mt-4 text-[1.1rem] text-text-light-90 dark:text-text-dark-80">
                      {data.text}
                    </p>

                    <div className="grid items-center w-full grid-cols-1 mt-4 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-3 sm:gap-y-0 gap-y-3">
                      {data?.image?.map((img, idx) => (
                        <img
                          key={idx}
                          className="w-full rounded-lg"
                          src={img}
                          alt="reviewImg"
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-[0.95rem]">
                      {data?.meeting?.title}
                    </p>

                    <div className="flex items-center justify-end w-full mt-5 gap-x-4 sm:mt-0">
                      <p>
                        {data?.likes?.length === 0
                          ? "첫 번째 좋아요 어때요!?"
                          : `${data?.likes?.length}명이 좋아합니다!`}
                      </p>

                      <button
                        className={`${
                          data?.likes?.find(
                            (like) =>
                              like ===
                              (userData?.kakao_account?.email ??
                              userData?.emailAddresses?.length > 0
                                ? userData.emailAddresses[0].value
                                : null)
                          )
                            ? "bg-[#dadada] dark:text-text-dark-70"
                            : "bg-transparent dark:text-text-dark-default"
                        } flex items-center gap-x-2 border-[1px] border-solid border-[#dadada] rounded-full px-4 py-2 font-bold text-text-light-60 transition-all duration-700`}
                        onClick={() => {
                          setFilteredDatas((prev) =>
                            prev.map((d) => {
                              if (d.reviewId === data.reviewId) {
                                const userEmail =
                                  userData?.kakao_account?.email ??
                                  userData?.emailAddresses[0]?.value;
                                if (!d.likes.includes(userEmail)) {
                                  return {
                                    ...d,
                                    likes: [...d.likes, userEmail],
                                  };
                                } else {
                                  return {
                                    ...d,
                                    likes: d.likes.filter(
                                      (like) => like !== userEmail
                                    ),
                                  };
                                }
                              } else if (d.reviewId !== data.reviewId) {
                                return d;
                              }
                            })
                          );
                        }}
                        disabled={Object.keys(userData).length === 0}
                      >
                        <CiHeart />
                        좋아요
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
