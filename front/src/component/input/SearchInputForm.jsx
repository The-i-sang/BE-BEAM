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
  deleteBtnStyle,
  searchBtnStyle,
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

      <button
        className={`${deleteBtnStyle} ${
          searchText.length > 0 ? "opacity-100" : "opacity-0"
        } absolute transition-all duration-700`}
        type="button"
        onClick={() => {
          setSearchText("");
        }}
      >
        <GoX />
      </button>

      <button type="submit" className={`${searchBtnStyle} absolute`}>
        <CiSearch />
      </button>
    </form>
  );
}
