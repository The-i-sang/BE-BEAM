// google
// kakao

import axios from "axios";
import { googleTokenApiUrl, googleUserDataGetApiUrl } from "./common";

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
      redirect_uri: "https://the-isang-site.vercel.app/googleAuth",
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
