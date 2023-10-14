import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Form } from "react-router-dom";

import useInput from "../custom-hooks/useInput";
import { detailValidator } from "../constants/validator";
import InputElement from "./InputElement";
import Button from "./Button";
import { ErrorMessage } from "./Input";

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

  p:not(:${ErrorMessage}) {
    font-size: 1.6rem;
    color: var(--dark-grey);
  }
`;

function AddComment({ feedbackId }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [remainingChars, setRemainingChars] = useState(250);
  const [
    commentValue,
    commentError,
    commentIsTouched,
    handleCommentInput,
    setCommentError,
    _,
    setCommentValue,
  ] = useInput(detailValidator);

  useEffect(() => {
    if (commentValue) {
      setRemainingChars(250 - commentValue.length);
    } else {
      setRemainingChars(250);
    }
  }, [commentValue]);

  const handlePostSubmission = async function (event) {
    event.preventDefault();

    if (!commentValue) {
      setCommentError("Can't be empty");
      return;
    }
  };

  const handleInput = function (e) {
    if (remainingChars <= 0) {
      setCommentValue(commentValue.slice(0, 249));
      return;
    }

    handleCommentInput(e);
  };

  return (
    <CommentContainer>
      <h3>add comment</h3>

      <Form method="POST">
        <input type="hidden" name="type" value="comment" />
        <InputElement
          name="comment"
          type="textarea"
          id="comment"
          value={commentValue}
          handleChange={handleInput}
          error={""}
          isTouched={commentIsTouched}
          definedClassname="height-m"
        />
        {commentError && <ErrorMessage>{commentError}</ErrorMessage>}
        <div>
          <p>
            {remainingChars} character{`${remainingChars > 1 ? "s" : ""}`} left
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
