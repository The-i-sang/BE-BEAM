import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: false,
});

export const UserDataState = atom({
  key: "UserDataState",
  default: {},
});

// 유저들에게 필요한 정보들만 모아둔 곳.
export const UserNecessaryDataState = atom({
  key: "UserNecessaryDataState",
  default: {},
});
