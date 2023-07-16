import styled from "styled-components";

import Banner from "./Banner";
import Categories from "./Categories";
import RoadmapSummary from "./RoadmapSummary";

const Sidebar = styled.aside`
  --border-radius: 1rem;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 25.5rem;
`;

function Aside({ statuses, query }) {
  return (
    <Sidebar>
      <Banner />
      <Categories query={query} />
      <RoadmapSummary empty={!statuses.length} statuses={statuses} />
    </Sidebar>
  );
}

export default Aside;
