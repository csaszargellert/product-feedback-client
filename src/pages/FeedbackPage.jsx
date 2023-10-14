import styled from "styled-components";
import { useLoaderData, json, redirect } from "react-router-dom";
import { axiosBase, axiosPrivate } from "../utils/axios";

import Feedback from "../components/Feedback";
import Comments from "../components/Comments";
import AddComment from "../components/AddComment";
import CommentHeader from "../components/CommentHeader";

const Main = styled.main`
  max-width: 73rem;
  margin: 0 auto;
  padding: 9.6rem 0;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

function FeedbackPage() {
  const feedback = useLoaderData();

  return (
    feedback && (
      <Main>
        <CommentHeader id={feedback?.id} creator={feedback?.creator} />
        <Feedback
          title={feedback?.title}
          detail={feedback?.detail}
          category={feedback?.category}
          id={feedback?.id}
          titleAs="h4"
          upvotesNumber={feedback?.upvotes.length}
          commentsNumber={feedback?.comments.length}
        />
        <Comments comments={feedback?.comments} feedbackId={feedback?.id} />
        <AddComment feedbackId={feedback?.id} />
      </Main>
    )
  );
}

export default FeedbackPage;

export const loader = async function ({ params }) {
  const { feedbackId } = params;

  try {
    const data = await axiosBase({
      url: "/feedback/" + feedbackId,
    });
    return data.data.data;
  } catch (error) {
    throw json(
      {
        error: error.response.data.error,
      },
      {
        status: error.response.status,
      }
    );
  }
};

export const action = async function ({ params, request }) {
  const { feedbackId } = params;
  const formData = await request.formData();

  let url = "";

  if (formData.get("type") === "comment") {
    url = `/feedback/${feedbackId}/comment`;
  } else if (formData.get("type") === "reply") {
    const commentId = formData.get("commentId");
    url = `/feedback/${feedbackId}/comment/${commentId}/reply`;
  }
  try {
    const response = await axiosPrivate({
      url,
      method: "POST",
      data: formData,
    });
    return response.data.data;
  } catch (error) {
    if (error.response.status === 401) {
      const searchParams = new URLSearchParams();
      searchParams.set("from", new URL(request.url).pathname);
      return redirect("/login?" + searchParams.toString());
    }

    throw json(
      {
        error: error.response.data.error,
      },
      {
        status: error.response.status,
      }
    );
  }
};
