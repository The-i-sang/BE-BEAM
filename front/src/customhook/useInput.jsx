// input 커스텀훅

import { useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  console.log(value);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return [value, onChange, setValue];
};

export default useInput;
