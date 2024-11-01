import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { formatTimeAgo } from "../../../common";
import {
  editMeetingReview,
  fetchDeleteMeetingReview,
  fetchMeetingReviewLikeOrCancel,
} from "../../../api/meetingAndToolkit";

import Button from "../../button/Button";
import { btnBasicStyle, btnStyle } from "../../../common2";
import RatingStar from "../../rating/RatingStar";
import { Toast } from "../../toast/Toast";
import Input from "../../input/Input";
import WriteRatingStar from "../../rating/WriteRatingStar";

import { CiHeart } from "react-icons/ci";
import { TiCamera } from "react-icons/ti";
import { GoX } from "react-icons/go";

export default function CommunityReviewCard({
  data,
  accessToken,
  updateMeetingData,
}) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(data.text);
  const [rating, setRating] = useState(data.rating);
  const [editImages, setEditImages] = useState([]);
  const [editBlobImages, setEditBlobImages] = useState([]);
  const [noEditImages, setNoEditImages] = useState(data.images);
  const [previewImages, setPreviewImages] = useState(data.images);

  const deleteMeetingReviewMutation = useMutation({
    mutationFn: () => fetchDeleteMeetingReview(accessToken, data.reviewId),
    onSuccess: () => {
      updateMeetingData();
      Toast("리뷰를 삭제하였습니다.");
    },
  });
  const MeetingReviewLikeMutation = useMutation({
    mutationFn: () =>
      fetchMeetingReviewLikeOrCancel(accessToken, data.reviewId, "post"),
    onSuccess: () => {
      updateMeetingData();
      Toast("좋아요를 눌렀습니다.");
    },
  });
  const MeetingReviewLikeCancelMutation = useMutation({
    mutationFn: () =>
      fetchMeetingReviewLikeOrCancel(accessToken, data.reviewId, "delete"),
    onSuccess: () => {
      updateMeetingData();
      Toast("좋아요를 취소하였습니다.");
    },
  });
  const editMeetingReviewMutation = useMutation({
    mutationFn: () =>
      editMeetingReview(
        accessToken,
        data.reviewId,
        rating,
        text,
        noEditImages,
        editImages
      ),
    onSuccess: () => {
      updateMeetingData();
      Toast("리뷰를 수정하였습니다.");
    },
  });

  return (
    <li
      key={data.reviewId}
      className="w-full py-4 border-b-[1px] border-solid border-[#e1e5e9] text-[#a8aeb7]"
    >
      <div
        className={`${edit ? "" : "flex items-center justify-between"} w-full`}
      >
        <div className="flex items-center w-full gap-x-2">
          <img
            className="object-cover w-10 h-10 rounded-full"
            src={data.profileImg}
            alt="editor_profileImg"
          />
          <p>
            <span className="mr-1 font-bold text-text-light-default dark:text-text-dark-default">
              {data.nickname}
            </span>
            님
          </p>
          <p
            className={`${
              formatTimeAgo(data.createdAt) === "방금 전" ? "block" : "hidden"
            } w-5 h-5 bg-[#d15d4d] text-white rounded-full flex justify-center items-center text-[0.75rem]`}
          >
            N
          </p>
          |<p>{formatTimeAgo(data.createdAt)}</p>
        </div>
        {edit ? (
          <div className="w-full">
            <WriteRatingStar
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              ratingStyles={{ fontSize: "2rem", marginTop: "20px" }}
              commentStyles="mt-[-10px] mb-2"
            />
          </div>
        ) : (
          <RatingStar rating={data.rating} />
        )}
      </div>

      {edit ? (
        <Input
          placeholder="수정할 내용을 입력해주세요."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          styles="w-full mt-4 px-4 py-3 text-text-light-90 dark:text-text-dark-80"
        />
      ) : (
        <p className="mt-4 text-[1.1rem] text-text-light-90 dark:text-text-dark-80">
          {data.text}
        </p>
      )}

      {edit ? (
        <div className="flex flex-wrap w-full mt-4 gap-x-4">
          <label className="mt-4 flex flex-col items-center justify-center sm:w-52 2sm:w-[48%] 3sm:w-full sm:h-52 aspect-square border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(event) => {
                const files = Array.from(event.target.files);
                if (files.length + previewImages.length > 10) {
                  alert("최대 10개의 이미지만 업로드할 수 있습니다.");
                  return;
                }

                setEditImages((prev) => [...prev, ...files]);

                const newImages = files.map((file) =>
                  URL.createObjectURL(file)
                );
                setPreviewImages((prevImages) => [...prevImages, ...newImages]);
                setEditBlobImages((prevImages) => [
                  ...prevImages,
                  ...newImages,
                ]);
              }}
              className="hidden"
            />
            <TiCamera className="text-[2rem] text-gray-500" />
            <p>사진 {previewImages?.length}/10</p>
          </label>

          <div className="flex flex-wrap items-center mt-4 sm:justify-normal 2sm:justify-between gap-x-4">
            {previewImages.map((img, idx) => (
              <div key={idx} className="relative">
                <img
                  className="object-cover mb-4 rounded-lg sm:w-52 2sm:w-[48%] 3sm:w-full sm:h-52 aspect-square"
                  src={img}
                  alt="reviewImg"
                />

                <button
                  onClick={() => {
                    setPreviewImages((prev) =>
                      prev.filter((_, index) => index !== idx)
                    );
                    setNoEditImages((prev) =>
                      prev.filter((img) => img !== previewImages[idx])
                    );
                    setEditBlobImages((prev) =>
                      prev.filter((img) => img !== previewImages[idx])
                    );
                    setEditImages((prev) =>
                      prev.filter((_, index2) => {
                        const index = editBlobImages.indexOf(
                          previewImages[idx]
                        );
                        return index2 !== index;
                      })
                    );
                  }}
                  className="absolute top-1 right-1 p-1 text-white text-[1.5rem]"
                >
                  <GoX />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center w-full mt-4 sm:justify-normal 2sm:justify-between gap-x-4">
          {data.images.map((img, idx) => (
            <img
              key={idx}
              className="object-cover mb-4 rounded-lg sm:w-52 2sm:w-[48%] 3sm:w-full sm:h-52 aspect-square"
              src={img}
              alt="reviewImg"
            />
          ))}
        </div>
      )}

      <p className="mt-2 text-[0.95rem]">{data.meeting.name}</p>

      <div className="flex w-full mt-5">
        <div
          className={`${data.myReview ? "" : "hidden"} flex mr-auto gap-x-2`}
        >
          <Button
            buttonText={`${edit ? "수정 완료하기" : "수정하기"}`}
            onClick={() => {
              if (edit) {
                try {
                  editMeetingReviewMutation.mutate();
                } catch (error) {
                  Toast("리뷰 수정을 실패하였습니다.");
                }
                setEdit(false);
              } else {
                setEdit(true);
              }
            }}
            basicStyle={btnBasicStyle.basic}
            styles={`${btnStyle.blackBg} px-4 py-3`}
          />

          <Button
            buttonText="삭제하기"
            onClick={() => {
              if (window.confirm("정말 리뷰를 삭제하시겠습니까?")) {
                try {
                  deleteMeetingReviewMutation.mutate();
                } catch (error) {
                  Toast("리뷰 삭제를 실패하였습니다...😢");
                }
              }
            }}
            basicStyle={btnBasicStyle.basic}
            styles={`${btnStyle.blackBg} ${edit ? "hidden" : ""} px-4 py-3`}
          />
        </div>

        <div className="flex items-center justify-end ml-auto gap-x-4 sm:mt-0">
          <p>
            {data.likesCount === 0
              ? "첫 번째 좋아요 어때요!?"
              : `${data.likesCount}명이 좋아합니다!`}
          </p>

          <Button
            icon={<CiHeart />}
            onClick={() => {
              if (data.liked) {
                MeetingReviewLikeCancelMutation.mutate();
              } else {
                MeetingReviewLikeMutation.mutate();
              }
            }}
            basicStyle={btnBasicStyle.basic}
            styles={`${
              data.liked
                ? "bg-[#dadada] dark:text-text-dark-70"
                : "bg-transparent dark:text-text-dark-default"
            } gap-x-2 border-[1px] border-solid border-[#dadada] rounded-full px-4 py-2 font-bold text-text-light-60 transition-all duration-700`}
          >
            좋아요
          </Button>
        </div>
      </div>
    </li>
  );
}
