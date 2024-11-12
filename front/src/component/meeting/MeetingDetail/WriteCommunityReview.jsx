import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { AccessTokenState } from "../../../recoil/userState";
import { createMeetingReview } from "../../../api/meetingAndToolkit";

import WriteRatingStar from "../../rating/WriteRatingStar";
import TextArea from "../../textArea/TextArea";
import Button from "../../button/Button";
import { btnBasicStyle, btnStyle } from "../../../common2";
import { Toast } from "../../toast/Toast";

import { TiCamera } from "react-icons/ti";
import { GoX } from "react-icons/go";

export default function WriteCommunityReview({
  userData,
  meetingId,
  updateMeetingData,
  reviewable,
}) {
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const accessToken = useRecoilValue(AccessTokenState);

  const handleChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + images.length > 10) {
      alert("최대 10개의 이미지만 업로드할 수 있습니다.");
      return;
    }

    setImages((prev) => [...prev, ...files]);

    const newImages = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setPreviewImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const createMeetingReviewMutation = useMutation({
    mutationFn: () =>
      createMeetingReview(
        accessToken,
        meetingId,
        images,
        rating,
        reviewComment
      ),
    onSuccess: () => {
      updateMeetingData();
      Toast("리뷰 작성을 완료하였습니다.");

      setImages([]);
      setPreviewImages([]);
      setRating(0);
      setReviewComment("");
    },
  });

  const addCommunityReview = () => {
    if (!reviewable) {
      Toast("리뷰를 작성할 수 있는 대상, 또는 기간이 아닙니다.");

      setImages([]);
      setPreviewImages([]);
      setRating(0);
      setReviewComment("");
    } else {
      try {
        createMeetingReviewMutation.mutate();
      } catch (error) {
        Toast("리뷰 작성을 실패하였습니다.");

        setImages([]);
        setPreviewImages([]);
        setRating(0);
        setReviewComment("");
      }
    }
  };

  const writeReviewBtnDisabled =
    accessToken === "" || !rating || reviewComment === "";

  return (
    <div className="flex items-center w-full mt-8 gap-x-5 text-[0.9rem]">
      <img
        className="lg:w-[54px] sm:w-[50px] w-[50px] border-[1px] border-solid border-[#ccc] aspect-square object-cover rounded-full"
        src={userData?.profileImage ?? "/image/basic_user_profile.jpg"}
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
            <p>사진 {images?.length}/10</p>
          </label>

          <div className="flex flex-wrap items-center gap-4">
            {previewImages.map((image, index) => (
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
        <Button
          buttonText="리뷰 쓰기"
          onClick={addCommunityReview}
          disabled={writeReviewBtnDisabled}
          basicStyle={btnBasicStyle.basic}
          styles="w-full py-3 rounded-lg"
          enableStyles={btnStyle.enableBlackBg}
        />
      </div>
    </div>
  );
}
