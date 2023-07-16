import styled from "styled-components";
import { useLoaderData, json } from "react-router-dom";

import axiosDef from "../utils/axios";
import Feedback from "../components/Feedback";
import Comments from "../components/Comments";
import AddComment from "../components/AddComment";
import CommentHeader from "../components/CommentHeader";

export const loader = async function ({ params }) {
  const { feedbackId } = params;

  try {
    const data = await axiosDef({
      url: "/feedback/edit/" + feedbackId,
    });
    return data.data.data;
  } catch (error) {
    throw json({ message: "Could not find data" }, { status: 404 });
  }
};

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
    <Main>
      <CommentHeader id={feedback.id} />
      <Feedback
        title={feedback.title}
        detail={feedback.detail}
        category={feedback.category}
        id={feedback.id}
        titleAs="h4"
      />
      {/* <Comments comments={feedback.comments} /> */}
      <AddComment />
    </Main>
  );
}

export default FeedbackPage;
