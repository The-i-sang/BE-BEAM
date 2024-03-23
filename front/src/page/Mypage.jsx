import { useEffect } from "react";
import { userState } from "../recoil/userState";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import MypageMyProfile from "../component/MypageMyProfile";
import TabCommonComponent from "../component/TabCommonComponent";

export default function Mypage() {
  const navigate = useNavigate();

  const userIn = useRecoilValue(userState);

  // user가 없을시 Mypage에 접근 불가.
  useEffect(() => {
    if (!userIn) {
      //navigate("/");
    }
  }, [userIn]);

  return (
    <div className="w-full bg-[#f6f6f6] dark:bg-black">
      <div className="w-11/12 mx-auto pt-[3.75rem] pb-[2rem]">
        <MypageMyProfile />

        <TabCommonComponent title="내가 찜한 모임" />
        <TabCommonComponent title="나의 모임" />
      </div>
    </div>
  );
}
