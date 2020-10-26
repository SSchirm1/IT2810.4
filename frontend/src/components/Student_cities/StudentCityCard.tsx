import React from "react";
import {
  Box,
  Badge,
  useColorMode,
  Icon,
  Button,
  Collapse
} from "@chakra-ui/core";
import StarRating from "./StarRating";
import { StudentCity } from "../../store/interfaces";

type Props = {
  studentCity: StudentCity;
};

export default function StudentCityCard({ studentCity }: Props) {
  const { colorMode } = useColorMode();

  const [showDetails, setShowDetails] = React.useState(false);
  const handleToggleDetails = () => setShowDetails(!showDetails);

  const [showModal, setShowModal] = React.useState(false);
  const handleToggleModal = () => setShowModal(!showDetails);

  return (
    <Box
      transition="all 200ms linear 0s"
      margin="10px"
      rounded="lg"
      boxShadow="md"
      bg={colorMode === "light" ? "white" : "gray.600"}
      color={colorMode === "light" ? "black" : "white"}
    >
      <a>
        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Badge rounded="full" px="2" colorScheme="teal">
              {studentCity.by.navn}
            </Badge>
          </Box>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h1"
            lineHeight="tight"
            isTruncated
          >
            {studentCity.navn}
          </Box>
          <Box as="span" color="gray.500" fontSize="sm">
            {"utleier:"} {studentCity.utleier}
          </Box>
          <StarRating
            name={"Total vurdering: "}
            rating={studentCity.vurderingTotal}
          />
          <Collapse in={showDetails}>
            <StarRating
              name={"Fellesareal: "}
              rating={studentCity.vurderingFellesAreal}
            />
            <StarRating
              name={"Lokasjon: "}
              rating={studentCity.vurderingLokasjon}
            />
            <StarRating name={"Pris: "} rating={studentCity.vurderingPris} />
            <StarRating
              name={"Tilstand: "}
              rating={studentCity.vurderingTilstand}
            />
          </Collapse>
          <Button
            colorScheme="teal"
            size="xs"
            onClick={handleToggleModal}
            mt="2"
          >
            {"Legg inn vurdering"}
          </Button>
          <Button
            colorScheme="teal"
            size="xs"
            variant="outline"
            onClick={handleToggleDetails}
            mt="2"
            ml="4"
          >
            {showDetails ? "Skjul detaljer" : "Vis detaljer"}
          </Button>
        </Box>
      </a>
    </Box>
  );
}
