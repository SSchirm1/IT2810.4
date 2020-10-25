import React from "react";
import {
  Box,
  Badge,
  PseudoBox,
  useColorMode,
  Icon,
  Button,
  Collapse,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  ModalBody
} from "@chakra-ui/core";
import StarRating from "./StarRating";
import Review from "./StudentCityReview";
import { StudentCity } from "../../store/interfaces";

type Props = {
  studentCity: StudentCity;
};

export default function StudentCityCard({ studentCity }: Props) {
  const { colorMode } = useColorMode();

  const [showDetails, setShowDetails] = React.useState(false);
  const handleToggleDetails = () => setShowDetails(!showDetails);

  const [showModal, setShowModal] = React.useState(false);
  const handleToggleModal = () => setShowModal(!showModal);
  return (
    <PseudoBox
      transition="all 200ms linear 0s"
      margin="10px"
      rounded="lg"
      boxShadow="md"
      bg={colorMode === "light" ? "white" : "gray.600"}
    >
      <a>
        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Badge rounded="full" px="2" variantColor="teal">
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
          <Collapse mt={2} isOpen={showDetails}>
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
            <Box as="span" color="gray.500" fontSize="sm">
              {`Vurderingene viser gjenomsnitt av ${studentCity.anmeldelserCount} anmeldelser`}
            </Box>
          </Collapse>
          <Button
            variantColor="teal"
            size="xs"
            onClick={handleToggleModal}
            mt="2"
          >
            {"Legg inn vurdering"}
          </Button>
          <Button
            variantColor="teal"
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
      <Review
        studentCity={studentCity}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </PseudoBox>
  );
}
