// 프로젝트에서 공통으로 사용하는 변수들을 모아둔 곳.

export const AppPage = {
  home: "/", // Meeting page
  meetingDetail: "/meeting/detail",
  applyForm: "/applyForm",
  communityReviews: "/communityReviews",
  toolkit: "/toolkit",
  toolkitDetail: "/toolkit/detail",
  brand: "/brand",
  search: "/search",
  mypage: "mypage",
  userInfoModify: "/mypage/userInfoModify",
  userProfileModify: "/mypage/userProfileModify",
  auth: "/auth",
};

export const btnBasicStyle = {
  basic: "flex items-center justify-center box-border",
  border: "border-solid flex items-center justify-center box-border",
  circle:
    "aspect-square rounded-full flex items-center justify-center box-border",
};

export const btnStyle = {
  navbar:
    "lg:mr-8 md:mr-4 sm:mr-4 mr-2 md:text-[1.8rem] sm:text-[1.5rem] text-[1.2rem]",
  blackBg:
    "bg-bg-light-80 dark:bg-bg-dark-10 rounded-lg text-text-light-10 dark:text-text-dark-90",
  enableBlackBg:
    "bg-bg-light-80 dark:bg-bg-dark-10 text-text-light-10 dark:text-text-dark-90",
};

export const inputStyle = {
  userInfoModify:
    "w-full h-[3rem] mt-2 p-3 border-[#f5aa15] placeholder:text-[#F5AA15] placeholder:text-[0.9rem] text-[0.9rem] text-[#494545]",
};

export const validityStatementStyle = {
  userInfoModify:
    "w-full mt-2 text-[0.875rem] text-[#ff0000] font-thin transition-all duration-700",
};

export const borderStyle = {
  basic: "border-solid border-bg-light-20 dark:border-bg-dark-40",
};
