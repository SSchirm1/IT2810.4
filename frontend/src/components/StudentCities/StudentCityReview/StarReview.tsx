import React, { useState } from "react";
import { Flex } from "@chakra-ui/core";
import { StyledIcon } from "./style";

type Props = {
  setValue: Function;
  value: number;
};

/*
 * Component for giving star rating. Clicking on a star updates the value.
 */
const StarRating = ({ setValue, value }: Props) => {
  const [hover, setHover] = useState(0);
  return (
    <Flex>
      {[...Array(5)].map((star, i) => {
        const ratingVal = i + 1;
        return (
          <label key={i} style={{ cursor: "pointer" }}>
            <input
              type="radio"
              name="rating"
              value={ratingVal}
              style={{ display: "none" }}
              onClick={() => setValue(ratingVal)}
            />
            <StyledIcon
              aria-label="Star"
              onMouseEnter={() => setHover(ratingVal)}
              onMouseLeave={() => setHover(0)}
              name="star"
              color={ratingVal <= (hover || value) ? "teal.500" : "gray.400"}
            />
          </label>
        );
      })}
    </Flex>
  );
};
export default StarRating;
