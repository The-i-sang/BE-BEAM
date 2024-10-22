import Button from "../button/Button";

import { GoChevronRight } from "react-icons/go";

export default function NextArrow({ onClick, styles, fontStyles }) {
  return (
    <Button
      icon={<GoChevronRight />}
      onClick={onClick}
      styles={`${styles} ${fontStyles} absolute z-[9999] drop-shadow-lg cursor-pointer`}
    />
  );
}
