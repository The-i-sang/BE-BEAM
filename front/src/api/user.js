// kakao

import axios from "axios";
import { changePhoneNumberRepresentation } from "../common";

// 쿠키를 토큰으로 변경하기
export const changeCookieToToken = async () => {
  try {
    const res = await axios({
      method: "get",
      url: "https://prod.be-beam.site/web/oauth2-jwt-header",
      withCredentials: true,
    });
    return res.data.result;
  } catch (error) {
    console.error("Error fetching JWT header:", error);
    throw error;
  }
};

// 프로필 가져오기
export const getUserProfile = async (accessToken) => {
  try {
    const res = await axios({
      method: "get",
      url: "https://prod.be-beam.site/api/web/v1/users/my-profile",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.result;
  } catch (error) {
    console.error("Error fetching User Profile:", error);
    throw error;
  }
};

const base64ToFile = (base64, filename) => {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

// 프로필 수정
export const editUserProfile = async (
  accessToken,
  newProfileImage,
  nickname,
  description
) => {
  try {
    const formData = new FormData();

    if (newProfileImage) {
      const changeBase64StringToFile = base64ToFile(
        newProfileImage,
        "profile.jpg"
      );
      formData.append("profileImage", changeBase64StringToFile);
    }

    formData.append(
      "data",
      new Blob(
        [
          JSON.stringify({
            nickname: nickname,
            introduction: description,
          }),
        ],
        { type: "application/json" }
      )
    );

    const res = await axios({
      method: "patch",
      url: "https://prod.be-beam.site/api/web/v1/users/my-profile",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: formData,
    });
    return res.data.result;
  } catch (error) {
    console.error("Error Edit User Profile:", error);
    throw error;
  }
};

// 개인정보 가져오기
export const getUserPersonalInfo = async (accessToken) => {
  try {
    const res = await axios({
      method: "get",
      url: "https://prod.be-beam.site/api/web/v1/users/my-info",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.result;
  } catch (error) {
    console.error("Error fetching User Personal Information:", error);
    throw error;
  }
};

// 개인정보 수정
export const editUserPersonalInfo = async (
  accessToken,
  name,
  phoneNumber,
  email,
  birthday,
  sex,
  hashtags
) => {
  try {
    const res = await axios({
      method: "patch",
      url: "https://prod.be-beam.site/api/web/v1/users/my-info",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        name: name,
        phoneNumber: changePhoneNumberRepresentation(phoneNumber),
        email: email,
        birthday: birthday,
        gender: sex,
        hashtags: hashtags,
      },
    });
  } catch (error) {
    console.error("Error Edit User Personal Information:", error);
    throw error;
  }
};

// 마이페이지 정보 가져오기
export const fetchMypageInfo = async (accessToken) => {
  try {
    const res = await axios({
      method: "get",
      url: "https://prod.be-beam.site/api/web/v1/users/my-page",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data.result;
  } catch (error) {
    console.error("Error Fetch Mypage Information:", error);
    throw error;
  }
};
