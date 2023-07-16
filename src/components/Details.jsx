import styled from "styled-components";
import { Link } from "react-router-dom";

import { CategoryButton, CommentButton } from "./Button";

const DetailParagraph = styled.p`
  color: var(--dark-grey);
  margin-bottom: 1.2rem;
`;

function Details({ title, detail, category, id, as }) {
  return (
    <div>
      <CommentButton as={as} to={`/feedback/${id}`}>
        {title}
      </CommentButton>
      <DetailParagraph>{detail}</DetailParagraph>
      <CategoryButton as="div">{category}</CategoryButton>
    </div>
  );
}

export default Details;
