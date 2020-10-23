import React from "react";
import logo from "./home.svg";
import {
  Flex,
  Stack,
  useColorMode,
  IconButton,
  Box,
  Image
} from "@chakra-ui/core";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: "gray.300", dark: "gray.600" };
  const textColor = { light: "black", dark: "gray.100" };
  return (
    <Flex
      w="100vw"
      bg={bgColor[colorMode]}
      align="center"
      color={textColor[colorMode]}
      justify="center"
      fontSize={["md", "lg", "xl", "xl"]}
      h="7vh"
      boxShadow="md"
      p={2}
    >
      <Flex w={["100vw", "100vw", "80vw", "80vw"]} justify="space-around">
        <Stack
          spacing={8}
          color={textColor[colorMode]}
          justify="center"
          align="center"
          isInline
        >
          <Box>
            <Image h="4vh" src={logo} alt="house" />
          </Box>
          <Box position="sticky">Studentbyer</Box>
        </Stack>
        <Box>
          <IconButton
            rounded="full"
            onClick={toggleColorMode}
            icon={colorMode === "light" ? "moon" : "sun"}
            aria-label="none"
          >
            Change Color Mode
          </IconButton>
        </Box>
      </Flex>
    </Flex>
  );
}
