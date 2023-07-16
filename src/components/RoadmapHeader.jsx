import styled from "styled-components";
import { Link } from "react-router-dom";
import Button, { BackButton } from "./Button";

const HeaderEl = styled.header`
  background-color: var(--dark-greyish-blue);
  padding: 3.5rem 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: var(--border-radius);

  max-width: 111rem;
  margin: 0 auto 4.8rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  h2 {
    font-size: 2.4rem;
    font-weight: 700;
    color: var(--white);
    letter-spacing: -0.3px;
    text-transform: capitalize;
  }
`;

function RoadmapHeader() {
  return (
    <HeaderEl>
      <div>
        <BackButton dark />
        <h2>roadmap</h2>
      </div>
      <Button as={Link} to="/feedback/add" bg="violet" hover="#C75AF6">
        + add feedback
      </Button>
    </HeaderEl>
  );
}

export default RoadmapHeader;
