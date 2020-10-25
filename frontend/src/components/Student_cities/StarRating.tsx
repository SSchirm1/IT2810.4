import React from "react";
import { Box, Grid, Icon, useColorMode } from "@chakra-ui/core";
import { StarIcon } from "@chakra-ui/icons";

type Props = {
  name: string;
  rating: string;
};

export default function StarRating({ name, rating }: Props) {
  const ratingNumber = Math.round(+rating * 100) / 100;
  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = { light: "black", dark: "gray.100" };


  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={6} color={textColor[colorMode]}>
      {name}
      <Box ml="3">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <StarIcon
            name="star"
            key={i}
            color={i + 0.5 < ratingNumber ? "teal.500" : "gray.300"}
            />
            ))}
      </Box>
      <Box color="gray.500" ml="3">
        {"(" + ratingNumber + ")"}
      </Box>
            </Grid>
  );
}
