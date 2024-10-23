// kakao

import axios from "axios";

export const changeCookieToToken = async () => {
  try {
    const res = await axios({
      method: "get",
      url: "https://prod.be-beam.site/api/web/oauth2-jwt-header",
      withCredentials: true,
    });
    return res.data.result;
  } catch (error) {
    console.error("Error fetching JWT header:", error);
    throw error;
  }
};

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

export const editUserProfile = async (
  accessToken,
  profileImage,
  nickname,
  description
) => {
  try {
    const changeBase64StringToFile = base64ToFile(profileImage, "profile.jpg");

    const formData = new FormData();
    formData.append("profileImage", changeBase64StringToFile);

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

    alert("file upload success");
    return res.data.result; // 응답 데이터를 확인하기 위해 res.data로 변경
  } catch (error) {
    console.error("Error fetching User Profile:", error);
    throw error;
  }
};
