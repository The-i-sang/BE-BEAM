import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userState } from "../recoil/userState";
import { useRecoilValue } from "recoil";
import SnsBtn from "../component/button/SnsBtn";

import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";

function Auth() {
  const navigate = useNavigate();

  // user가 들어왔는지 안 들어왔는지 확인하는 전역 데이터.
  const userIn = useRecoilValue(userState);

  // user가 있을시 Auth 페이지에 접근 불가.
  useEffect(() => {
    if (userIn) {
      navigate("/");
    }
  }, [userIn]);

  return (
    <div className="w-full">
      <div className="pb-10 sm:w-[500px] w-full mx-auto sm:pt-0 pt-10 px-5 box-border flex flex-col items-center">
        <img
          className="md:w-[100px] sm:w-[90px] w-[80px] object-cover mx-auto cursor-pointer"
          src={process.env.PUBLIC_URL + "/logo/logo2.png".replace("./", "/")}
          alt="logo"
        />

        <div className="w-full border-b-[1px] border-solid border-[#ccc] text-center pb-6">
          <h1 className="mt-6 text-[1.8rem] font-black">
            연결망을 통한 따뜻한 사회로.
          </h1>
          <p className="mt-2 font-thin text-[#f58915]">
            BE:BEAM에 오신 걸 환영합니다:)
          </p>
        </div>

        <div className="w-full mt-8">
          <SnsBtn buttonText="구글" icon={<FcGoogle />} />
          <SnsBtn buttonText="카카오톡" icon={<RiKakaoTalkFill />} />
        </div>
      </div>
    </div>
  );
}

export default Auth;
