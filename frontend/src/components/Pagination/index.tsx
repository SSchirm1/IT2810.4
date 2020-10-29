import React from "react";
import { Box, IconButton, Text, Button } from "@chakra-ui/core";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { RootState } from "../../store/reducers";
import { useSelector } from "react-redux";
import { OFFSET } from "../../constants";

export const range = (...args: number[]) =>
  args.length > 1 && args[1] < args[0]
    ? []
    : Array(
        args.length > 1
          ? Math.round((args[1] - args[0]) / (args.length > 2 ? args[2] : 1))
          : args[0]
      )
        .fill(null)
        .map((_, i) =>
          args.length > 1 ? args[0] + (args.length > 2 ? args[2] : 1) * i : i
        );

type Props = {
  setCurrentPage: Function;
  currentPage: number;
};

const Pagination = ({ setCurrentPage, currentPage }: Props) => {
  const { studentCities } = useSelector((state: RootState) => {
    return {
      studentCities: state.studentCities.studentCities
    };
  });
  const count = studentCities.phase == "SUCCESS" ? studentCities.count ?? 0 : 0;

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
