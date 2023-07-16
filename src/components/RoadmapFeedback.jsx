import styled from "styled-components";

import Upvotes from "./Upvotes";
import { CategoryButton, CommentButton } from "./Button";
import CommentSummary from "./CommentSummary";
import { Status } from "./RoadmapSummary";

const HeadingLink = styled(CommentButton)``;

const Feedback = styled.figure`
  padding: 3.2rem;
  background-color: var(--white);
  border-radius: var(--border-radius);
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: flex-start;

  &::before {
    display: block;
    content: "";
    width: 100%;
    height: 7px;
    background-color: var(--${(props) => props.$color});
    position: absolute;
    top: 0;
    left: 0;
  }

  > div:last-of-type {
    align-self: stretch;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  ${Status} {
    margin-bottom: -0.8rem;
  }

  ${HeadingLink} {
    margin-bottom: 4px;
  }

  p:nth-of-type(2) {
    color: var(--dark-grey);
  }
`;

function RoadmapFeedback({ color, feedback }) {
  return (
    <Feedback $color={color}>
      <Status $color={color}>{feedback.status}</Status>
      <div>
        <HeadingLink to={`/feedback/${feedback.id}`}>
          {feedback.title}
        </HeadingLink>
        <p>{feedback.detail}</p>
      </div>
      <CategoryButton as="div">{feedback.category}</CategoryButton>
      <div>
        <Upvotes definedClass="flex-row spec-padding-for-upvotes w-auto">
          123
        </Upvotes>
        <CommentSummary>2</CommentSummary>
      </div>
    </Feedback>
  );
}

// {
//   "title": "My very first new title",
//   "category": "Enhancement",
//   "detail": "new detail",
//   "status": "In-Progress",
//   "id": "6496de75607ea9cf9b72f8e5"
// }

export default RoadmapFeedback;
