import { City } from "./interfaces";
import {
  CitiesAction,
  FAILURE_CITIES,
  FETCH_CITIES,
  PENDING_CITIES,
  SUCCESS_CITIES,
} from "./actionTypes";

export function fetchCities(): CitiesAction {
  return {
    type: FETCH_CITIES,
  };
}
export function pendingCities(): CitiesAction {
  return {
    type: PENDING_CITIES,
  };
}
export function successCities(data: City[]): CitiesAction {
  return {
    type: SUCCESS_CITIES,
    cities: data,
  };
}
export function failureCities(): CitiesAction {
  return {
    type: FAILURE_CITIES,
  };
}
