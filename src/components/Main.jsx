import styled from "styled-components";

import Feedbacks from "./Feedbacks";
import SortHeader from "./SortHeader";
import NoFeedback from "./NoFeedback";

const MainEl = styled.main`
  flex: 1;
`;

function Main({ feedbacks }) {
  return (
    <MainEl>
      <SortHeader suggestions={feedbacks.length} />
      {feedbacks.length ? <Feedbacks feedbacks={feedbacks} /> : <NoFeedback />}
    </MainEl>
  );
}

export default Main;
