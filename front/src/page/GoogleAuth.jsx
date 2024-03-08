import React, { useEffect, useState } from "react";
import { GoogleAuthTokenFetch } from "../api/user";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { userState } from "../recoil/userState";
import { useSetRecoilState } from "recoil";

export const GoogleAuth = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  console.log(code);

  const [googleToken, setGoogleToken] = useState();
  const setUserIn = useSetRecoilState(userState);

  useEffect(() => {
    async function googleGetToken() {
      setGoogleToken(await GoogleAuthTokenFetch(code));
    }

    googleGetToken();
  }, []);

  useEffect(() => {
    if (googleToken) {
      cookies.set("accessToken", googleToken.access_token);
      setUserIn(true);

      navigate("/");
    }
  });

  console.log(googleToken);

  return <></>;
};

export default GoogleAuth;
