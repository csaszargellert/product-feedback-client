import styled from "styled-components";

const SuggestionEl = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  p {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--white);
    letter-spacing: -0.25px;
    text-transform: capitalize;
  }
`;

function Suggestion({ children }) {
  return (
    <SuggestionEl>
      <object
        data="/assets/suggestions/icon-suggestions.svg"
        type="image/svg+xml"
      ></object>
      <p>{children}</p>
    </SuggestionEl>
  );
}

export default Suggestion;
