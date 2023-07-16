import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import { STATUSES } from "../constants/dropdown";

const RoadmapLink = styled(Link)`
  &:link,
  &:visited {
    font-family: inherit;
    font-size: 1.3rem;
    font-weight: 500;
    text-transform: capitalize;

    transition: color 100ms ease-in-out;

    color: var(--blue);
    opacity: ${(props) => (props.$empty ? "0.4" : "1")};
  }

  &:hover,
  &:active {
    ${(props) =>
      !props.$empty &&
      css`
        color: #8397f8;
      `}
  }
`;

const RoadmapSummary = styled.article`
  padding: 2.4rem;
  border-radius: var(--border-radius);
  background-color: var(--white);

  > div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2.4rem;
  }

  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  h3 {
    font-weight: 700;
    font-size: 1.8rem;
    letter-spacing: -0.25px;
    text-transform: capitalize;
    color: var(--greyish-blue);
  }
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-weight: 700;
  }
`;

export const Status = styled.p`
  position: relative;
  padding-left: 2.4rem;
  color: var(--dark-grey);

  &::before {
    content: "";

    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);

    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--${(props) => props.$color});
  }
`;

function Roadmap({ empty, statuses }) {
  const displayFeedbackAppearance = function (value) {
    return (
      statuses.find((backendStatus) => backendStatus._id === value)
        ?.appearance || 0
    );
  };

  return (
    <RoadmapSummary>
      <div>
        <h3>roadmap</h3>
        <RoadmapLink
          $empty={empty}
          to="/roadmap"
          onClick={(event) => empty && event.preventDefault()}
        >
          view
        </RoadmapLink>
      </div>
      <div>
        {STATUSES.map((statusValue) => {
          return (
            <StatusContainer key={statusValue.id}>
              <Status $color={statusValue.color}>{statusValue.category}</Status>
              <span>{displayFeedbackAppearance(statusValue.category)}</span>
            </StatusContainer>
          );
        })}
      </div>
    </RoadmapSummary>
  );
}

export default Roadmap;
