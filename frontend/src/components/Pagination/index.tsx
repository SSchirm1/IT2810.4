import React from "react";
import { Box, IconButton, Text, Button } from "@chakra-ui/core";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

import { GetCities } from "../../store/actions/actions";
import { useActions } from "../../hooks/useActions";
import { RootState } from "../../store/reducers";
import { useSelector } from "react-redux";
import { OFFSET } from "../../store/actions/actions";
import { setFilter } from "../../store/actions/actions";
import { range } from "./helpers";

const Pagination = () => {
  const { count, filter } = useSelector((state: RootState) => {
    return {
      count: state.studentCities.count,
      filter: state.filter.filter
    };
  });
  const actions = useActions({ GetCities, setFilter });
  const setCurrentPage = (pageNum: number) => {
    actions.setFilter({ ...filter, page: pageNum });
    //actions.GetStudentCities({ ...filter, page: pageNum });
  };
  const currentPage = filter.page;
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
        hover
        onClick={() => setCurrentPage(currentPage - 1)}
        padding={[0, 1]}
        isRound
      />
      {pages.map(pageNum => (
        <Button
          colorScheme="teal"
          variant={pageNum === currentPage ? "solid" : "ghost"}
          hover
          disabled={pageNum === currentPage ? true : false}
          onClick={() => setCurrentPage(pageNum)}
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
        hover
        disabled={currentPage === to - 1 ? true : false}
        color="gray.400"
        onClick={() => setCurrentPage(currentPage + 1)}
        padding={[0, 1]}
        isRound
      />
    </Box>
  );
};

export default Pagination;
