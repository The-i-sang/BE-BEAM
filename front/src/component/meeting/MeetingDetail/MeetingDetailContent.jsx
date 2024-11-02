import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import {
  UserDataState,
  UserPersonalInfoState,
} from "../../../recoil/userState";
import { oneMeetingReviewFetch } from "../../../api/meetingAndToolkit";
import { formatDateAndTime, handleConsoleError2 } from "../../../common";

import SubTitle from "./SubTitle";
import MeetingDetailSmallContent from "./MeetingDetailSmallContent";
import WriteCommunityReview from "./WriteCommunityReview";
import CommunityReviewsWrap from "../../communityReview/CommunityReviewsWrap";

import { FaLocationDot } from "react-icons/fa6";
import {
  BsFillCalendarCheckFill,
  BsPersonFill,
  BsFillCalendarDateFill,
} from "react-icons/bs";
import { ImPriceTag } from "react-icons/im";

export default function MeetingDetailContent({ data, accessToken }) {
  const userData = useRecoilValue(UserDataState);
  const userPersonalInfo = useRecoilValue(UserPersonalInfoState);

  const [filter, setFilter] = useState({
    search: "",
    sort: "recent",
    type: "text",
  });
  const [
    meetingReviewDataQueryKeyPostFix,
    setMeetingReviewDataQueryKeyPostFix,
  ] = useState(0);
  const updateMeetingData = () => {
    setMeetingReviewDataQueryKeyPostFix(Date.now());
  };

  const price =
    data?.paymentAmount === 0 ? "무료" : `월 ${data?.paymentAmount}원`;

  const {
    isLoading,
    error,
    data: datas,
  } = useQuery({
    queryKey: ["meetingReviewData", filter, meetingReviewDataQueryKeyPostFix],
    queryFn: async () => {
      const result = await oneMeetingReviewFetch(accessToken, data.id, filter);
      return result;
    },
  });
  const comment = handleConsoleError2(isLoading, error, datas);

  console.log(data);

  return (
    <div className="w-full sm:text-[1rem] text-[0.875rem]">
      <div className="w-11/12 sm:max-w-[90%] mx-auto md:mt-16 sm:mt-8 mt-8 sm:mb-12 mb-5 flex md:flex-row sm:flex-col flex-col">
        <img
          className="lg:w-[500px] md:w-[420px] sm:w-full aspect-square object-cover object-center rounded-lg"
          src={data?.hostImage}
          alt="thumbnail"
        />
        <div className="box-border py-5 md:px-10 sm:px-0 sm:py-5">
          <p className="mb-2 font-semibold sm:mb-4">
            🙋🏻‍♂ 모임의 host, {data?.hostName}
          </p>
          <p>{data?.hostDescription}</p>
        </div>
      </div>

      <div className="w-full bg-bg-light-10 dark:bg-bg-dark-90">
        <div className="w-11/12 sm:max-w-[90%] mx-auto sm:py-14 pt-5 pb-10 flex flex-col items-start">
          <h1 className="sm:text-[1.5rem] text-[1.2rem] text-[#282828] dark:text-white font-semibold">
            모임소개
          </h1>
          <div className="flex flex-col justify-between w-full mt-2 sm:mt-3 sm:flex-row">
            <p className="box-border w-full mb-5 md:w-2/5 sm:w-3/5 sm:mb-0 sm:pr-4">
              {data?.introduction}
            </p>
            <img
              className="md:w-[384px] sm:w-[320px] w-full md:h-[384px] sm:h-[320px]  aspect-square object-cover rounded-lg shadow-[24px_22px_10px_-15px_rgba(0,0,0,0.2)]"
              src={data?.thumbnailImage}
              alt="desc_img"
            />
          </div>
        </div>
      </div>

      <div className="w-full border-b-[1px] border-solid border-[#d0d0d0] dark:border-[#444] flex gap-x-10">
        <div className="w-11/12 sm:max-w-[90%] mx-auto sm:py-14 pt-5 pb-10 flex sm:flex-row sm:gap-x-4 flex-col">
          <SubTitle title="모임 상세" />

          <ul className="mt-4 sm:mt-0">
            <MeetingDetailSmallContent
              icon={<FaLocationDot />}
              subTitle={data?.location}
            />

            <MeetingDetailSmallContent
              icon={<BsFillCalendarCheckFill />}
              subTitle={`${formatDateAndTime(data?.meetingDatetime)} 모집 마감`}
            />

            <MeetingDetailSmallContent
              icon={<BsPersonFill />}
              subTitle={`최소 ${data?.minParticipants}명, 최대 ${data?.maxParticipants}명`}
            />

            <MeetingDetailSmallContent
              icon={<ImPriceTag />}
              subTitle={price}
              des={
                data?.paymentAmount !== 0 &&
                "입금계좌 : 참가 인원으로 뽑힐시, 토스뱅크 1000-5552-9626(비빔모임용_김성원)으로 입금."
              }
            />

            <MeetingDetailSmallContent
              icon={<BsFillCalendarDateFill />}
              subTitle="활동일정"
              desList={data?.schedules}
            />
          </ul>
        </div>
      </div>

      <div className="w-full bg-transparent dark:bg-bg-dark-default relative dark:shadow-[0_35px_60px_-15px_rgba(255,255,255,0.2)]">
        <div className="w-full h-1/2 bg-bg-light-10 dark:bg-bg-dark-90 absolute bottom-0 left-0 z-[-999]" />

        <div className="w-11/12 sm:max-w-[90%] mx-auto sm:py-14 pt-5 pb-10 text-[0.9rem]">
          <SubTitle
            title="우리 모임은 이렇게 즐겨요"
            des="사진을 통해서 모임과 한 발자국 더 가까워지기!"
          />

          <ul className="w-full mt-6 sm:mt-8 sm:grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-3 gap-y-3">
            {data?.meetingImages?.map((img, idx) => (
              <li key={idx} className="mb-3 sm:mb-0">
                <img
                  className="object-cover w-full rounded-lg aspect-square"
                  src={img}
                  alt="meeting_img"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full bg-transparent border-b-[1px] border-solid border-bg-light-20 dark:border-[#444]">
        <div className="w-11/12 sm:max-w-[90%] mx-auto sm:py-14 pt-5 pb-10">
          <SubTitle title="안내사항" />

          <ul className="mt-1 sm:mt-3">
            {data?.info?.map((i, idx) => (
              <li key={idx} className="mb-3">
                - {i}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full bg-transparent border-b-[1px] border-solid border-[#d0d0d0] dark:border-bg-dark-70">
        <div className="w-11/12 sm:max-w-[90%] mx-auto sm:py-14 pt-5 pb-10">
          <SubTitle title="문의사항" des="문의사항은 여기로 보내주세요." />

          <p className="mt-2 sm:mt-4">DM(@bebeam_busan), 010-6481-1834</p>
        </div>
      </div>

      <div className="w-11/12 sm:max-w-[90%] mx-auto sm:py-14 pt-5 pb-10">
        <SubTitle
          title="비빔 멤버들은 이 모임을 어떻게 생각할까요?"
          des="이 모임에 참여하고 있는 멤버들의 생각 들어다보기:)"
        />

        <WriteCommunityReview
          userData={userData}
          meetingId={data?.id}
          userPersonalInfo={userPersonalInfo}
          updateMeetingData={updateMeetingData}
        />

        <CommunityReviewsWrap
          comment={comment}
          datas={datas}
          filter={filter}
          setFilter={setFilter}
          accessToken={accessToken}
          updateMeetingData={updateMeetingData}
          styles="mt-10"
          isHidden={true}
        />
      </div>
    </div>
  );
}
