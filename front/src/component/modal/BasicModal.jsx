import Button from "../button/Button";
import { btnBasicStyle } from "../../common2";

import { GoX } from "react-icons/go";

export default function BasicModal({
  setModal,
  wrapStyles,
  height,
  styles,
  children,
}) {
  return (
    <div
      className={`${wrapStyles} w-full h-screen bg-[rgba(0,0,0,0.4)] fixed top-0 left-0 transition-all duration-700`}
    >
      <div
        className={`${styles} ${height} w-11/12 max-w-[760px] p-6 box-border bg-white drop-shadow-xl border-[1px] border-solid border-[#ccc] rounded-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
      >
        <Button
          icon={<GoX />}
          onClick={() => setModal(false)}
          basicStyle={btnBasicStyle.circle}
          styles="w-8 h-8 bg-[#ffc35c] ml-auto text-white text-[1.4rem] hover:[transform:rotateY(360deg)] transition-all duration-700"
        />
        {children}
      </div>
    </div>
  );
}
