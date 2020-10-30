import React, { useEffect } from "react";
import { Box, useColorMode, Select, Input } from "@chakra-ui/core";
import { useActions } from "../../hooks/useActions";
import { RootState } from "../../store/reducers";
import { useSelector } from "react-redux";
import { Sort } from "../../store/actions/interfaces";
import { setFilter, fetchCities } from "../../store/actions/actions";

/*
 * Searching component. Has input-field, select button with cities and select button for sorting.
 * Each update of one field/select leads to a fetch of student cities from the database, using the setFilter action.
 */
const SearchParameters = () => {
  const { colorMode } = useColorMode();
  const { cities } = useSelector((state: RootState) => {
    return {
      cities: state.cities.cities,
    };
  });

  const actions = useActions({ setFilter, fetchCities });
  const filter = useSelector((state: RootState) => state.filter.filter);
  const [value, setValue] = React.useState("");

  useEffect(() => {
    updateSort("alphabetical");
    actions.fetchCities();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateSort = (value: Sort) => {
    actions.setFilter({ ...filter, sort: value, page: 0 });
  };
  const updateCity = (value: string) => {
    actions.setFilter({ ...filter, city: value, page: 0 });
  };

  const handleSearch = (value: string) => {
    actions.setFilter({
      ...filter,
      queryString: value,
      page: 0,
    });
    setValue(value);
  };
  const currentCities = cities.phase === "SUCCESS" ? cities.data ?? [] : [];

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
        onChange={(event) => updateCity(event.currentTarget.value)}
        marginBottom="5px"
        bg={colorMode === "light" ? "white" : "gray.700"}
        data-testid="select-cities"
      >
        <option value="">Alle byer</option>
        {currentCities.map((city) => {
          return (
            <option key={city.id} value={city.id}>
              {city.navn}
            </option>
          );
        })}
      </Select>
      <Select
        onChange={(event) => updateSort(event.currentTarget.value as Sort)}
        bg={colorMode === "light" ? "white" : "gray.700"}
        data-testid="select-sort"
      >
        <option value="alphabetical">{"Alfabetisk A -> Å"}</option>
        <option value="inverseAlphabetical">{"Alfabetisk Å -> A"}</option>
        <option value="ratingHighToLow">{"Total vurdering høy -> lav"}</option>
        <option value="ratingLowToHigh">{"Total vurdering lav -> høy"}</option>
      </Select>
    </Box>
  );
};
export default SearchParameters;
