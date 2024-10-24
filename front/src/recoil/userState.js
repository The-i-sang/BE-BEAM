import { atom } from "recoil";

// accessToken
export const AccessTokenState = atom({
  key: "AccessTokenState",
  default: localStorage.getItem("accessToken") ?? "",
});

// 로그인이 되었는가, 안 되었는가.
export const userState = atom({
  key: "userState",
  default: false,
});

// 로그인시 들어오는 현재 유저의 데이터
export const UserDataState = atom({
  key: "UserDataState",
  default: {},
});

// 유저들에게 필요한 정보들만 모아둔 곳.(나중에 삭제할 것)
export const UserNecessaryDataState = atom({
  key: "UserNecessaryDataState",
  default: {},
});

// 유저가 관심 있는 커뮤니티 키워드(5개까지)(나중에 삭제할 것)
export const IsCheckedListKeywordState = atom({
  key: "IsCheckedListKeywordState",
  default: [],
});

// 유저 개인정보
export const UserPersonalInfoState = atom({
  key: "UserPersonalInfoState",
  default: {},
});
