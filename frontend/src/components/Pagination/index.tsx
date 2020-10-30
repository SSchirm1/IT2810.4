import React, { useEffect, useState } from "react";
import { Box, IconButton, Text, Button } from "@chakra-ui/core";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { OFFSET } from "../../constants";
import { setFilter } from "../../store/filter/actions";
import { useActions } from "../../hooks/useActions";
import { range } from "./helpers";

/**
 * Commponent for pagination. Updates filter in store onClick.
 */
const Pagination = () => {
  const { studentCities, filter } = useSelector((state: RootState) => {
    return {
      studentCities: state.studentCitiesState.studentCities,
      filter: state.filterState.filter
    };
  });

  const [count, setCount] = useState(0);
  const currentPage = filter.page ?? 0;

  useEffect(() => {
    const count =
      studentCities.phase === "SUCCESS" ? studentCities.count ?? 0 : 0;
    count && setCount(count);
  }, [studentCities.phase, count]); // eslint-disable-line react-hooks/exhaustive-deps

  const actions = useActions({ setFilter });

  const changePage = (pageNum: number) => {
    actions.setFilter({ ...filter, page: pageNum });
  };

  const from = 0;
  const to = Math.ceil(count / OFFSET);
  const pages = range(from, to);

  return (
    <Box width="full" marginTop="10px" align="center">
      <IconButton
        icon={<ArrowBackIcon />}
        aria-label="forrige"
        bg="light"
        color="gray.400"
        disabled={currentPage === from ? true : false}
        onClick={() => changePage(currentPage - 1)}
        padding={[0, 1]}
        isRound
      />
      {pages.map(pageNum => (
        <Button
          colorScheme="teal"
          variant={pageNum === currentPage ? "solid" : "ghost"}
          disabled={pageNum === currentPage ? true : false}
          onClick={() => changePage(pageNum)}
          padding={[0, 1]}
          key={pageNum}
        >
          <Text weight={pageNum === currentPage ? "bold" : "regular"}>
            {pageNum + 1}
          </Text>
        </Button>
      ))}
      <IconButton
        icon={<ArrowForwardIcon />}
        aria-label="neste"
        bg="light"
        disabled={currentPage === to - 1 ? true : false}
        color="gray.400"
        onClick={() => changePage(currentPage + 1)}
        padding={[0, 1]}
        isRound
      />
    </Box>
  );
};

export default Pagination;
