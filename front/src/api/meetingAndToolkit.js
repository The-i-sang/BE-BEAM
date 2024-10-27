// meeting / toolkit에 관련된 데이터를 받아오는 곳.

import axios from "axios";

export const MeetingAndToolkitDataFetch = async () => {
  const res = await axios({
    method: "get",
    url: `${process.env.PUBLIC_URL}/data/Toolkit.json`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await res.data.items;
  return result;
};

// 모임, 툴킷 데이터 받아오기
export const dataFetch = async (accessToken, detailUrl) => {
  try {
    const res = await axios({
      method: "get",
      url: `https://prod.be-beam.site/api/web/v1/${detailUrl}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.result;
  } catch (error) {
    console.error("Error fetching Data Fetch:", error);
    throw error;
  }
};

// 모임 좋아요 누르기 및 취소
export const fetchMeetingLikeOrCancel = async (
  accessToken,
  meetingId,
  method
) => {
  try {
    const res = await axios({
      method: method,
      url: `https://prod.be-beam.site/api/web/v1/meetings/${meetingId}/like`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error("Error Meeting Like:", error);
    throw error;
  }
};

// 모임 참여 사유 보내기
export const fetchSendMeetingApplyReason = async (
  accessToken,
  meetingId,
  meetingApplyReason,
  method
) => {
  try {
    const res = await axios({
      method: method,
      url: `https://prod.be-beam.site/api/web/v1/meetings/${meetingId}/join`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        joinReason: meetingApplyReason,
      },
    });
  } catch (error) {
    console.error("Error Send Meeting Apply Reason:", error);
    throw error;
  }
};

// 특정 모임 후기 받아오기 및 필터링
export const meetingReviewFetch = async (meetingId, filter) => {
  try {
    const res = await axios({
      method: "get",
      url: `https://prod.be-beam.site/api/web/v1/meetings/${meetingId}/reviews?search=${filter.search}&sort=${filter.sort}&type=${filter.type}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.result.reviews;
  } catch (error) {
    console.error("Error fetching Meeting Review Fetch:", error);
    throw error;
  }
};

// Blob URL[] => File[] 변환
export const convertBlobUrlToFileArray = async (blobUrlArray) => {
  const filePromises = blobUrlArray.map(async (blobUrl) => {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const fileName = blobUrl.split("/").pop().split("#")[0]; // URL에서 파일 이름 추출
    return new File([blob], fileName, { type: blob.type });
  });

  return Promise.all(filePromises);
};

// 모임 후기 생성
export const createMeetingReview = async (
  accessToken,
  meetingId,
  meetingImgList,
  rating,
  text
) => {
  try {
    const formData = new FormData();

    if (meetingImgList) {
      const changeBlobURLToFileArray = await convertBlobUrlToFileArray(
        meetingImgList
      );
      changeBlobURLToFileArray.forEach((file) => {
        formData.append("files", file);
      });
    }

    formData.append(
      "data",
      new Blob(
        [
          JSON.stringify({
            rating: rating,
            text: text,
          }),
        ],
        { type: "application/json" }
      )
    );

    const res = await axios({
      method: "post",
      url: `https://prod.be-beam.site/api/web/v1/meetings/${meetingId}/reviews`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: formData,
    });
    return res.data.result;
  } catch (error) {
    console.error("Error Create Meeting Review:", error);
    throw error;
  }
};
