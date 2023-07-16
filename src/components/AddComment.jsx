import styled from "styled-components";
import { Form } from "react-router-dom";
import { useEffect, useState } from "react";

import useInput from "../custom-hooks/useInput";
import { detailValidator } from "../constants/validator";
import InputElement from "./InputElement";
import Button from "./Button";

const CommentContainer = styled.div`
  background-color: var(--white);
  border-radius: var(--border-radius);
  padding: 2.4rem 3.2rem 3.2rem;

  h3 {
    color: var(--greyish-blue);
    font-size: 1.8rem;
    font-weight: 700;
    letter-spacing: -0.25px;
    margin-bottom: 2.4rem;
    text-transform: capitalize;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  p {
    font-size: 1.6rem;
    color: var(--dark-grey);
  }
`;

function AddComment() {
  const [remainingChars, setRemainingChars] = useState(250);
  const [commentValue, commentError, commentIsTouched, handleCommentInput] =
    useInput(detailValidator);

  useEffect(() => {
    if (commentValue) {
      setRemainingChars(250 - commentValue.length);
    } else {
      setRemainingChars(250);
    }
  }, [commentValue]);

  return (
    <CommentContainer>
      <h3>add comment</h3>

      <Form>
        <InputElement
          name="comment"
          type="textarea"
          id="comment"
          value={commentValue}
          handleChange={handleCommentInput}
          error={""}
          isTouched={commentIsTouched}
          definedClassname="height-m"
        />
        <div>
          <p>
            {remainingChars} character{`${remainingChars > 1 && "s"}`} left
          </p>
          <Button type="submit" hover="#C75AF6" bg="violet">
            post comment
          </Button>
        </div>
      </Form>
    </CommentContainer>
  );
}

export default AddComment;
