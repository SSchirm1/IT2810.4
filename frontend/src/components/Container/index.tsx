import React from "react";
import Search_parameters from "../search_parameters";
import Student_cities from "../Student_cities";
import { Box } from "@chakra-ui/core";

const Container = () => (
  <Box width="full" maxWidth="1280px" mx="auto" px={6}>
    <Search_parameters />
    <Student_cities />
  </Box>
);

export default Container;
