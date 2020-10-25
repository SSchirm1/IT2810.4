import React from "react";
import { Box, Grid, GridItem, Icon, useColorMode } from "@chakra-ui/core";
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
    <Grid
      templateColumns={[
        "repeat(8, 1fr)",
        "repeat(5, 0.4fr)",
        "repeat(5, 0.1fr)"
      ]}
      color={textColor[colorMode]}
    >
      <GridItem colSpan={[5, 2]}>{name}</GridItem>
      <GridItem ml="3" colSpan={[5, 2]}>
        {Array(5)
          .fill("")
          .map((_, i) => (
            <StarIcon
              name="star"
              key={i}
              color={i + 0.5 < ratingNumber ? "teal.500" : "gray.400"}
            />
          ))}
      </GridItem>
      <GridItem colSpan={1} color="gray.500" ml="3">
        {"(" + ratingNumber + ")"}
      </GridItem>
    </Grid>
  );
}
