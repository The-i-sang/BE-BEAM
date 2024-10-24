import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AccessTokenState } from "../recoil/userState.js";
import { identify } from "../common.js";
import {
  btnBasicStyle,
  inputStyle,
  validityStatementStyle,
} from "../common2.js";

import Input from "../component/input/Input.jsx";
import InputCheckbox from "../component/inputCheckbox/InputCheckbox";
import Button from "../component/button/Button";
import { Toast } from "../component/toast/Toast";

import { CiSquareInfo } from "react-icons/ci";
import { FaCircleChevronUp, FaCircleChevronDown } from "react-icons/fa6";
import { editUserPersonalInfo, getUserPersonalInfo } from "../api/user.js";

export default function UserInfoModify() {
  const navigate = useNavigate();

  const accessToken = useRecoilValue(AccessTokenState);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [sex, setSex] = useState("");
  const [allPersonalInfo, setAllPersonalInfo] = useState({});

  const [emailIdentifyCheck, setEmailIdentifyCheck] = useState(null);
  const [keywordListOpen, setKeywordListOpen] = useState(false);

  useEffect(() => {
    const fetchUserPersonalInfo = async () => {
      if (accessToken) {
        const userPersonalInfo = await getUserPersonalInfo(accessToken);
        setAllPersonalInfo(userPersonalInfo);
      }
    };
    fetchUserPersonalInfo();
  }, [accessToken]);

  useEffect(() => {
    setName(allPersonalInfo.name ?? "");
    setPhoneNumber(allPersonalInfo.phoneNumber ?? "");
    setEmail(allPersonalInfo.email ?? "");
    setBirthday(allPersonalInfo.birthday ?? "");
    setSex(allPersonalInfo.gender ?? "");
    setHashtags(allPersonalInfo.hashtags);
  }, [allPersonalInfo]);

  useEffect(() => {
    if (allPersonalInfo.email) {
      identify(allPersonalInfo.email, undefined, setEmailIdentifyCheck);
    }
  }, [allPersonalInfo]);

  const hashTagsDatas = [
    "음악",
    "그림",
    "음식",
    "맛집",
    "드라마",
    "영화",
    "사진",
    "마라톤",
    "댄스",
    "악기",
    "노래",
    "디저트",
    "요리",
    "취업",
    "공부",
    "회화",
    "뮤지컬",
    "랩",
    "발라드",
    "술",
    "독서",
    "연기",
    "패션",
    "코딩",
    "운동",
    "카페",
  ];

  const userEmailComment =
    email !== "" && emailIdentifyCheck
      ? ""
      : email !== "" && !emailIdentifyCheck
      ? "이메일 양식을 맞춰주세요."
      : "이메일을 입력하세요.";

  const handleEditUserPersonalInfo = async () => {
    await editUserPersonalInfo(
      accessToken,
      name,
      phoneNumber,
      email,
      birthday,
      sex,
      hashtags
    );

    Toast("🥨🎂 프로필 수정을 완료했습니다!");
    navigate("/mypage");

    setName("");
    setPhoneNumber("");
    setEmail("");
    setBirthday("");
    setSex("");
    setHashtags([]);
  };

  const dataComeIn =
    name && phoneNumber.length === 11 && emailIdentifyCheck && birthday && sex;

  console.log(
    "name",
    name,
    "phoneNumber",
    phoneNumber,
    "email",
    email,
    "brithday",
    birthday,
    "sex",
    sex,
    "hashtags",
    hashtags
  );

  return (
    <div className="w-full py-[2rem] bg-[#f6f6f6] dark:bg-black">
      <div className="w-11/12 mx-auto">
        <p className="text-[1.125rem] font-semibold dark:text-white">
          개인 정보
        </p>

        <div className="w-full mt-5 py-[1.875rem] px-[1.25rem] box-border bg-white dark:bg-[rgba(255,255,255,0.2)] rounded-2xl border-[1px] border-solid border-[#ddd] dark:border-[#5b5b5b]">
          <div className="w-full px-2 py-3 box-border bg-[#f7f7f7] rounded-lg flex items-center gap-x-3 text-[0.875rem] text-[#666]">
            <CiSquareInfo className="text-[1.8rem] text-[#2e97a7]" />
            <p>
              하단 정보는 본인 확인 및 마케팅 수신 서비스에 사용되며, 절대로
              프로필에 공개되지 않습니다.
            </p>
          </div>

          <div className="w-full mt-10">
            <div className="w-full mb-2">
              <label htmlFor="userName" className="font-bold">
                이름
              </label>
              <Input
                id="userName"
                placeholder="이름을 입력해주세요."
                onChange={(e) => setName(e.target.value)}
                value={name}
                styles={inputStyle.userInfoModify}
              />
              <p
                className={`${
                  name !== "" ? "opacity-0 h-0" : "opacity-100 h-5"
                } ${validityStatementStyle.userInfoModify}`}
              >
                이름을 입력해주세요.
              </p>
            </div>

            <div className="w-full mb-2">
              <label htmlFor="phoneNumber" className="font-bold">
                휴대전화 번호
              </label>

              <div className="flex items-center w-full gap-x-5">
                <Input
                  id="phoneNumber"
                  placeholder="핸드폰 번호를 입력해주세요."
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                  maxLength="11"
                  styles={inputStyle.userInfoModify}
                />

                <Button
                  buttonText="휴대전화 인증"
                  styles="mt-2 px-2 rounded-lg text-white"
                  enableStyles="bg-[#282828]"
                  disabled={phoneNumber.length < 11}
                />
              </div>

              <p
                className={`${
                  phoneNumber !== "" ? "opacity-0 h-0" : "opacity-100 h-5"
                } ${validityStatementStyle.userInfoModify}`}
              >
                핸드폰 번호를 입력해주세요.
              </p>
            </div>

            <div className="w-full mb-2">
              <label htmlFor="email" className="font-bold">
                이메일
              </label>
              <Input
                id="email"
                placeholder="이메일을 입력해주세요."
                onChange={(e) => {
                  setEmail(e.target.value);
                  identify(e.target.value, undefined, setEmailIdentifyCheck);
                }}
                value={email}
                styles={inputStyle.userInfoModify}
              />
              <p
                className={`${
                  email !== "" && emailIdentifyCheck
                    ? "opacity-0"
                    : "opacity-100"
                } ${validityStatementStyle.userInfoModify}`}
              >
                {userEmailComment}
              </p>
            </div>

            <div className="w-full mb-2">
              <label htmlFor="birth" className="font-bold">
                생일
              </label>
              <Input
                type="date"
                id="birth"
                placeholder="생일을 입력해주세요."
                onChange={(e) => setBirthday(e.target.value)}
                value={birthday}
                styles={inputStyle.userInfoModify}
              />
              <p
                className={`${
                  birthday !== "" ? "opacity-0 h-0" : "opacity-100 h-5"
                } ${validityStatementStyle.userInfoModify}`}
              >
                생일을 입력해주세요.
              </p>
            </div>

            <div className="w-full mb-2">
              <label htmlFor="userName" className="font-bold">
                성별
              </label>
              <InputCheckbox
                datas={["WOMEN", "MEN"]}
                texts={["여성", "남성"]}
                isChecked={sex}
                name="sex"
                styles="w-full mt-3 grid grid-cols-2"
                enableStyles="bg-[#ffbd4c] border-[#ffa228] text-white"
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    setSex(e.target.value);
                  }
                }}
              />
              <p
                className={`${
                  sex !== "" ? "opacity-0 h-0" : "opacity-100 h-5"
                } ${validityStatementStyle.userInfoModify}`}
              >
                성별을 입력해주세요.
              </p>
            </div>

            <div>
              <div className="flex items-center w-full mt-2 mb-4 gap-x-2">
                <p className="text-[0.8125rem] font-thin">
                  키워드에 맞는 콘텐츠를 추천해드려요!
                </p>

                <button
                  onClick={() => setKeywordListOpen((prev) => !prev)}
                  className="text-[1.4rem] text-[#ffc85b]"
                >
                  {keywordListOpen ? (
                    <FaCircleChevronUp />
                  ) : (
                    <FaCircleChevronDown />
                  )}
                </button>
              </div>

              <InputCheckbox
                datas={hashTagsDatas}
                isCheckedList={hashtags}
                name="interest"
                styles={`${
                  keywordListOpen ? "h-auto opacity-100 mb-4" : "h-0 opacity-0"
                } w-full mt-3 flex flex-wrap items-center gap-y-2 transition-all duration-700 overflow-hidden`}
                labelStyles="px-6"
                enableStyles="bg-[#ffbd4c] border-[#ffa228] text-white"
                onChange={(e) => {
                  if (hashtags?.length < 5) {
                    if (!hashtags.includes(e.target.value)) {
                      setHashtags((prev) => [...prev, e.target.value]);
                    } else {
                      setHashtags((prev) =>
                        prev?.filter((hashtag) => hashtag !== e.target.value)
                      );
                    }
                  } else {
                    setHashtags((prev) =>
                      prev?.filter((hashtag) => hashtag !== e.target.value)
                    );
                  }
                }}
              />
            </div>
          </div>

          <Button
            buttonText="정보 수정"
            onClick={handleEditUserPersonalInfo}
            basicStyle={btnBasicStyle.basic}
            styles="w-full py-3 rounded-lg text-white"
            enableStyles="bg-[#282828]"
            disabled={!dataComeIn}
          />
        </div>
      </div>
    </div>
  );
}
