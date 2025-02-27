import { atom } from "recoil";

// accessToken
export const AccessTokenState = atom({
  key: "AccessTokenState",
  default: localStorage.getItem("accessToken") ?? "",
});

// 로그인시 들어오는 현재 유저의 데이터
export const UserDataState = atom({
  key: "UserDataState",
  default: {},
});

// 유저 개인정보
export const UserPersonalInfoState = atom({
  key: "UserPersonalInfoState",
  default: {},
});
