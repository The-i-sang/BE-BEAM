import { useEffect, useState } from "react";
import { formatDateAndTime } from "../../../common";

import BasicModal from "../BasicModal";
import Input from "../../input/Input";
import WriteRatingStar from "../../rating/WriteRatingStar";
import { GoX } from "react-icons/go";
import { TiCamera } from "react-icons/ti";
import Button from "../../button/Button";
import { useMutation } from "@tanstack/react-query";
import { editMeetingReview } from "../../../api/meetingAndToolkit";
import { Toast } from "../../toast/Toast";
import { btnBasicStyle, btnStyle } from "../../../common2";

export default function EditMeetingReviewModal({
  accessToken,
  modalOpen,
  setModalOpen,
  data,
  updateMeetingData,
}) {
  console.log(data);

  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [editImages, setEditImages] = useState([]);
  const [editBlobImages, setEditBlobImages] = useState([]);
  const [noEditImages, setNoEditImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (data) {
      setText(data?.text);
      setRating(data?.rating);
      setNoEditImages(data?.images);
      setPreviewImages(data?.images);
    }
  }, [data]);

  console.log(text);

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
      setModalOpen(false);
    },
  });

  return (
    <BasicModal
      setModal={setModalOpen}
      wrapStyles={`${modalOpen ? "opacity-100 z-[99]" : "opacity-0 z-[-99]"}`}
      height="h-[70vh]"
      styles="overflow-y-scroll"
    >
      <p className="mb-3 text-[#a8aeb7]">
        작성 : {formatDateAndTime(data?.createdAt)}
      </p>

      <WriteRatingStar
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
        ratingStyles={{ fontSize: "2rem", marginTop: "-10px" }}
        commentStyles="mt-[-10px] mb-2"
      />

      <Input
        placeholder="수정할 내용을 입력해주세요."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        styles="w-full mt-6 px-4 py-3 text-text-light-90 dark:text-text-dark-80"
      />

      <div className="flex flex-wrap w-full mt-4 gap-x-4">
        <label className="flex flex-col items-center justify-center mt-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer 2sm:w-32 3sm:w-full sm:h-32 aspect-square">
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

              const newImages = files.map((file) => URL.createObjectURL(file));
              setPreviewImages((prevImages) => [...prevImages, ...newImages]);
              setEditBlobImages((prevImages) => [...prevImages, ...newImages]);
            }}
            className="hidden"
          />
          <TiCamera className="text-[2rem] text-gray-500" />
          <p>사진 {previewImages?.length}/10</p>
        </label>

        <div className="flex flex-wrap items-center mt-4 2sm:justify-normal 3sm:justify-between gap-x-4">
          {previewImages?.map((img, idx) => (
            <div key={idx} className="relative">
              <img
                className="object-cover mb-4 rounded-lg 2sm:w-32 3sm:w-full sm:h-32 aspect-square"
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
                      const index = editBlobImages.indexOf(previewImages[idx]);
                      console.log(index);
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

      <Button
        buttonText="수정 완료하기"
        onClick={() => {
          try {
            editMeetingReviewMutation.mutate();
          } catch (error) {
            Toast("리뷰 수정을 실패하였습니다.");
          }
        }}
        basicStyle={btnBasicStyle.basic}
        styles={`${btnStyle.blackBg} w-full py-3`}
      />
    </BasicModal>
  );
}
