import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useColorMode,
  Box
} from "@chakra-ui/core";
import StarReview from "./StarReview";
import { StudentCity } from "../../../store/interfaces";
import axios from "axios";
import { API } from "../../../constants";
import { useActions } from "../../../hooks/useActions";
import { fetchStudentCities } from "../../../store/actions/actions";
import cogoToast from "cogo-toast";

type Props = {
  studentCity: StudentCity;
  showModal: boolean;
  setShowModal: Function;
};

export default function StudentCityCard({
  studentCity,
  showModal,
  setShowModal
}: Props) {
  const [priceRating, setPriceRating] = useState(0);
  const [locationRating, setLocationRating] = useState(0);
  const [commonAreaRating, setCommonAreaRating] = useState(0);
  const [surroundingsRating, setSurroundingsRating] = useState(0);
  const { colorMode } = useColorMode();
  const textColor = { light: "black", dark: "gray.100" };
  const actions = useActions({ fetchStudentCities });
  const handleSend = () => {
    axios
      .post(`${API}/studentbyer/${studentCity.id}/anmeldelser`, {
        vurderingLokasjon: locationRating,
        vurderingFellesAreal: commonAreaRating,
        vurderingTilstand: surroundingsRating,
        vurderingPris: priceRating,
        studentby: studentCity.id
      })
      .then(actions.fetchStudentCities());
    setShowModal(!showModal);
    setPriceRating(0);
    setLocationRating(0);
    setCommonAreaRating(0);
    setSurroundingsRating(0);
    cogoToast.success("Vurderingen din er sendt inn, takk for ditt bidrag!");
  };

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(!showModal)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={textColor[colorMode]}>
          Ny vurdering av {studentCity.navn}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody color={textColor[colorMode]}>
          <Box color="gray.500" mu="5">
            {"Gi studentbyen 1-5 stjerner på ulike vurderingsområder."}
          </Box>
          <label>Pris (verdi for pengene):</label>
          <StarReview value={priceRating} setValue={setPriceRating} />
          <label>Lokasjon (sentrumsnært? nært universitet?):</label>
          <StarReview value={locationRating} setValue={setLocationRating} />
          <label>Fellesarealene (størrelse og fasiliteter):</label>
          <StarReview value={commonAreaRating} setValue={setCommonAreaRating} />
          <label>Generell tilstand (slitt? trenger oppusning?):</label>
          <StarReview
            value={surroundingsRating}
            setValue={setSurroundingsRating}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            variant="ghost"
            mr={3}
            onClick={() => setShowModal(!showModal)}
          >
            Close
          </Button>
          <Button
            colorScheme="teal"
            onClick={handleSend}
            disabled={
              priceRating === 0 ||
              locationRating === 0 ||
              commonAreaRating === 0 ||
              surroundingsRating === 0
            }
          >
            Send
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
