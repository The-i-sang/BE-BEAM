import { CiSearch } from "react-icons/ci";
import { GoX } from "react-icons/go";

export default function SearchInputForm({
  placeholder,
  searchText,
  onChange,
  setSearchText,
  data,
  setFilteredDatas,
  formStyle,
  inputStyle,
}) {
  const handleSearchData = (e) => {
    e.preventDefault();

    if (!Array.isArray(data)) return;

    let filtered = data;

    const trimmedSearchTerm = searchText.trim();

    if (searchText.length > 0 && trimmedSearchTerm === "") {
      setFilteredDatas([]);
    } else {
      const refinedSearchTerm = searchText.replace(/\s+/g, "").toLowerCase();

      const filteredResults = filtered.filter(
        (data) =>
          data?.title
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes(refinedSearchTerm) ||
          data?.description
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes(refinedSearchTerm)
      );

      setFilteredDatas(filteredResults);
    }
  };

  return (
    <form
      onSubmit={handleSearchData}
      className={`${formStyle} w-full relative`}
    >
      <input
        className={`${inputStyle} w-full sm:p-8 p-5 box-border rounded-full border-[2px] border-solid sm:text-[1.2rem] text-[0.9rem] outline-none sm:placeholder:text-[1.2rem] placeholder:text-[0.9rem]`}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={searchText}
      />

      <button
        className="sm:text-[2.4rem] text-[1.5rem] absolute sm:top-[30%] top-[36%] sm:right-20 right-12"
        type="button"
        onClick={() => {
          setSearchText("");
        }}
      >
        <GoX />
      </button>

      <button
        type="submit"
        className="sm:text-[2.4rem] text-[1.5rem] absolute sm:right-7 right-4 sm:top-[30%] top-[36%]"
      >
        <CiSearch />
      </button>
    </form>
  );
}
