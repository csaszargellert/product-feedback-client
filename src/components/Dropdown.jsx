import styled from "styled-components";

import DropdownElement from "./DropdownElement";

const DropdownContainer = styled.div`
  --border-radius: 0.5rem;

  margin-bottom: 2.4rem;

  h3 {
    font-weight: 700;
    font-size: 1.4rem;
    letter-spacing: -0.2px;
    color: var(--greyish-blue);
    text-transform: capitalize;
    margin-bottom: 2px;
  }

  h3 + p {
    font-size: 1.4rem;
    color: var(--dark-grey);
    margin-bottom: 1.6rem;
  }
`;

function Dropdown(props) {
  return (
    <DropdownContainer>
      <h3>Category</h3>
      <p>Choose a category for your feedback</p>
      <DropdownElement {...props}></DropdownElement>
    </DropdownContainer>
  );
}

export default Dropdown;
