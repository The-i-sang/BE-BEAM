import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AccessTokenState, UserDataState } from "../recoil/userState";

import Input from "../component/input/Input";
import Button from "../component/button/Button";
import TextArea from "../component/textArea/TextArea";
import { Toast } from "../component/toast/Toast";

import { AiOutlineSync } from "react-icons/ai";
import { btnBasicStyle } from "../common2";
import { editUserProfile } from "../api/user";

export default function UserProfileModify() {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const userData = useRecoilValue(UserDataState);
  const accessToken = useRecoilValue(AccessTokenState);
  const [profileImage, setProfileImage] = useState("");
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (userData) {
      setProfileImage(userData.profileImage);
      setNickname(userData.nickname);
      setDescription(userData.introduction ?? "");
    }
  }, [userData, setProfileImage, setNickname, setDescription]);

  const userNicknameComment =
    nickname?.length === 0 && "닉네임을 입력해주세요.";

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setNewProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileEdit = async () => {
    try {
      await editUserProfile(
        accessToken,
        newProfileImage,
        nickname,
        description
      );
      Toast("🥨🎂 프로필 수정을 완료했습니다!");
      navigate("/mypage");
    } catch (error) {
      Toast("프로필 수정에 실패했습니다. 다시 시도해주세요.😢");
    }
  };

  console.log(userData);

  return (
    <div className="w-full bg-[#f6f6f6] dark:bg-black">
      <div className="w-11/12 mx-auto pt-[2rem] pb-[2rem]">
        <p className="text-[1.125rem] font-semibold dark:text-white">
          프로필 수정
        </p>

        <div className="w-full mt-5 pt-[1.875rem] bg-meeting dark:bg-[rgba(255,255,255,0.2)] rounded-2xl border-[1px] border-solid border-[#ddd] dark:border-[#5b5b5b] flex flex-col items-center overflow-hidden">
          <div className="relative">
            <img
              className="mb-3 sm:w-[120px] w-[100px] aspect-square object-cover border-[5px] border-solid border-white rounded-full shadow-lg"
              src={profileImage}
              alt="user_profile"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <Button
              basicStyle={btnBasicStyle.circle}
              styles="w-7 h-7 bg-[#282828] text-white text-[0.875rem] absolute bottom-5 right-0"
              onClick={() => fileInputRef.current.click()}
            >
              <AiOutlineSync />
            </Button>
          </div>

          <div className="w-full mt-5 py-[1.875rem] px-[1.25rem] box-border bg-white rounded-t-3xl shadow-inner">
            <div className="w-full mb-2">
              <label htmlFor="nickname" className="font-bold">
                닉네임
              </label>
              <Input
                type="text"
                id="nickname"
                placeholder="사용하실 닉네임을 입력해주세요."
                onChange={(e) => setNickname(e.target.value)}
                value={nickname}
                basicStyle="placeholder:text-[0.9rem] text-[0.9rem] px-6"
              />
              <p
                className={`${
                  nickname?.length !== 0 ? "opacity-0" : "opacity-100"
                } w-full h-5 mt-2 text-[0.875rem] text-[#ff0000] font-thin transition-all duration-700`}
              >
                {userNicknameComment}
              </p>
            </div>

            <div className="w-full mb-2">
              <label htmlFor="introMyself" className="font-bold">
                한 줄 소개
              </label>
              <TextArea
                type="text"
                id="introMyself"
                placeholder="Ex. 처음에는 낯을 가리지만 친해지면 수다쟁이 프론트엔드 개발자"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                styles="mt-2 border-[#f5aa15] placeholder:text-[#F5AA15]"
              />
            </div>

            <Button
              buttonText="프로필 수정하기"
              onClick={handleProfileEdit}
              disabled={nickname?.length === 0}
              basicStyle="mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
