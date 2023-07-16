import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "./Button";

const NoFeedbackEl = styled.article`
  background-color: var(--white);
  border-radius: var(--border-radius);
  padding: 11rem 20.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4.8rem;

  div {
    text-align: center;
  }

  h3 {
    font-weight: 700;
    font-size: 2.4rem;
    letter-spacing: -0.3px;
    color: var(--greyish-blue);
    margin-bottom: 1.6rem;
  }

  p {
    color: var(--dark-grey);
    margin-bottom: 4.8rem;
  }
`;

function NoFeedback() {
  return (
    <NoFeedbackEl>
      <img src="/assets/suggestions/illustration-empty.svg" />
      <div>
        <h3>There is no feedback yet.</h3>
        <p>
          Got a suggestion? Found a bug that needs to be squashed? We love
          hearing about new ideas to improve our app.
        </p>
        <Button as={Link} to="/feedback/add" hover="#C75AF6" bg="violet">
          + add feedback
        </Button>
      </div>
    </NoFeedbackEl>
  );
}

export default NoFeedback;
