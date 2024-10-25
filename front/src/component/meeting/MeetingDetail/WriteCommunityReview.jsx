import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import { MeetingReviewsState } from "../../../recoil/contentState";

import WriteRatingStar from "../../rating/WriteRatingStar";
import TextArea from "../../textArea/TextArea";
import { Toast } from "../../toast/Toast";

import { TiCamera } from "react-icons/ti";
import { GoX } from "react-icons/go";

export default function WriteCommunityReview({ userData, userPersonalInfo }) {
  const [images, setImages] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  const userIn = useRecoilValue(userState);
  const [reviewDatas, setReviewDatas] = useRecoilState(MeetingReviewsState);

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
        // filterReviewData.filter(
        //   (data) => data.userEmail === userPersonalInfo.email
        // ).length === 1
        ""
      ) {
        Toast("리뷰가 이미 작성되었습니다!");
      } else {
        // const newReviewData = {
        //   reviewId: uuidv4(),
        //   creatingAt: Date.now(),
        //   profileImg: userData.profileImage,
        //   name: userPersonalInfo.name,
        //   nickName: userData.nickname,
        //   userEmail: userPersonalInfo.email,
        //   text: reviewComment,
        //   image: images,
        //   rating: rating,
        //   likes: [],
        //   meeting: {
        //     id: data.id,
        //     type: data.finish_type,
        //     title: data.name,
        //     thumbnail: data.thumbnailImage,
        //     averageRating: 4,
        //     reviewNum: filterReviewData.length + 1,
        //   },
        // };

        // setReviewDatas((prev) => {
        //   return [...prev, newReviewData];
        // });

        alert("리뷰 작성이 완료되었습니다!");
      }
    }

    setImages([]);
    setRating(0);
    setReviewComment("");
  };

  const writeReviewBtnDisabled = !rating || reviewComment === "";

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
  );
}
