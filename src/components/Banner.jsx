import styled from "styled-components";

const Heading = styled.header`
  background-image: url("suggestions/desktop/background-header.png");
  background-repeat: no-repeat;
  background-size: cover;

  border-radius: var(--border-radius);

  padding: 6.2rem 2.4rem 2.4rem;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.25px;
    text-transform: capitalize;
    color: var(--white);
    width: 80%;
  }

  span {
    font-size: 1.5rem;
    opacity: 0.8;
    font-weight: 400;
    letter-spacing: 0;
  }
`;

function Banner() {
  return (
    <Heading>
      <h1>
        frontend mentor <span>feedback board</span>
      </h1>
    </Heading>
  );
}

export default Banner;
