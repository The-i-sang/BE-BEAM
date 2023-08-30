import { createContext, useState } from "react";

export const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [categoryOn, setCategoryOn] = useState(false);

  const toggleCategory = () => {
    setCategoryOn((prev) => !prev);
  };

  return (
    <CategoryContext.Provider value={{ categoryOn, toggleCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}
