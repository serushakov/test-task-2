import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const GlobalStyle = createGlobalStyle`
  ${reset}

  html {
    height: 100%;
    font-size: 16px;
  }

  /**
    Make sure padding does not affect element width.

    @see: https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing
  */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    min-height: 100vh;
    min-height: -webkit-fill-available;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    color: var(--text-color);
    background: var(--surface-color);
  }

  :root {
    --side-padding: 2rem;

    @media screen and (max-width: 468px) {
      --side-padding: 1rem;
    }

    --content-width: 100rem;

    --text-color: rgb(32,33,37);
    --surface-color: #ffffff;
    --border-color: rgba(32, 33, 37, 0.12);
    --primary-color: #5BC0EB;
    --secondary-color: #FDE74C;
    --error-color: #E55934;
    --success-color: #9BC53D;
    --warning-color: #FA7921;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
