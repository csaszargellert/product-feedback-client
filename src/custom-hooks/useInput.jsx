import { useState, useCallback, useEffect } from "react";

function useInput(validator, defaultValue) {
  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const handleInputChange = useCallback(
    function (event) {
      const inputValue = event.target.value;
      const eventType = event.type;

      const errorMessage = validator(inputValue);

      if (eventType === "blur") {
        setIsTouched(true);
      } else {
        setIsTouched(false);
      }

      setError(errorMessage);
      setValue(inputValue);
    },
    [validator]
  );

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  return [
    value,
    error,
    isTouched,
    handleInputChange,
    setError,
    setIsTouched,
    setValue,
  ];
}

export default useInput;
