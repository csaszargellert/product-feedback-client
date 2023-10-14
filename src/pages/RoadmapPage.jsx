import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useFeedbackContext } from "../context/feedbackContext";
import RoadmapHeader from "../components/RoadmapHeader";
import RoadmapMain from "../components/RoadmapMain";

const Content = styled.div`
  padding: 9.6rem 0;
`;

function RoadmapPage() {
  const { feedbacks, statuses } = useFeedbackContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!feedbacks || !statuses) {
      navigate("/");
    }
  }, [feedbacks, statuses]);

  return (
    <Content>
      <RoadmapHeader />
      <RoadmapMain feedbacks={feedbacks || []} statuses={statuses || []} />
    </Content>
  );
}

export default RoadmapPage;
