import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const ErrorContainer = styled.section`
  position: absolute;
  top: 5rem;
  right: 1rem;

  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Error = styled.p`
  width: 30rem;
  padding: 1.6rem 2.4rem;
  background-color: var(--orange);
  border-left: 5px solid var(--error);
  border-radius: 5px;
  color: var(--white);
  cursor: pointer;
`;

function ErrorElement({ children }) {
  const [showError, setShowError] = useState(true);

  const handleErrorDisplay = function () {
    setShowError(false);
  };

  useEffect(() => {
    const timer = setTimeout(handleErrorDisplay, 3500);

    return () => clearTimeout(timer);
  }, []);

  return showError && <Error onClick={handleErrorDisplay}>{children}</Error>;
}

function ErrorModal({ errorList }) {
  return createPortal(
    <ErrorContainer>
      {errorList &&
        errorList.map((errorEl, index) => {
          return <ErrorElement key={index}>{errorEl}</ErrorElement>;
        })}
    </ErrorContainer>,
    document.getElementById("error")
  );
}

export default ErrorModal;
