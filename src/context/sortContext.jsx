import { createContext, useState, useContext } from "react";

const SortContext = createContext();

const SortContextProvider = function ({ children }) {
  const [sort, setSort] = useState(null);

  const handleSort = function (event) {
    const clickedCategory = event.target.closest("p");
    if (!clickedCategory) return;
    setSort(clickedCategory.textContent);
  };

  const value = {
    sort,
    handleSort,
    setSort,
  };

  return <SortContext.Provider value={value}>{children}</SortContext.Provider>;
};

export default SortContextProvider;

export const useSortContext = function () {
  return useContext(SortContext);
};
