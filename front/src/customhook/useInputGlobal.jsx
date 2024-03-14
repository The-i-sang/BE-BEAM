// input 커스텀훅 전역

import { useRecoilState } from "recoil";

const useInputGlobal = (recoilState) => {
  const [value, setValue] = useRecoilState(recoilState);
  console.log(value);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return [value, onChange, setValue];
};

export default useInputGlobal;
