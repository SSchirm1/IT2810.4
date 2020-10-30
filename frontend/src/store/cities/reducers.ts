import {
  CitiesAction,
  FAILURE_CITIES,
  PENDING_CITIES,
  SUCCESS_CITIES
} from "./actionTypes";
import { CitiesState } from "./interfaces";

const INITIAL_CITIES_STATE: CitiesState = {
  cities: { phase: "NOT_ASKED" }
};

export function citiesReducer(
  state = INITIAL_CITIES_STATE,
  action: CitiesAction
): CitiesState {
  switch (action.type) {
    case SUCCESS_CITIES: {
      return {
        ...state,
        cities: { phase: "SUCCESS", data: action.cities, count: null }
      };
    }
    case FAILURE_CITIES: {
      return {
        ...state,
        cities: { phase: "FAILURE", error: null }
      };
    }
    case PENDING_CITIES: {
      return {
        ...state,
        cities: { phase: "PENDING", count: null }
      };
    }
    default:
      return state;
  }
}
