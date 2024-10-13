// google
// kakao

import axios from "axios";
import {
  googleTokenApiUrl,
  googleUserDataGetApiUrl,
  kakaoTokenApiUrl,
  kakaoUserDataGetApiUrl,
} from "./common";

export const GoogleAuthTokenFetch = async (code) => {
  const res = await axios({
    method: "post",
    url: googleTokenApiUrl,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      code: code,
      client_id: process.env.REACT_APP_GOOGLE_API_CLIENT_ID,
      client_secret: process.env.REACT_APP_GOOGLE_API_CLIENT_SECRET,
      // redirect_uri: "https://be-beam.vercel.app/googleAuth",
      redirect_uri: "http://localhost:3000/googleAuth",
      grant_type: "authorization_code",
    },
  });

  const result = await res.data;
  return result;
};

export const GoogleUserDataFetch = async (accessToken) => {
  const res = await axios({
    method: "get",
    url: googleUserDataGetApiUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await res.data;
  return result;
};

export const KakaoAuthTokenFetch = async (code) => {
  const res = await axios({
    method: "post",
    url: kakaoTokenApiUrl,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    data: {
      code: code,
      client_id: process.env.REACT_APP_KAKAO_API_KEY,
      redirect_uri: "https://be-beam.vercel.app/kakaoAuth",
      // redirect_uri: "http://localhost:3000/kakaoAuth",
      grant_type: "authorization_code",
    },
  });

  const result = await res.data;
  return result;
};

export const KakaoUserDataFetch = async (accessToken) => {
  const res = await axios({
    method: "get",
    url: kakaoUserDataGetApiUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await res.data;
  return result;
};
