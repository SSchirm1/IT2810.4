import React from "react";
import { Box, Icon } from "@chakra-ui/core";

type Props = {
  name: string;
  rating: string;
};

export default function StarRating({ name, rating }: Props) {
  const rating_number: number = Math.round(+rating * 100) / 100;
  return (
    <Box d="flex" mt="2" alignItems="center">
      {name}
      <Box ml="3">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <Icon
              name="star"
              key={i}
              color={i + 0.5 < rating_number ? "teal.500" : "gray.300"}
            />
          ))}
      </Box>
      <Box color="gray.500" ml="3">
        {"(" + rating_number + ")"}
      </Box>
    </Box>
  );
}
