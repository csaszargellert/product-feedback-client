import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  :root {
    --violet: rgb(173, 31, 234);
    --white : rgb(255,255,255);
    --very-light-grey: rgb(247, 248, 253);
    --light-grey: rgb(242, 244, 255);
    --dark-grey: rgb(100, 113, 150); 
    --dark-greyish-blue: rgb(55,63, 104); 
    --greyish-blue: rgb(58,67,116);
    --sky-blue: rgb(98,188,250);
    --blue: rgb(70,97,230);
    --orange: rgb(244, 159, 133);
    --error: #D73737;
    --border-radius: 1rem;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: 'Jost', sans-serif;
    font-weight: 400; // Regular
    font-size: 1.6rem; // 16px
    line-height: 1.4375; // 23px
    background-color: var(--very-light-grey);
    min-height: 100vh;
    width: 100%;
  }

  #error {
    position: relative;
  }

  .self-start {
    align-self: start;
  }

  .flex-row {
    flex-direction: row;
  }

  .ml-auto {
    margin-left: auto;
  }

  .mr-auto {
    margin-right: auto;
  }

  .height-l {
    height: 9.6rem;
  }

  .height-m {
    height: 8rem;
  }

  .padding-mod-button {
    padding: 1.2rem 2rem;
  }

  .w-auto {
    width: auto;
  }

  .w-full {
    width: 100%;
  }

  .text-size-md {
    font-size: 1.6rem;
  }

  .spec-padding-for-upvotes {
    padding: 1rem 1.2rem 1rem 1.6rem;
  }

`;

export default GlobalStyle;
