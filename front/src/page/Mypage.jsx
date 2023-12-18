import React, { useEffect } from "react";
import { userState } from "../recoil/userState";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

export default function Mypage() {
  const navigate = useNavigate();

  // user가 들어왔는지 안 들어왔는지 확인하는 전역 데이터.
  const userIn = useRecoilValue(userState);

  // user가 없을시 Mypage에 접근 불가.
  useEffect(() => {
    if (!userIn) {
      navigate("/");
    }
  }, [userIn]);

  return <div>Mypage</div>;
}
