import { Box, useColorMode } from "@chakra-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import StudentCityCard from "./StudentCityCard";

export default function Student_cities() {
  const { colorMode } = useColorMode();
  const { studentCities } = useSelector((state: RootState) => {
    return {
      studentCities: state.studentCities.studentCities
    };
  });

  return (
    <Box
      width="full"
      marginTop="10px"
      marginBottom="10px"
      p={3}
      boxShadow="md"
      rounded="lg"
      bg={colorMode === "light" ? "gray.100" : "gray.700"}
    >
      {studentCities.map(studentCity => {
        return <StudentCityCard studentCity={studentCity} />;
      })}
    </Box>
  );
}
