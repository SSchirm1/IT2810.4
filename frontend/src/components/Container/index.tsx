import React from "react";
import SearchParameters from "../SearchParameters";
import StudentCities from "../StudentCities";
import { Box, useColorMode } from "@chakra-ui/core";

/*
 * component containing the main body of the page (SearchParameters and StudentCities).
 */
const Container = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.600" };

  return (
    <Box width="100vw" mx="auto" px={6} bg={bgColor[colorMode]}>
      <Box width="full" mx="auto" maxWidth="1280px" minHeight="100vh">
        <SearchParameters />
        <StudentCities />
      </Box>
    </Box>
  );
};

export default Container;
