import React from "react";
import {
  ChakraProvider,
  Flex,
  CSSReset,
  ColorModeProvider,
  useColorMode
} from "@chakra-ui/core";
import Container from "./components/Container";
import Header from "./components/Header";
function App() {
  return (
    <ChakraProvider>
      <ColorModeProvider options={{useSystemColorMode: true}}>
        <Flex direction="column" align="center" justify="center">
          <CSSReset />
          <Header />
          <Container />
        </Flex>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default App;
