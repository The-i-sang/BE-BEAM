import Input from "../../input/Input";

import { CiSearch } from "react-icons/ci";

export default function SearchInput({
  onSearchNicknameChange,
  searchNicknameInput,
}) {
  return (
    <div className="w-full relative">
      <Input
        type="text"
        id="search"
        placeholder="검색할 닉네임을 입력하세요."
        onChange={(e) => {
          onSearchNicknameChange(e);
        }}
        value={searchNicknameInput}
        basicStyle="placeholder:text-[0.9rem] text-[0.9rem] px-12"
      />
      <CiSearch className="text-[1.4rem] text-[#f58d15] absolute top-[38%] left-4" />
    </div>
  );
}
