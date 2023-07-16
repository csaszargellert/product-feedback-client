import { useState, useCallback } from "react";

function useDropdown(defaultValue) {
  const [dropdownValue, setDropdownValue] = useState(defaultValue);

  const handleDropdownSelection = useCallback(function (event) {
    const clickedCategory = event.target.closest("p");
    if (!clickedCategory) return;

    setDropdownValue(clickedCategory.textContent);
  }, []);

  return [dropdownValue, handleDropdownSelection];
}

export default useDropdown;
