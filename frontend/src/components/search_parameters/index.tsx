import React, { useEffect } from "react";
import { Box, useColorMode, Select } from "@chakra-ui/core";
import { GetCities, GetStudentCities } from "../../store/actions/actions";
import { useActions } from "../../hooks/useActions";
import { RootState } from "../../store/reducers";
import { useSelector } from "react-redux";
import useFilter from "../../hooks/Filter/filter";
import { Sort } from "../../hooks/Filter/interfaces";

export default function Search_parameters() {
  const { colorMode } = useColorMode();
  const { setFilter, filter } = useFilter();
  const { cities } = useSelector((state: RootState) => {
    return {
      count: state.studentCities.count,
      studentCities: state.studentCities.studentCities,
      cities: state.cities.cities
    };
  });
  const actions = useActions({ GetCities, GetStudentCities });

  useEffect(() => {
    //TODO: kanskje denne burde blitt gjort et annet sted?
    updateSort("alphabetical");
    actions.GetCities();
  }, []);

  const updateSort = (value: Sort) => {
    console.log("updateSort");
    setFilter({ ...filter, sort: value });
  };
  const updateCity = (value: string) => {
    console.log("updateCity");
    setFilter({ ...filter, city: value });
  };

  return (
    <Box
      width="full"
      marginTop="10px"
      marginBottom="10px"
      p={3}
      boxShadow="md"
      rounded="lg"
      bg={colorMode === "light" ? "" : "gray.700"}
    >
      <Select onChange={event => updateCity(event.currentTarget.value)}>
        <option value="">Alle byer</option>
        {cities.map(city => {
          return <option value={city.id}>{city.navn}</option>;
        })}
      </Select>
      <Select onChange={event => updateSort(event.currentTarget.value as Sort)}>
        <option value="alphabetical">{"Alfabetisk A -> Å"}</option>
        <option value="inverseAlphabetical">{"Alfabetisk Å -> A"}</option>
        <option value="ratingHighToLow">{"Total vurdering høy -> lav"}</option>
        <option value="ratingLowToHigh">{"Total vurdering lav -> høy"}</option>
      </Select>
    </Box>
  );
}
