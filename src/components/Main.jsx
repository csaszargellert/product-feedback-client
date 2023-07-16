import { useNavigation } from "react-router-dom";
import styled from "styled-components";

import Spinner from "./Spinner";
import Feedbacks from "./Feedbacks";
import SortHeader from "./SortHeader";
import NoFeedback from "./NoFeedback";

const MainEl = styled.main`
  flex: 1;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

function Main({ feedbacks }) {
  const navigation = useNavigation();

  return (
    <MainEl>
      <SortHeader suggestions={feedbacks.length} />
      {navigation.state !== "idle" ? (
        <Container>
          <Spinner />
        </Container>
      ) : feedbacks.length ? (
        <Feedbacks feedbacks={feedbacks} />
      ) : (
        <NoFeedback />
      )}
    </MainEl>
  );
}

export default Main;
