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

// base64 string[] => File[] 변환
function base64ToFileArray(base64Array) {
  const files = base64Array.map((base64String, index) => {
    // Base64 문자열에서 메타데이터를 제거
    const [header, data] = base64String.split(",");
    const mimeType = header.match(/:(.*?);/)[1];

    // Base64 문자열을 디코드하여 Blob 객체 생성
    const byteCharacters = atob(data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    // Blob을 File 객체로 변환
    return new File([blob], `image_${index + 1}.png`, { type: mimeType });
  });

  return files;
}

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
      const changeBase64StringToFileArray = base64ToFileArray(
        meetingImgList,
        "profile.jpg"
      );
      formData.append("files", changeBase64StringToFileArray);
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
