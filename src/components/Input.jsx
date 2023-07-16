import styled from "styled-components";

import InputElement from "./InputElement";

export const ErrorMessage = styled.p`
  font-size: 1.4rem;
  color: var(--error);
`;

const InputContainer = styled.div`
  margin-bottom: ${(props) => (props.$mb ? "3.2rem" : "2.4rem")};

  label {
    display: inline-block;
    font-weight: 700;
    font-size: 1.4rem;
    letter-spacing: -0.2px;
    color: ${(props) =>
      props.$login ? "var(--white)" : "var(--greyish-blue)"};
    text-transform: capitalize;
    margin-bottom: ${(props) => (props.$login ? "1.2rem" : "2px")};
  }

  label + p {
    font-size: 1.4rem;
    color: var(--dark-grey);
    margin-bottom: 1.6rem;
  }
`;

function Input({
  type,
  name,
  id,
  label,
  description,
  handleChange,
  error,
  value,
  isTouched,
  mb,
  login,
}) {
  return (
    <InputContainer $mb={mb} $login={login}>
      <label htmlFor={id}>{label}</label>
      {!login ? <p>{description}</p> : ""}
      <InputElement
        type={type}
        name={name}
        id={id}
        handleChange={handleChange}
        value={value}
        isTouched={isTouched}
        error={error}
        login={login}
      />
      {isTouched && error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
}

export default Input;
