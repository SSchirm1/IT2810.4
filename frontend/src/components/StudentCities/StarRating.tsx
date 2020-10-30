import React from "react";
import { Grid, GridItem, useColorMode } from "@chakra-ui/core";
import { StarIcon } from "@chakra-ui/icons";

type Props = {
  name: string;
  rating: string;
};

export default function StarRating({ name, rating }: Props) {
  const ratingNumber = Math.round(+rating * 100) / 100;
  const { colorMode } = useColorMode();
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
      <GridItem
        colSpan={1}
        color={colorMode === "light" ? "gray.600" : "gray.400"}
        ml="3"
      >
        {"(" + ratingNumber.toFixed(2) + ")"}
      </GridItem>
    </Grid>
  );
}
