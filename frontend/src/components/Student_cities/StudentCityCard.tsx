import React from "react";
import { Box, Badge, PseudoBox, useColorMode, Icon } from "@chakra-ui/core";

type Props = {
  name: string;
  landlord: string;
  totalRating: string;
  city: string;
};

export default function StudentCityCard({
  name,
  landlord,
  totalRating,
  city
}: Props) {
  const property = {
    title: name,
    landlord: landlord,
    rating: totalRating,
    city: city
  };
  const { colorMode } = useColorMode();
  console.log(totalRating);
  const rating_number: number = +totalRating;

  return (
    <PseudoBox
      transition="all 200ms linear 0s"
      _hover={{
        boxShadow: "lg",
        transform: "translate(0px, -2px)"
      }}
      margin="10px"
      rounded="lg"
      boxShadow="md"
      bg={colorMode === "light" ? "white" : "gray.600"}
    >
      <a>
        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Badge rounded="full" px="2" variantColor="teal">
              {city}
            </Badge>
          </Box>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h1"
            lineHeight="tight"
            isTruncated
          >
            {property.title}
          </Box>
          <Box d="flex" mt="2" alignItems="center">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <Icon
                  name="star"
                  key={i}
                  color={i < rating_number ? "teal.500" : "gray.300"}
                />
              ))}
          </Box>

          <Box as="span" color="gray.500" fontSize="sm">
            {"utleier:"} {property.landlord}
          </Box>
        </Box>
      </a>
    </PseudoBox>
  );
}
