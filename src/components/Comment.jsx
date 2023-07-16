import styled from "styled-components";
import { useState } from "react";

import Button from "./Button";
import { detailValidator } from "../constants/validator";
import useInput from "../custom-hooks/useInput";
import InputElement from "./InputElement";

const ReplyButton = styled.button`
  border: none;
  outline: none;
  background: none;

  color: var(--blue);

  font-weight: 500;
  font-size: 1.3rem;
  font-family: inherit;
  text-transform: capitalize;
  cursor: pointer;

  margin-left: auto;

  &:hover {
    text-decoration: underline;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap);

  margin-bottom: 1.7rem;

  > div:first-of-type {
    width: var(--image-width);
    height: var(--image-width);
    border-radius: 50%;
    overflow: hidden;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
  }

  h5 {
    font-size: 1.4rem;
    font-weight: 700;
    letter-spacing: -0.2px;
    color: var(--greyish-blue);
  }

  span {
    font-size: 1.4rem;
    color: var(--dark-grey);
  }
`;

const CommentEl = styled.div`
  --gap: 3.2rem;
  --image-width: 4rem;
  --padding-left: calc(var(--gap) + var(--image-width));

  &:not(:last-child) {
    margin-bottom: 3.2rem;
    padding-bottom: 3.2rem;
    border-bottom: 1px solid var(--light-grey);
  }

  p {
    padding-left: var(--padding-left);
    color: var(--dark-grey);
    font-size: 1.5rem;
  }

  p:not(:last-child) {
    margin-bottom: 2.4rem;
  }

  div:last-child {
    padding-left: var(--padding-left);
    display: grid;
    grid-template-columns: 11fr 3fr;
    align-items: start;
    gap: 1.6rem;
  }
`;

function Comment({ comment }) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyValue, replyError, replyIsTouched, replyHandleInput] =
    useInput(detailValidator);

  const handleReply = function () {
    setShowReplyInput((prev) => !prev);
  };

  return (
    <CommentEl>
      <Header>
        <div>
          <img src="/assets/user-images/image-anne.jpg" alt="user image" />
        </div>
        <div>
          <h5>Anne Valentine</h5>
          <span>@annev1990</span>
        </div>
        <ReplyButton onClick={handleReply}>reply</ReplyButton>
      </Header>
      <p>{comment.content}</p>
      {showReplyInput && (
        <div>
          <InputElement
            name="reply"
            type="textarea"
            id="reply"
            value={replyValue}
            handleChange={replyHandleInput}
            error=""
            isTouched={replyIsTouched}
            definedClassname="height-m"
          />
          <Button bg="violet" hover="#C75AF6">
            post reply
          </Button>
        </div>
      )}
    </CommentEl>
  );
}

export default Comment;
