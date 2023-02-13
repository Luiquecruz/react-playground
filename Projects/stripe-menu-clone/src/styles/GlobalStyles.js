import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  html {
    background: #202020;
  }
  *, button, input {
    font-family: 'Roboto', -apple-system, system-ui, sans-serif;
    background: none;
    border: 0;
  }
  ul {
    list-style: none;
    padding: 0 0 0 20px;
    margin: 0;
  }
`;
