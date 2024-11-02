import Button from "../button/Button";

import { GoChevronLeft } from "react-icons/go";

export default function PrevArrow({ onClick, styles, fontStyles, disabled }) {
  return (
    <Button
      icon={<GoChevronLeft />}
      onClick={onClick}
      styles={`${styles} ${fontStyles} absolute z-[9999] drop-shadow-lg`}
      enableStyles="bg-[#282828]"
      disabled={disabled}
    />
  );
}
