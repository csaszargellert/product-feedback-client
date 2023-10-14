import Reply from "./Reply";

function Replies({ replies, feedbackId, commentId }) {
  return replies.length
    ? replies.map((reply) => {
        return (
          <Reply
            key={reply.id}
            reply={reply}
            commentId={commentId}
            feedbackId={feedbackId}
          />
        );
      })
    : "";
}

export default Replies;
