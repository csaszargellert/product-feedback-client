import styled from "styled-components";

import Feedback from "./Feedback";

const FeedbacksEl = styled.article`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function Feedbacks({ feedbacks }) {
  return (
    <FeedbacksEl>
      {feedbacks.map((feedback) => {
        return (
          <Feedback
            key={feedback.id}
            title={feedback.title}
            detail={feedback.detail}
            category={feedback.category}
            id={feedback.id}
          />
        );
      })}
    </FeedbacksEl>
  );
}

export default Feedbacks;
