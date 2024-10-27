import Button from "../button/Button";

import { GoX } from "react-icons/go";

export default function SearchInput({
  placeholder,
  searchText,
  onChange,
  handleDeleteText,
  wrapStyle,
  inputStyle,
  deleteBtnPositionStyles,
  btnStyles,
}) {
  return (
    <div className={`${wrapStyle} relative`}>
      <input
        className={`${inputStyle} w-full box-border dark:bg-transparent border-[2px] border-solid outline-none`}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={searchText}
      />

      <Button
        icon={<GoX />}
        onClick={handleDeleteText}
        styles={`${deleteBtnPositionStyles} ${btnStyles} ${
          searchText.length > 0 ? "opacity-100" : "opacity-0"
        } absolute transition-all duration-700`}
      />
    </div>
  );
}
