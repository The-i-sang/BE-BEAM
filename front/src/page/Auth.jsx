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

  function doGoogleLogin() {
    const clientId =
      "235917139656-hk7j40seofglv9o6jqpt6akhu4t1su56.apps.googleusercontent.com";
    const redirectUrl = "http://localhost:3000/googleAuth";
    // const redirectUrl = "https://be-beam.vercel.app/googleAuth";

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=email profile openid https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/user.addresses.read https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.gender.read`;

    window.location.href = url;
  }

  function doKakaoLogin() {
    // const redirectUrl = "http://localhost:3000/kakaoAuth";
    const redirectUrl = "https://be-beam.vercel.app/kakaoAuth";

    const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${redirectUrl}&scope=profile_nickname,profile_image,account_email`;
    window.location.href = url;
  }

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
          <p className="mt-2 font-thin text-mainColor">
            BE:BEAM에 오신 걸 환영합니다:)
          </p>
        </div>

        <div className="w-full mt-8">
          {/* <SnsBtn
            onClick={doGoogleLogin}
            buttonText="구글"
            icon={<FcGoogle />}
            btnStyles="w-full mb-4 py-2 rounded-lg border-[1px] border-solid border-[#ccc] text-[1.125rem] hover:bg-bg-light-80 hover:text-white"
            IconStyles="text-[2.4rem]"
          /> */}
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
