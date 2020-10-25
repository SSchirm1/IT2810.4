import React, { useState } from "react";
import {
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  ModalBody
} from "@chakra-ui/core";
import StarReview from "./StarReview";
import { StudentCity } from "../../../store/interfaces";
import { setFlagsFromString } from "v8";

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
  const toast = useToast();
  const [priceRating, setPriceRating] = useState(0);
  const [locationRating, setLocationRating] = useState(0);
  const [commonAreaRating, setCommonAreaRating] = useState(0);
  const [surroundingsRating, setSurroundingsRating] = useState(0);

  const handleSend = () => {
    setShowModal(!showModal);
    setPriceRating(0);
    setLocationRating(0);
    setCommonAreaRating(0);
    setSurroundingsRating(0);
    toast({
      title: "Vurdering sendt.",
      description:
        "Vurderingen din er sendt inn, og vil nå benyttes til å regne ut nye gjennomsnittsvurderinger for studentbyen. Takk for ditt bidrag.",
      status: "success",
      duration: 9000,
      isClosable: true
    });
  };

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(!showModal)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ny vurdering av {studentCity.navn}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <label>Pris (verdi for pengene): </label>
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
          <Button variantColor="teal" onClick={handleSend}>
            Send
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
