import { TbAlertCircle } from "react-icons/tb";
import { GoX } from "react-icons/go";

export default function Popup({ setPopupOn }) {
  return (
    <div className="w-full sm:max-w-[400px] max-w-[280px] sm:h-[250px] h-[220px] mx-auto sm:p-6 p-4 box-border sm:fixed top-[50px] left-[50px] bg-white border-[1px] border-solid border-[#ccc] z-[999] rounded-2xl">
      <div className="w-full flex justify-end">
        <button
          className="sm:w-8 sm:h-8 w-7 h-7 bg-[#ffc35c] rounded-full flex items-center justify-center text-white text-[1.4rem] hover:[transform:rotateY(360deg)] transition-all duration-700"
          onClick={() => {
            setPopupOn(false);
          }}
        >
          <GoX />
        </button>
      </div>

      <div className="text-center">
        <div className="w-full flex items-center justify-center text-[#FDBA74] sm:text-[2.2rem] text-[1.6rem] text-center">
          <TbAlertCircle />
          <span>공지사항</span>
        </div>
        <p className="mt-5 sm:text-[1.0625rem] text-[0.8rem]">
          현재 모임 참여기능이 개발중에 있습니다. <br />
          현재 툴킷 다운로드 기능만 사용이 가능합니다.
        </p>
      </div>
    </div>
  );
}
