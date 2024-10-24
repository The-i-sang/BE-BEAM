import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { AccessTokenState } from "../recoil/userState.js";

import { formatDate, identify } from "../common.js";

import Input from "../component/input/Input.jsx";
import InputCheckbox from "../component/inputCheckbox/InputCheckbox";
import Button from "../component/button/Button";

import { CiSquareInfo, CiCircleCheck } from "react-icons/ci";
import { FaCircleChevronUp, FaCircleChevronDown } from "react-icons/fa6";
import { getUserPersonalInfo } from "../api/user.js";

export default function UserInfoModify() {
  const accessToken = useRecoilValue(AccessTokenState);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [sex, setSex] = useState("");
  const [allPersonalInfo, setAllPersonalInfo] = useState({});

  const [emailIdentifyCheck, setEmailIdentifyCheck] = useState(null);
  const [keywordListOpen, setKeywordListOpen] = useState(false);

  useEffect(() => {
    const fetchUserPersonalInfo = async () => {
      const userPersonalInfo = await getUserPersonalInfo();
      setAllPersonalInfo(userPersonalInfo);
    };
    fetchUserPersonalInfo(accessToken);
  }, [accessToken]);
  console.log(allPersonalInfo);

  useEffect(() => {
    setName("");
    setPhoneNumber("");
    setEmail("");
    setBirthday("");
    setSex("");
  }, []);

  const dataComeIn =
    name && phoneNumber.length === 11 && emailIdentifyCheck && birthday && sex
      ? true
      : false;

  const sexDatas = ["여성", "남성"];
  const keywordDatas = [
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
  ];

  useEffect(() => {
    if (birthday) {
      setBirthday(formatDate(birthday));
    }
  }, [birthday, setBirthday]);

  const userEmailComment =
    email !== "" && emailIdentifyCheck
      ? ""
      : email !== "" && !emailIdentifyCheck
      ? "이메일 양식을 맞춰주세요."
      : "이메일을 입력하세요.";

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
                type="text"
                id="userName"
                placeholder="이름을 입력해주세요."
                onChange={(e) => setName(e.target.value)}
                value={name}
                basicStyle="placeholder:text-[0.9rem] text-[0.9rem] px-6"
              />
              <p
                className={`${
                  name !== "" ? "opacity-0" : "opacity-100"
                } w-full h-5 mt-2 text-[0.875rem] text-[#ff0000] font-thin transition-all duration-700`}
              >
                이름을 입력해주세요.{" "}
              </p>
            </div>

            <div className="w-full mb-2">
              <label htmlFor="phoneNumber" className="font-bold">
                휴대전화 번호
              </label>

              <div className="flex items-center w-full gap-x-5">
                <Input
                  type="text"
                  id="phoneNumber"
                  placeholder="핸드폰 번호를 입력해주세요."
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                  maxLength="11"
                  basicStyle="placeholder:text-[0.9rem] text-[0.9rem] px-6"
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
                  phoneNumber !== "" ? "opacity-0" : "opacity-100"
                } w-full h-5 mt-2 text-[0.875rem] text-[#ff0000] font-thin transition-all duration-700`}
              >
                핸드폰 번호를 입력해주세요.
              </p>
            </div>

            <div className="w-full mb-2">
              <label htmlFor="email" className="font-bold">
                이메일
              </label>
              <Input
                type="text"
                id="email"
                placeholder="이메일을 입력해주세요."
                onChange={(e) => {
                  setEmail(e.target.value);
                  identify(e.target.value, undefined, setEmailIdentifyCheck);
                }}
                value={email}
                basicStyle="placeholder:text-[0.9rem] text-[0.9rem] px-6"
              />
              <p
                className={`${
                  email !== "" && emailIdentifyCheck
                    ? "opacity-0"
                    : "opacity-100"
                } w-full h-5 mt-2 text-[0.875rem] text-[#ff0000] font-thin transition-all duration-700`}
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
                basicStyle="text-[0.8rem] px-6"
              />
              <p
                className={`${
                  birthday !== "" ? "opacity-0" : "opacity-100"
                } w-full h-5 mt-2 text-[0.875rem] text-[#ff0000] font-thin transition-all duration-700`}
              >
                생일을 입력해주세요.
              </p>
            </div>

            <div className="w-full mb-2">
              <label htmlFor="userName" className="font-bold">
                성별
              </label>
              <InputCheckbox
                datas={sexDatas}
                isChecked={sex}
                setIsChecked={setSex}
              />
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
                datas={keywordDatas}
                isCheckedList={keywords}
                setIsCheckedList={setKeywords}
                keywordListOpen={keywordListOpen}
              />
            </div>
          </div>

          <Button
            onClick={() => {}}
            buttonText="정보 수정"
            disabled={!dataComeIn}
            basicStyle="h-[3.75rem] mt-4 border-[1px] border-solid dark:border-[#6c6c6c] dark:bg-black"
          />
        </div>
      </div>
    </div>
  );
}
