import { atom } from "recoil";

// 1. 슬라이드 관련
// 기본 슬라이드 화면에 보이는 갯수
export const SlidesToShowState = atom({
  key: "SlidesToShowState",
  default: 2,
});

// 모임 리뷰 슬라이드 갯수
export const CommunityReviewSlidesToShowState = atom({
  key: "CommunityReviewSlidesToShowState",
  default: 5,
});

// 이건 나중에 없앨것.
export const searchNicknameState = atom({
  key: "searchNicknameState",
  default: "",
});

// 2. 모임 관련
// 모임에 참여하고 싶은 이유
export const meetingApplyReasonState = atom({
  key: "meetingApplyReasonState",
  default: "",
});

// 3. 반응형 관련
// tailwindCSS가 먹히지 않을 때 반응형 사이즈
export const ResponsiveSize = atom({
  key: "ResoponsiveSize",
  default: "",
});
