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
  border: 5px solid var(--violet);
  border-left-color: transparent;

  animation: ${rotate} 1000ms linear infinite;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 9.6rem 0 0;
`;

function Spinner() {
  return (
    <Container>
      <LoadingSpinner></LoadingSpinner>
    </Container>
  );
}

export default Spinner;
