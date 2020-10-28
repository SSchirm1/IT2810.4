import React, { useEffect } from "react";
import { Box, useColorMode, Select, Input } from "@chakra-ui/core";
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
  const [value, setValue] = React.useState("");

  useEffect(() => {
    //TODO: kanskje denne burde blitt gjort et annet sted?
    updateSort("alphabetical");
    actions.GetCities();
  }, []);

  const updateSort = (value: Sort) => {
    setFilter({ ...filter, sort: value });
  };
  const updateCity = (value: string) => {
    setFilter({ ...filter, city: value });
  };

  const handleSearch = (value: string) => {
    setFilter({
      ...filter,
      queryString: value
    });
    setValue(value);
  };

  return (
    <Box
      width="full"
      marginTop="10px"
      marginBottom="10px"
      p={3}
      boxShadow="md"
      rounded="lg"
      bg={colorMode === "light" ? "gray.100" : "gray.700"}
      color={colorMode === "light" ? "gray.900" : "gray.100"}
    >
      <Input
        _placeholder={{ color: "gray.500" }}
        variant="outline"
        value={value}
        onChange={(event: any) => handleSearch(event.target.value)}
        placeholder="søk etter studentby"
        marginBottom="5px"
        bg={colorMode === "light" ? "white" : "gray.700"}
      />
      <Select
        onChange={event => updateCity(event.currentTarget.value)}
        marginBottom="5px"
        bg={colorMode === "light" ? "white" : "gray.700"}
      >
        <option value="">Alle byer</option>
        {cities.map(city => {
          return (
            <option key={city.id} value={city.id}>
              {city.navn}
            </option>
          );
        })}
      </Select>
      <Select
        onChange={event => updateSort(event.currentTarget.value as Sort)}
        bg={colorMode === "light" ? "white" : "gray.700"}
      >
        <option value="alphabetical">{"Alfabetisk A -> Å"}</option>
        <option value="inverseAlphabetical">{"Alfabetisk Å -> A"}</option>
        <option value="ratingHighToLow">{"Total vurdering høy -> lav"}</option>
        <option value="ratingLowToHigh">{"Total vurdering lav -> høy"}</option>
      </Select>
    </Box>
  );
}
