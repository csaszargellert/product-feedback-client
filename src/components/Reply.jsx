import { Header, ReplyButton } from "./Comment";
import { useState } from "react";
import { useSubmit } from "react-router-dom";
import useInput from "../custom-hooks/useInput";
import { detailValidator } from "../constants/validator";
import InputElement from "./InputElement";
import { ErrorMessage } from "./Input";
import Button from "./Button";

function Reply({ reply, commentId }) {
  const submit = useSubmit();
  const [showReplyInput, setShowReplyInput] = useState(false);

  const [replyValue, replyError, replyIsTouched, replyHandleInput] =
    useInput(detailValidator);

  const handleReply = function () {
    setShowReplyInput((prev) => !prev);
  };

  const handleReplySubmission = async function (event) {
    event.preventDefault();

    const obj = {
      reply: replyValue,
      replyToWhom: reply.user.username,
      commentId,
      type: "reply",
    };

    submit(obj, { method: "POST" });
  };

  return (
    <div style={{ marginBottom: "3.2rem" }}>
      <Header>
        <div>
          <img
            src={`/assets/user-images/image-${reply.user.photo}`}
            alt={reply.user.name}
          />
        </div>
        <div>
          <h5>{reply.user.name}</h5>
          <span>@{reply.user.username}</span>
        </div>
        <ReplyButton onClick={handleReply}>reply</ReplyButton>
      </Header>
      <p>
        <span style={{ color: "var(--violet)", fontWeight: "700" }}>
          @{reply.replyToWhom}
        </span>{" "}
        {reply.content}
      </p>
      {showReplyInput && (
        <>
          <form onSubmit={handleReplySubmission}>
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
    </div>
  );
}

export default Reply;
