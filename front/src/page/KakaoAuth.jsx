import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/userState";
import { KakaoAuthTokenFetch } from "../api/user";
import { Cookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";

export default function KakakoAuth() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  console.log(code);
  console.log(location);

  const [kakaoToken, setKakaoToken] = useState();
  const setUserIn = useSetRecoilState(userState);

  useEffect(() => {
    async function kakaoGetToken() {
      setKakaoToken(await KakaoAuthTokenFetch(code));
    }

    kakaoGetToken();
  }, []);

  useEffect(() => {
    if (kakaoToken) {
      cookies.set("accessToken", kakaoToken.access_token);
      setUserIn(true);

      navigate("/", { state: { pathname } });
    }
  }, [cookies, kakaoToken, setUserIn]);

  console.log(kakaoToken);

  return <></>;
}
