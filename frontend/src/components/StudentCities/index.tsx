import { Box, useColorMode, Flex, Spinner } from "@chakra-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import StudentCityCard from "./StudentCityCard";
import Pagination from "../Pagination";
import cogoToast from "cogo-toast";

/*
 * Component with studentCityCards and Pagination.
 */
const StudentCities = () => {
  const { colorMode } = useColorMode();
  const { studentCities } = useSelector((state: RootState) => {
    return {
      studentCities: state.studentCitiesState.studentCities
    };
  });

  const currentStudentCities =
    studentCities.phase === "SUCCESS" ? studentCities.data ?? [] : [];

  switch (studentCities.phase) {
    case "NOT_ASKED":
    case "PENDING":
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
          <Flex justify="center">
            <Box color={colorMode === "light" ? "gray.700" : "gray.100"}>
              <Spinner
                thickness="4px"
                speed="0.65s"
                color="teal.300"
                size="xl"
              />
            </Box>
          </Flex>
        </Box>
      );

    case "FAILURE":
      cogoToast.error("Fikk ikke kontakt med serveren.");
      return (
        <Flex justify="center">
          <Box color={colorMode === "light" ? "gray.700" : "gray.100"}>
            Ingen studentbyer samsvarer med søket
          </Box>
        </Flex>
      );
    default:
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
                <StudentCityCard
                  key={studentCity.id}
                  studentCity={studentCity}
                />
              );
            })
          ) : (
            <Flex justify="center">
              <Box color={colorMode === "light" ? "gray.700" : "gray.100"}>
                Ingen studentbyer samsvarer med søket
              </Box>
            </Flex>
          )}
          {currentStudentCities.length ? <Pagination /> : ""}
        </Box>
      );
  }
};
export default StudentCities;
