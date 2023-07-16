import styled from "styled-components";

import RoadmapFeedback from "./RoadmapFeedback";

const RoadmapColumn = styled.section`
  flex: 1;

  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--greyish-blue);
    letter-spacing: -0.25px;
    margin-bottom: 4px;
  }

  > p {
    color: var(--dark-grey);
    margin-bottom: 3.2rem;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  }
`;

function RoadmapStatus({ color, appearance, data, status }) {
  return (
    <RoadmapColumn>
      <h3>
        {status} ({appearance})
      </h3>
      <p>Ideas prioritized for research</p>
      <div>
        {data.length
          ? data.map((feedback) => {
              return (
                <RoadmapFeedback
                  key={feedback.id}
                  color={color}
                  feedback={feedback}
                />
              );
            })
          : ""}
      </div>
    </RoadmapColumn>
  );
}

export default RoadmapStatus;
