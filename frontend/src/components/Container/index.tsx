import React from "react";
import Search_parameters from "../search_parameters";
import Student_cities from "../Student_cities";
import { Box, useColorMode } from "@chakra-ui/core";
import Pagination from "../Pagination";

const Container = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.600" };

  return (
    <Box width="100vw" mx="auto" px={6} bg={bgColor[colorMode]}>
      <Box width="full" mx="auto" maxWidth="1280px" minHeight="100vh">
        <Search_parameters />
        <Student_cities />
      </Box>
    </Box>
  );
};

export default Container;
