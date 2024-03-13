import { atom } from "recoil";

export const SnsAuthTypeState = atom({
  key: "SnsAuthTypeState",
  default: "",
});

export const SlidesToShowState = atom({
  key: "SlidesToShowState",
  default: 2,
});

export const searchNicknameState = atom({
  key: "searchNicknameState",
  default: "",
});

export const meetingApplyReasonState = atom({
  key: "meetingApplyReasonState",
  default: "",
});
