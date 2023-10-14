import styled, { css } from "styled-components";
import { useFetcher, useRouteLoaderData, useLocation } from "react-router-dom";

const UpvoteEl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;

  width: 4rem;
  padding: 1.4rem 0 9px;

  background-color: var(--light-grey);
  border-radius: 1rem;
  cursor: pointer;

  transition: background-color 100ms ease-in-out;

  &:hover {
    background-color: #cfd7ff;

    ${(props) => {
      return (
        props.$active &&
        css`
          p {
            color: var(--greyish-blue);
          }

          path {
            stroke: var(--blue);
          }
        `
      );
    }}
  }

  path {
    transition: stroke 100ms ease-in-out;
  }

  p {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--greyish-blue);
    letter-spacing: -0.2px;
    transition: color 100ms ease-in-out;
  }

  ${(props) => {
    return (
      props.$active &&
      css`
        background-color: var(--blue);

        p {
          color: var(--white);
        }

        path {
          stroke: var(--white);
        }
      `
    );
  }}
`;

function Upvotes({ children, definedClass, feedbackId }) {
  const { userIsAuthenticated, userId } = useRouteLoaderData("root");
  const upvotes = useRouteLoaderData("upvotes-loader");
  const location = useLocation();
  const fetcher = useFetcher();
  const feedbackIsLiked = !userIsAuthenticated
    ? false
    : !!upvotes?.find(
        (upvote) => upvote.user === userId && upvote.feedback === feedbackId
      );

  const handleClick = function () {
    const searchParams = new URLSearchParams();
    searchParams.set("from", location.pathname);
    fetcher.submit(null, {
      method: "POST",
      action: `/upvotes/${feedbackId}?${searchParams.toString()}`,
    });
  };

  return (
    <UpvoteEl
      className={definedClass}
      onClick={handleClick}
      $active={feedbackIsLiked}
    >
      <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 6l4-4 4 4"
          stroke="#4661E6"
          strokeWidth="2"
          fill="none"
          fillRule="evenodd"
        />
      </svg>
      <p>{children}</p>
    </UpvoteEl>
  );
}

export default Upvotes;
