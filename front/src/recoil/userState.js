import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: false,
});

export const UserDataState = atom({
  key: "UserDataState",
  default: {},
});

export const UserNecessaryDataState = atom({
  key: "UserNecessaryDataState",
  default: {},
});
