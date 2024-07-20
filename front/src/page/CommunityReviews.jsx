import TypeWriter from "../component/typeWriter/TypeWriter";

import { CiMemoPad } from "react-icons/ci";

export default function CommunityReviews() {
  return (
    <div className="w-full pt-16 dark:bg-black dark:text-white">
      <div className="flex flex-col items-center w-11/12 mx-auto mb-28 lg:flex-row lg:justify-between">
        <TypeWriter
          type="Community-Reviews"
          icon={<CiMemoPad />}
          titleFirst="다양한 사람들이"
          titleBack="<br/>다양하게 남긴 모임 후기!"
          subTitleFirst="다양한 사람들이 다양하게 남긴,"
          subTitleBack="찐 모임 후기들을 실시간으로 만나보세요!"
          textColor="text-[#07ffad]"
        />
        <img
          className="w-full lg:max-w-[450px] max-w-[600px] aspect-square animate-fadeIn"
          src="image/community_reviews_main_img.png"
          alt="main_img"
        />
      </div>
    </div>
  );
}
