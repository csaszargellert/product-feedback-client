import styled from "styled-components";
import { useContext } from "react";

import { FeedbackContext } from "../context/feedbackContext";
import RoadmapHeader from "../components/RoadmapHeader";
import RoadmapMain from "../components/RoadmapMain";

const Content = styled.div`
  padding: 9.6rem 0;
`;

function RoadmapPage() {
  const { feedbacks, statuses } = useContext(FeedbackContext);

  return (
    <Content>
      <RoadmapHeader />
      <RoadmapMain feedbacks={feedbacks} statuses={statuses} />
    </Content>
  );
}

export default RoadmapPage;
