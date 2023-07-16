import { useLoaderData, json } from "react-router-dom";
import { useContext, useEffect } from "react";
import axios from "./utils/axios";
import styled from "styled-components";

import { FeedbackContext } from "./context/feedbackContext";
import Aside from "./components/Aside";
import Main from "./components/Main";

const Content = styled.div`
  max-width: 111rem;
  margin: 0 auto;
  padding: 9.6rem 0;

  display: flex;
  gap: 3rem;
`;

export const loader = async function (props) {
  const newUrl = new URL(props.request.url);
  const searchParams = new URLSearchParams(newUrl.search);

  if (!searchParams.get("category")) searchParams.set("category", "All");

  try {
    const allFeedbacks = await axios("/feedback/all", {
      params: searchParams,
    });
    return {
      data: allFeedbacks.data.data,
      query: searchParams.get("category"),
    };
  } catch (error) {
    throw json(
      { message: error.response.data.data },
      {
        status: error.response.status,
      }
    );
  }
};

function App() {
  const {
    data: { feedbacks, statuses },
    query,
  } = useLoaderData();

  const { setStatuses, setFeedbacks } = useContext(FeedbackContext);

  useEffect(() => {
    setStatuses(statuses);
    setFeedbacks(feedbacks);
  }, [feedbacks, statuses]);

  return (
    <Content>
      <Aside statuses={statuses} query={query} />
      <Main feedbacks={feedbacks} />
    </Content>
  );
}

export default App;
