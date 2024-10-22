import Button from "../button/Button";

import { CiSearch } from "react-icons/ci";
import { GoX } from "react-icons/go";

export default function SearchInputForm({
  placeholder,
  searchText,
  onChange,
  setSearchText,
  handleSearchData,
  formStyle,
  inputStyle,
  deleteBtnPositionStyles,
  searchBtnPositionStyles,
  btnStyles,
}) {
  return (
    <form onSubmit={handleSearchData} className={`${formStyle} relative`}>
      <input
        className={`${inputStyle} w-full box-border dark:bg-transparent border-[2px] border-solid outline-none`}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={searchText}
      />

      <Button
        icon={<GoX />}
        onClick={() => {
          setSearchText("");
        }}
        styles={`${deleteBtnPositionStyles} ${btnStyles} ${
          searchText.length > 0 ? "opacity-100" : "opacity-0"
        } absolute transition-all duration-700`}
      />

      <Button
        type="submit"
        icon={<CiSearch />}
        styles={`${searchBtnPositionStyles} ${btnStyles} absolute`}
      />
    </form>
  );
}
