import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 5px solid
    ${(props) => (props.$hasParent ? "var(--white)" : "var(--violet)")};
  border-left-color: transparent;

  animation: ${rotate} 1000ms linear infinite;
`;

function Spinner({ hasParent }) {
  return <LoadingSpinner $hasParent={hasParent}></LoadingSpinner>;
}

export default Spinner;
