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
