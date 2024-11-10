import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AccessTokenState } from "../recoil/userState";
import { useRecoilValue } from "recoil";
import SnsBtn from "../component/button/SnsBtn";

import { RiKakaoTalkFill } from "react-icons/ri";

function Auth() {
  const navigate = useNavigate();
  const accessToken = useRecoilValue(AccessTokenState);

  useEffect(() => {
    if (accessToken !== "") {
      navigate("/");
    }
  }, [accessToken, navigate]);

  function doKakaoLogin() {
    // const redirectUrl = "http://localhost:8080/oauth2/authorization/kakao";
    const redirectUrl = "https://prod.be-beam.site/oauth2/authorization/kakao";

    window.location.href = redirectUrl;
  }

  return (
    <div className="w-full">
      <div className="pb-10 sm:w-[500px] w-full mx-auto sm:pt-0 pt-10 px-5 box-border flex flex-col items-center">
        <img
          className="md:w-[100px] sm:w-[90px] w-[80px] object-cover mx-auto cursor-pointer"
          src={"/logo/logo2.png"}
          alt="logo"
        />

        <div className="w-full border-b-[1px] border-solid border-[#ccc] text-center pb-6">
          <h1 className="mt-6 text-[1.8rem] font-black">
            연결망을 통한 따뜻한 사회로.
          </h1>
          <p className="mt-2 font-thin text-mainColor">
            BE:BEAM에 오신 걸 환영합니다:)
          </p>
        </div>

        <div className="w-full mt-8">
          <SnsBtn
            onClick={doKakaoLogin}
            buttonText="카카오톡"
            icon={<RiKakaoTalkFill />}
            btnStyles="w-full mb-4 py-2 rounded-lg border-[1px] border-solid border-[#ccc] text-[1.125rem] hover:bg-bg-light-80 hover:text-white"
            IconStyles="text-[2.4rem]"
          />
        </div>
      </div>
    </div>
  );
}

export default Auth;
