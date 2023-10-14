import styled from "styled-components";
import { useEffect, useRef } from "react";

const InputField = styled.input`
  border: none;
  outline: none;
  background: none;

  display: inline-block;
  width: 100%;
  padding: 1.3rem 2.4rem;
  margin-bottom: 4px;

  font-family: inherit;
  font-weight: 400;
  font-size: 1.5rem;
  background-color: var(--very-light-grey);
  color: var(--greyish-blue);

  border: 1px solid
    ${(props) => (props.$error ? "var(--error) !important" : "transparent")};
  border-radius: var(--border-radius);

  &:hover,
  &:focus {
    border: 1px solid
      ${(props) => (props.$login ? "transparent" : "var(--blue)")};
  }
`;

const Textarea = styled(InputField)`
  resize: none;
  padding: 1.6rem 2.4rem;
`;

function InputElement({
  name,
  type,
  id,
  value,
  handleChange,
  error,
  isTouched,
  definedClassname,
  login,
}) {
  const inputRef = useRef();

  useEffect(() => {
    if (type === "password") {
      inputRef.current.setAttribute("readonly", "readonly");
    }
  }, []);

  let inputComponent;

  if (type === "textarea") {
    inputComponent = (
      <Textarea
        as="textarea"
        name={name}
        id={id}
        value={value}
        onChange={handleChange}
        onBlur={handleChange}
        $error={error && isTouched}
        className={definedClassname}
        maxlength="250"
        minlength="1"
      ></Textarea>
    );
  } else {
    inputComponent = (
      <InputField
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={handleChange}
        onBlur={handleChange}
        $error={error && isTouched}
        className={definedClassname}
        ref={inputRef}
        $login={login}
        readOnly={login}
      />
    );
  }

  return inputComponent;
}

export default InputElement;
