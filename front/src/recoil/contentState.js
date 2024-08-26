import { atom } from "recoil";

export const SnsAuthTypeState = atom({
  key: "SnsAuthTypeState",
  default: "",
});

export const SlidesToShowState = atom({
  key: "SlidesToShowState",
  default: 2,
});

export const CommunityReviewSlidesToShowState = atom({
  key: "CommunityReviewSlidesToShowState",
  default: 5,
});

export const searchNicknameState = atom({
  key: "searchNicknameState",
  default: "",
});

// 모임에 참여하고 싶은 이유(필요함)
export const meetingApplyReasonState = atom({
  key: "meetingApplyReasonState",
  default: "",
});

// tailwindCSS가 아닌 다른 style 환경에서의 미디어 쿼리
export const ResponsiveSize = atom({
  key: "ResoponsiveSize",
  default: "",
});
