import styled, { css } from "styled-components";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const ButtonEl = styled.button.attrs((props) => ({
  type: props.$type,
}))`
  border: none;
  outline: none;
  background: none;

  display: inline-block;
  font-family: inherit;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1.4;

  color: var(--very-light-grey);
  padding: 1.2rem 2.4rem;
  text-transform: capitalize;
  text-decoration: none;
  border-radius: 1.2rem;
  cursor: pointer;
  transition: background-color 100ms ease-in-out;

  ${(props) => {
    return css`
      background-color: var(--${props.$bg});
    `;
  }}

  &:hover {
    background-color: ${(props) => props.$hover};
  }
`;

const GoBack = styled.button.attrs({ type: "button" })`
  border: none;
  outline: none;
  background: none;

  display: inline-block;
  cursor: pointer;
  font-family: inherit;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1.4;
  text-transform: capitalize;
  text-align: left;

  color: ${(props) => (props.$dark ? "var(--white)" : "var(--dark-grey)")};

  path {
    stroke: ${(props) => (props.$dark ? "var(--white)" : "var(--dark-grey)")};
  }

  svg {
    margin-right: 0.8rem;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const CategoryBtn = styled.button`
  border: none;
  outline: none;
  background: none;

  display: inline-block;
  padding: 0.6rem 1.6rem;
  font-size: 1.3rem;

  font-weight: 500;
  font-family: inherit;
  color: var(--blue);
  background-color: var(--light-grey);

  border-radius: var(--border-radius);

  transition: background-color 150ms ease-in-out;

  ${(props) => {
    return (
      props.$active &&
      css`
        background-color: var(--blue);
        color: var(--white);
      `
    );
  }}

  &:hover {
    cursor: ${(props) => props.$hover && "pointer"};
    background-color: ${(props) => props.$hover};
  }
`;

const LinkToComment = styled(Link)`
  display: inline-block;
  color: var(--greyish-blue);
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -0.25px;
  margin-bottom: 4px;
  text-decoration: none;
  transition: color 100ms ease-in-out;

  ${(props) =>
    props.as !== "h4" &&
    css`
      &:hover,
      &:active {
        color: var(--blue);
      }
    `}
`;

export const CategoryButton = function ({ children, hover, active, as }) {
  return (
    <CategoryBtn as={as} $hover={hover} $active={active}>
      {children}
    </CategoryBtn>
  );
};

export const BackButton = function ({ dark }) {
  const navigate = useNavigate();

  return (
    <GoBack $dark={dark} onClick={() => navigate(-1)}>
      <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 9L2 5l4-4"
          stroke="#4661E6"
          strokeWidth="2"
          fill="none"
          fillRule="evenodd"
        />
      </svg>
      go back
    </GoBack>
  );
};

export const CommentButton = function ({ children, as, to }) {
  return (
    <LinkToComment as={as} to={as !== "h4" ? to : undefined}>
      {children}
    </LinkToComment>
  );
};

function Button({
  children,
  bg,
  hover,
  type,
  definedClass,
  to,
  as,
  onHandleClick,
}) {
  return (
    <ButtonEl
      to={to}
      as={as}
      $bg={bg}
      $hover={hover}
      $type={type}
      className={definedClass}
      onClick={onHandleClick}
    >
      {children}
    </ButtonEl>
  );
}

export default Button;
