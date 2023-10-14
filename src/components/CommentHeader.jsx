import styled from "styled-components";
import { Link, useRouteLoaderData } from "react-router-dom";
import Button, { BackButton } from "./Button";

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function CommentHeader({ id, creator }) {
  const { userId } = useRouteLoaderData("root");
  const isCurrentUserMadeFeedback = creator === userId;

  return (
    <Header>
      <BackButton />
      {isCurrentUserMadeFeedback && (
        <Button as={Link} to={`/feedback/edit/${id}`} bg="blue" hover="#7C91F9">
          edit feedback
        </Button>
      )}
    </Header>
  );
}

export default CommentHeader;
