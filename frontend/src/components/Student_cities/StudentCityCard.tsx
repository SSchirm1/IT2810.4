import React from "react";
import { Box, Image, Badge, PseudoBox } from "@chakra-ui/core";
import { StyledCard } from "./style";

type Props = {
  name: string;
  img: string;
};

export default function StudentCityCard() {
  const property = {
    imageUrl: "Senior 1080p",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "StudentbyNavn",
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4
  };

  return (
    <PseudoBox
      transition="all 200ms linear 0s"
      _hover={{
        boxShadow: "lg",
        transform: "translate(0px, -2px)"
      }}
      rounded="lg"
      boxShadow="md"
    >
      <a>
        <Image
          src={property.imageUrl}
          alt={property.imageAlt}
          h={["150px", "300px"]}
          w="100%"
        />
        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Badge rounded="full" px="2" variantColor="teal">
              New
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {property.beds} beds &bull; {property.baths} baths
            </Box>
          </Box>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {property.title}
          </Box>

          <Box>
            {property.formattedPrice}
            <Box as="span" color="gray.600" fontSize="sm">
              / wk
            </Box>
          </Box>
          <Box d="flex" mt="2" alignItems="center">
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {property.reviewCount} reviews
            </Box>
          </Box>
        </Box>
      </a>
    </PseudoBox>
  );
}
