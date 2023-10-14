import styled from "styled-components";

import Upvotes from "./Upvotes";
import Details from "./Details";
import CommentSummary from "./CommentSummary";

const FeedbackEl = styled.div`
  --border-radius: 1rem;

  padding: 2.8rem 3.2rem;
  background-color: var(--white);
  border-radius: var(--border-radius);

  display: flex;
  align-items: center;
  gap: 4rem;
`;

function Feedback({
  title,
  detail,
  category,
  id,
  titleAs,
  upvotesNumber,
  commentsNumber,
}) {
  return (
    <FeedbackEl>
      <Upvotes definedClass="self-start" feedbackId={id}>
        {upvotesNumber}
      </Upvotes>
      <Details
        title={title}
        detail={detail}
        category={category}
        id={id}
        as={titleAs}
      />
      <CommentSummary definedClass="ml-auto">{commentsNumber}</CommentSummary>
    </FeedbackEl>
  );
}

export default Feedback;
