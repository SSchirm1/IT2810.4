import React from "react";
import Search_parameters from "../search_parameters";
import Student_cities from "../Student_cities";
import { Box, color, useColorMode } from "@chakra-ui/core";

const Container = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: "gray.300", dark: "gray.600" };

  return <Box width="full" maxWidth="1280px" mx="auto" px={6} bg={bgColor[colorMode]}>
      <Search_parameters />
      <Student_cities />
    </Box>;
};

export default Container;
