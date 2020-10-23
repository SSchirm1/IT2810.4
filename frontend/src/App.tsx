import React, { useEffect } from "react";
import {
  ThemeProvider,
  Flex,
  CSSReset,
  ColorModeProvider
} from "@chakra-ui/core";
import Container from "./components/Container";
import Header from "./components/Header";

function App() {
  return (
    <ThemeProvider>
      <ColorModeProvider>
        <Flex direction="column" align="center" justify="center">
          <CSSReset />
          <Header />
          <Container />
        </Flex>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
