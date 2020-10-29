import { Box, useColorMode, Heading, Flex } from "@chakra-ui/core";
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

  const currentStudentCities = studentCities.phase == "SUCCESS" ? studentCities.data ?? [] : [];

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
      {currentStudentCities.length ? (
        currentStudentCities.map(studentCity => {
          return (
            <StudentCityCard key={studentCity.id} studentCity={studentCity} />
          );
        })
      ) : (
        <Flex justify="center">
          <Box color={colorMode === "light" ? "gray.700" : "gray.100"}>
            Ingen studentbyer samsvarer med søket
          </Box>
        </Flex>
      )}
    </Box>
  );
}
