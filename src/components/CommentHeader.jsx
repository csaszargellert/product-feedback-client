import styled from "styled-components";
import { Link } from "react-router-dom";
import Button, { BackButton } from "./Button";

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function CommentHeader({ id }) {
  return (
    <Header>
      <BackButton />
      <Button as={Link} to={`/feedback/edit/${id}`} bg="blue" hover="#7C91F9">
        edit feedback
      </Button>
    </Header>
  );
}

export default CommentHeader;
