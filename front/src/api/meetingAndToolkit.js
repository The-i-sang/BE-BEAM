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

// 툴킷 다운로드 하기
export const fetchDownloadToolkit = async (pdfUrl) => {
  try {
    const res = await axios({
      method: "get",
      url: `https://prod.be-beam.site/api/web/v1/toolkits/download?pdf=${pdfUrl}`,
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "blob",
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching Download Toolkit:", error);
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
  meetingApplyReason
) => {
  try {
    const res = await axios({
      method: "post",
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

// 모임 참여 신청 취소하기
export const fetchCancelMeetingApplyReason = async (accessToken, meetingId) => {
  try {
    const res = await axios({
      method: "delete",
      url: `https://prod.be-beam.site/api/web/v1/meetings/${meetingId}/join`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error("Error Cancel Meeting Apply Reason:", error);
    throw error;
  }
};

// 특정 모임 후기 받아오기 및 필터링
export const oneMeetingReviewFetch = async (accessToken, meetingId, filter) => {
  try {
    const res = await axios({
      method: "get",
      url: `https://prod.be-beam.site/api/web/v1/meetings/${meetingId}/reviews?search=${filter.search}&sort=${filter.sort}&type=${filter.type}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.result;
  } catch (error) {
    console.error("Error fetching One Meeting Review Fetch:", error);
    throw error;
  }
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

    if (meetingImgList.length) {
      meetingImgList.forEach((file) => {
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

// 모임 리뷰 삭제하기
export const fetchDeleteMeetingReview = async (accessToken, reviewId) => {
  try {
    const res = await axios({
      method: "delete",
      url: `https://prod.be-beam.site/api/web/v1/reviews/${reviewId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error("Error Delete Meeting Review:", error);
    throw error;
  }
};

// 모임 리뷰 좋아요 및 취소
export const fetchMeetingReviewLikeOrCancel = async (
  accessToken,
  reviewId,
  method
) => {
  try {
    const res = await axios({
      method: method,
      url: `https://prod.be-beam.site/api/web/v1/reviews/${reviewId}/like`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error("Error Meeting Review Like:", error);
    throw error;
  }
};

// 전체 모임 후기 받아오기 및 필터링
export const MeetingReviewsFetch = async (accessToken, filter) => {
  try {
    const res = await axios({
      method: "get",
      url: `https://prod.be-beam.site/api/web/v1/reviews?search=${filter.search}&sort=${filter.sort}&type=${filter.type}&recruitmentType=${filter.recruitmentType}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.result;
  } catch (error) {
    console.error("Error fetching Meeting Reviews Fetch:", error);
    throw error;
  }
};

// 최신 리뷰 5개 받아오기
export const RecentMeetingReviewsFetch = async () => {
  try {
    const res = await axios({
      method: "get",
      url: `https://prod.be-beam.site/api/web/v1/reviews/recent`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.result;
  } catch (error) {
    console.error("Error fetching Recent Meeting Reviews Fetch:", error);
    throw error;
  }
};
