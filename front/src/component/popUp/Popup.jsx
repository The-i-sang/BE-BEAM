import { useEffect } from "react";

import { TbAlertCircle } from "react-icons/tb";
import { GoX } from "react-icons/go";

export default function Popup({ setPopupOn }) {
  const closePopup = (expireDays) => {
    let expire = new Date();
    expire.setTime(expire.getTime() + expireDays * 24 * 60 * 60 * 1000);
    localStorage.setItem("popupNoShow", expire.getTime());
  };

  const checkPopupClose = () => {
    const expireDay = localStorage.getItem("popupNoShow");
    let today = new Date();

    if (today.getTime() > expireDay) {
      return false;
    } else {
      return true;
    }
  };

  const closePopupToday = () => {
    closePopup(1);
    setPopupOn(false);
  };

  useEffect(() => {
    checkPopupClose() ? setPopupOn(false) : setPopupOn(true);
  }, []);

  return (
    <div className="w-full sm:max-w-[400px] max-w-[400px] sm:h-[250px] h-[220px] mx-auto sm:p-6 p-4 box-border sm:fixed top-10 left-10 bg-black dark:bg-white z-[999] rounded-2xl">
      <div className="w-full flex justify-end">
        <button
          className="sm:w-8 sm:h-8 w-7 h-7 bg-white dark:bg-black rounded-full flex items-center justify-center text-[1.4rem] hover:[transform:rotateY(360deg)] transition-all duration-700"
          onClick={() => {
            setPopupOn(false);
          }}
        >
          <GoX />
        </button>
      </div>

      <div className="text-center">
        <div className="w-full flex items-center justify-center text-white dark:text-black sm:text-[2.2rem] text-[1.6rem] text-center">
          <TbAlertCircle />
          <span>공지사항</span>
        </div>
        <p className="mt-5 sm:text-[1.0625rem] text-[0.9rem] text-white dark:text-black">
          현재 모임 참여 기능이 개발 중에 있습니다. <br />
          현재 툴킷 다운로드 기능만 사용이 가능합니다.
        </p>

        <div
          className="w-full mt-5 text-[#aaaaaa] flex items-center justify-center gap-x-1"
          onClick={closePopupToday}
        >
          <input
            className="w-5 h-5 rounded focus:ring-[#ffc35c]"
            type="checkbox"
            id="check"
          />
          <label className="ml-2" htmlFor="check">
            오늘 하루 안 보기
          </label>
        </div>
      </div>
    </div>
  );
}
