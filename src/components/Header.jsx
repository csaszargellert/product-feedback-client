import styled from "styled-components";
import { Link, useLoaderData, useFetcher, useLocation } from "react-router-dom";

import Button from "./Button";

const HeaderEl = styled.header`
  background-color: var(--dark-greyish-blue);
  padding: 3.2rem 0;

  nav {
    max-width: 111rem;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 3.2rem;
  }

  p {
    color: var(--white);
    margin-left: -1.6rem;
    order: -1;
    margin-right: auto;
  }
`;

const ImageContainer = styled.div`
  width: 4.8rem;
  height: 4.8rem;
  order: -2;

  border-radius: 50%;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function Header() {
  const { userIsAuthenticated, user } = useLoaderData();
  const fetcher = useFetcher();
  const location = useLocation();
  const { pathname, search } = location;
  const searchParams = new URLSearchParams();
  searchParams.set("from", pathname);

  return (
    <HeaderEl>
      <nav>
        <Button bg="blue" hover="rgb(98,188,250)" as={Link} to={`/${search}`}>
          home
        </Button>
        {userIsAuthenticated ? (
          <>
            <p>{user.name}</p>
            <ImageContainer>
              <img
                src={`/assets/user-images/image-${user.photo}`}
                alt={user.name}
              />
            </ImageContainer>
            <fetcher.Form action="/logout" method="POST">
              <Button bg="violet" hover="#C75AF6" type="submit">
                logout
              </Button>
            </fetcher.Form>
          </>
        ) : (
          <Button
            bg="violet"
            hover="#C75AF6"
            as={Link}
            to={`/login?${searchParams.toString()}`}
          >
            login
          </Button>
        )}
      </nav>
    </HeaderEl>
  );
}

export default Header;
