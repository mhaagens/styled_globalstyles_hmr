import React from "react";
import { hot } from "react-hot-loader";
import styled, { createGlobalStyle } from "styled-components";
import { normalize } from "polished";

class App extends React.Component {
  render() {
    return (
      <>
        <h1>Hello World</h1>
        <GlobalStyle />
      </>
    );
  }
}

const Container = styled.div`
  background: purple;

  h1 {
    margin: 0;
  }
`

const GlobalStyle = createGlobalStyle`
  ${normalize()}

  #root {
    min-height: 100vh;
    background: red;
  }
`;

export default hot(module)(App);
