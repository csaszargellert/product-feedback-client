import { useLoaderData, json } from "react-router-dom";
import { useEffect } from "react";
import { axiosBase } from "./utils/axios";
import styled from "styled-components";

import { useFeedbackContext } from "./context/feedbackContext";
import Aside from "./components/Aside";
import Main from "./components/Main";
import { SORT } from "./constants/dropdown";

const Content = styled.div`
  max-width: 111rem;
  margin: 0 auto;
  padding: 9.6rem 0;

  display: flex;
  gap: 3rem;
`;

function App() {
  const {
    data: { feedbacks, statuses },
    query,
  } = useLoaderData();
  const { setStatuses, setFeedbacks } = useFeedbackContext();

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

export const loader = async function (props) {
  const { searchParams } = new URL(props.request.url);
  if (!searchParams.get("category")) searchParams.set("category", "All");
  if (!searchParams.get("sort")) searchParams.set("sort", SORT[0].category);

  try {
    const allFeedbacks = await axiosBase("/feedback/all", {
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
