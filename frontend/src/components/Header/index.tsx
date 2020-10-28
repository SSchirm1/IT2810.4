import React from "react";
import {
  Flex,
  useColorMode,
  IconButton,
  Box,
  Image,
  Heading,
  Spacer
} from "@chakra-ui/core";

import { BsMoon, BsSun, BsHouse } from "react-icons/bs";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: "gray.300", dark: "gray.700" };
  const textColor = { light: "gray.800", dark: "gray.100" };
  return (
    <Flex
      w="100vw"
      bg={bgColor[colorMode]}
      color={textColor[colorMode]}
      fontSize={["md", "lg", "xl", "xl"]}
      h="7vh"
      align="center"
      boxShadow="md"
      p={2}
    >
      <Spacer />
      <Heading position="sticky">Studentbyer</Heading>
      <Spacer />
      <Box justifySelf="right">
        <IconButton
          rounded="full"
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <BsSun /> : <BsMoon />}
          aria-label="none"
          justifySelf="right"
        >
          Change Color Mode
        </IconButton>
      </Box>
    </Flex>
  );
}
