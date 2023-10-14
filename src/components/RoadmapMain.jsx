import styled from "styled-components";

import { STATUSES } from "../constants/dropdown";
import RoadmapStatus from "./RoadmapStatus";

const Main = styled.main`
  width: 111rem;
  margin: 0 auto;
  display: flex;
  gap: 3rem;
`;

function RoadmapMain({ feedbacks, statuses }) {
  const getRightFeedbacks = function (category) {
    return feedbacks.filter((feedback) => feedback.status === category);
  };

  const getAppearanceFeedbacks = function (category) {
    return statuses.find((status) => status._id === category)?.appearance || 0;
  };

  return (
    <Main>
      {STATUSES.map((status) => {
        return (
          <RoadmapStatus
            key={status.id}
            color={status.color}
            status={status.category}
            text={status.text}
            data={getRightFeedbacks(status.category)} // array
            appearance={getAppearanceFeedbacks(status.category)} // number
          />
        );
      })}
    </Main>
  );
}

export default RoadmapMain;
