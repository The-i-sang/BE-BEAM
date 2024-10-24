import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserNecessaryDataState, userState } from "../../../recoil/userState";
import MeetingDetailSmallContent from "./MeetingDetailSmallContent";
import SubTitle from "./SubTitle";
import TextArea from "../../textArea/TextArea";
import WriteRatingStar from "../../rating/WriteRatingStar";
import { MeetingReviewsState } from "../../../recoil/meetingState";
import CommunityReviewsWrap from "../../communityReview/CommunityReviewsWrap";
import { v4 as uuidv4 } from "uuid";

import { FaLocationDot } from "react-icons/fa6";
import {
  BsFillCalendarCheckFill,
  BsPersonFill,
  BsFillCalendarDateFill,
} from "react-icons/bs";
import { ImPriceTag } from "react-icons/im";
import { AiFillPushpin } from "react-icons/ai";
import { GoX } from "react-icons/go";
import { TiCamera } from "react-icons/ti";
import { formatDateAndTime } from "../../../common";

export default function MeetingDetailContent({ data }) {
  const userIn = useRecoilValue(userState);
  const userNecessaryData = useRecoilValue(UserNecessaryDataState);
  const { profileImg, userNickname, userEmail, userRealName } =
    userNecessaryData;
  const [images, setImages] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewDatas, setReviewDatas] = useRecoilState(MeetingReviewsState);
  const [reviewComment, setReviewComment] = useState("");

  const filterReviewData = reviewDatas.filter(
    (review) => review.meeting.id === data?.id
  );

  const handleChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + images.length > 5) {
      alert("최대 5개의 이미지만 업로드할 수 있습니다.");
      return;
    }

    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const addCommunityReview = () => {
    if (!userIn) {
      alert("로그인 후 리뷰를 작성해주세요!");
    } else {
      if (
        filterReviewData.filter((data) => data.userEmail === userEmail)
          .length === 1
      ) {
        alert("리뷰가 이미 작성되었습니다!");
      } else {
        const newReviewData = {
          reviewId: uuidv4(),
          creatingAt: Date.now(),
          profileImg: profileImg,
          name: userRealName,
          nickName: userNickname,
          userEmail: userEmail,
          text: reviewComment,
          image: images,
          rating: rating,
          likes: [],
          meeting: {
            id: data.id,
            type: data.finish_type,
            title: data.name,
            thumbnail: data.thumbnailImage,
            averageRating: 4,
            reviewNum: filterReviewData.length + 1,
          },
        };

        setReviewDatas((prev) => {
          return [...prev, newReviewData];
        });

        alert("리뷰 작성이 완료되었습니다!");
      }
    }

    setImages([]);
    setRating(0);
    setReviewComment("");
  };

  const writeReviewBtnDisabled = !rating || reviewComment === "";

  const price =
    data?.paymentAmount === 0 ? "무료" : `월 ${data?.paymentAmount}원`;

  return (
    <div>
      <div className="w-11/12 sm:max-w-[90%] mx-auto md:mt-16 sm:mt-8 mt-8 sm:mb-12 mb-5 flex md:flex-row sm:flex-col flex-col">
        <img
          className="lg:w-[600px] md:w-[460px] sm:w-full object-cover object-center rounded-lg"
          src={data?.thumbnailImage}
          alt="img"
        />
        <div className="box-border py-5 md:px-10 sm:px-0 sm:py-5">
          <p className="font-semibold">모임의 host, {data?.hostName}</p>
          <p className="mt-2 whitespace-pre-line sm:mt-4">
            {data?.hostDescription}
          </p>
        </div>
      </div>

      <div className="w-full bg-[#f6f6f6] dark:bg-[#191919]">
        <div className="w-11/12 sm:max-w-[90%] mx-auto sm:py-14 pt-5 pb-10 flex flex-col items-start">
          <h1 className="sm:text-[1.5rem] text-[1.2rem] text-[#282828] dark:text-white font-semibold">
            모임소개
          </h1>
          <div className="w-full sm:mt-3 mt-2 flex sm:flex-row flex-col justify-between sm:text-[1rem] text-[0.875rem]">
            <p className="box-border w-full mb-5 md:w-2/5 sm:w-3/5 sm:mb-0 sm:pr-4">
              {data?.introduction}
            </p>
            <img
              className="md:w-[384px] sm:w-[320px] w-full rounded-lg shadow-[24px_22px_10px_-15px_rgba(0,0,0,0.2)]"
              src={data?.thumbnailImage}
              alt="comunity_desc_img"
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
                data?.paymentAmount !== 0
                  ? "입금계좌 : 참가 인원으로 뽑힐시, 토스뱅크 1000-5552-9626(비빔모임용_김성원)으로 입금."
                  : null
              }
            />

            {/*<MeetingDetailSmallContent
              icon={<BsFillCalendarDateFill />}
              subTitle="활동일정"
              des={data.schedules}/>*/}
          </ul>
        </div>
      </div>

      <div className="w-full bg-transparent dark:bg-black relative dark:shadow-[0_35px_60px_-15px_rgba(255,255,255,0.2)]">
        <div className="w-full h-1/2 bg-[#f6f6f6] dark:bg-[#282828] absolute bottom-0 left-0 z-[-999]" />

        <div className="w-11/12 sm:max-w-[90%] mx-auto sm:py-14 pt-5 pb-10 text-[0.9rem] text-[#666]">
          <SubTitle
            title="우리 모임은 이렇게 즐겨요"
            des="사진을 통해서 모임과 한 발자국 더 가까워지기!"
          />

          <ul className="w-full mt-6 sm:mt-8 sm:grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-3 gap-y-3">
            {data?.meetingImages?.map((i, idx) => (
              <li key={idx} className="mb-3 sm:mb-0">
                <img
                  className="object-cover w-full rounded-lg"
                  src={process.env.PUBLIC_URL + i.replace("./", "/")}
                  alt="community_img"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full bg-transparent border-b-[1px] border-solid border-[#d0d0d0] dark:border-[#444]">
        <div className="w-11/12 sm:max-w-[90%] mx-auto sm:py-14 pt-5 pb-10">
          <SubTitle title="안내사항" />

          <ul className="sm:mt-3 mt-1 sm:text-[1rem] text-[0.875rem]">
            {data?.info?.map((i, idx) => (
              <li key={idx}>- {i}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full bg-transparent border-b-[1px] border-solid border-[#d0d0d0] dark:border-[#444]">
        <div className="w-11/12 sm:max-w-[90%] mx-auto sm:py-14 pt-5 pb-10 text-[0.9rem] text-[#666]">
          <SubTitle title="문의사항" des="문의사항은 여기로 보내주세요." />

          <p className="sm:mt-4 mt-2 sm:text-[1rem] text-[0.875rem] text-black dark:text-white">
            문의사항.
          </p>
        </div>
      </div>

      <div className="w-11/12 sm:max-w-[90%] mx-auto sm:py-14 pt-5 pb-10 text-[0.9rem] text-[#666]">
        <SubTitle
          title="비빔 멤버들은 이 모임을 어떻게 생각할까요?"
          des="이 모임에 참여하고 있는 멤버들의 생각 들어다보기:)"
        />

        <div className="flex items-center w-full mt-8 gap-x-5">
          <img
            className="lg:w-[54px] sm:w-[50px] w-[50px] border-[1px] border-solid border-[#ccc] aspect-square object-cover rounded-full"
            src={userIn ? profileImg : "/image/basic_user_profile.jpg"}
            alt="editor_profile_img"
          />

          <div className="w-full">
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleChange}
                  className="hidden"
                />
                <TiCamera className="text-[2rem] text-gray-500" />
                <p>사진 {images?.length}/5</p>
              </label>

              <div className="flex flex-wrap items-center gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Preview ${index}`}
                      className="object-cover w-32 h-32 rounded-lg border-[1px] border-solid border-[#ccc]"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 p-1 text-white text-[1.2rem]"
                    >
                      <GoX />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <WriteRatingStar
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              ratingStyles={{ fontSize: "2rem", marginTop: "20px" }}
              commentStyles="mt-[-10px] mb-2"
            />
            <TextArea
              placeholder="리뷰를 작성해주세요..."
              onChange={(e) => setReviewComment(e.target.value)}
              value={reviewComment}
              styles="border-[#a4a4a4] placeholder:text-[#a4a4a4] dark:bg-transparent dark:text-white"
            />
            <button
              onClick={addCommunityReview}
              className="w-full py-3 bg-[#282828] rounded-lg text-white"
              disabled={writeReviewBtnDisabled}
            >
              리뷰 쓰기
            </button>
          </div>
        </div>

        <CommunityReviewsWrap
          datas={filterReviewData}
          styles="mt-10"
          isMeetingDetail={true}
          setReviewDatas={setReviewDatas}
        />
      </div>
    </div>
  );
}
