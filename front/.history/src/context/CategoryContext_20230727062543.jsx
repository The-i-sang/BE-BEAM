import { createContext, useState } from "react";

export const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [categoryOn, setCategoryOn, toggleCategoryInitial] = useState(false);

  const toggleCategory = () => {
    setCategoryOn((prev) => !prev);
  };

  const toggleCategoryInitial = () => {
    setCategoryOn(false);
  };

  return (
    <CategoryContext.Provider
      value={{ categoryOn, toggleCategory, toggleCategoryInitial }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
