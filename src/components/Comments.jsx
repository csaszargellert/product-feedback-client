import styled from "styled-components";

import Comment from "./Comment";

const CommentContainer = styled.section`
  background-color: var(--white);
  border-radius: var(--border-radius);
  padding: 2.4rem 3.2rem 4rem;

  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    letter-spacing: -0.25px;
    color: var(--greyish-blue);
    text-transform: capitalize;
    margin-bottom: 2.8rem;
  }
`;

function Comments({ comments }) {
  return (
    <CommentContainer>
      <h3>
        {comments.length} comment{comments.length < 2 ? "" : "s"}
      </h3>

      <article>
        {comments.length &&
          comments.map((comment) => {
            return <Comment key={comment.id} comment={comment} />;
          })}
      </article>
    </CommentContainer>
  );
}

export default Comments;
