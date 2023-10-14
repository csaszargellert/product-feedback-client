import styled from "styled-components";
import { useState } from "react";
import { useSubmit } from "react-router-dom";

import Button from "./Button";
import { detailValidator } from "../constants/validator";
import useInput from "../custom-hooks/useInput";
import InputElement from "./InputElement";
import Replies from "./Replies";
import { ErrorMessage } from "./Input";

export const ReplyButton = styled.button`
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

export const Header = styled.header`
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

  p,
  > div {
    padding-left: var(--padding-left);
  }

  p:not(${ErrorMessage}) {
    color: var(--dark-grey);
    font-size: 1.5rem;
  }

  p:not(:last-child) {
    margin-bottom: 2.4rem;
  }

  form {
    display: grid;
    grid-template-columns: 11fr 3fr;
    align-items: start;
    gap: 1.6rem;
    padding-left: var(--padding-left);
  }
`;

function Comment({ comment, feedbackId }) {
  const submit = useSubmit();
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyValue, replyError, replyIsTouched, replyHandleInput] =
    useInput(detailValidator);

  const handleReply = function () {
    setShowReplyInput((prev) => !prev);
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    const obj = {
      reply: replyValue,
      replyToWhom: comment.user.username,
      commentId: comment.id,
      type: "reply",
    };

    submit(obj, { method: "POST" });
  };

  return (
    <CommentEl>
      <Header>
        <div>
          <img
            src={`/assets/user-images/image-${comment.user.photo}`}
            alt={comment.user.name}
          />
        </div>
        <div>
          <h5>{comment.user.name}</h5>
          <span>@{comment.user.username}</span>
        </div>
        <ReplyButton onClick={handleReply}>reply</ReplyButton>
      </Header>
      <p>{comment.content}</p>
      <Replies
        replies={comment.replies}
        feedbackId={feedbackId}
        commentId={comment.id}
      />
      {showReplyInput && (
        <>
          <form onSubmit={handleSubmit}>
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
            <Button bg="violet" hover="#C75AF6" type="submit">
              post reply
            </Button>
          </form>
          {replyError && <ErrorMessage>{replyError}</ErrorMessage>}
        </>
      )}
    </CommentEl>
  );
}

export default Comment;
