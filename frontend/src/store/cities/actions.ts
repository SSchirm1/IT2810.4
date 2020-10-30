import { City } from "./interfaces";
import {
  CitiesAction,
  FAILURE_CITIES,
  FETCH_CITIES,
  PENDING_CITIES,
  SUCCESS_CITIES
} from "./actionTypes";

// Inspired by: https://medium.com/unpacking-trunk-club/using-redux-and-redux-saga-to-handle-api-calls-18964d234660

export function fetchCities(): CitiesAction {
  return {
    type: FETCH_CITIES
  };
}
export function pendingCities(): CitiesAction {
  return {
    type: PENDING_CITIES
  };
}
export function successCities(data: City[]): CitiesAction {
  return {
    type: SUCCESS_CITIES,
    cities: data
  };
}
export function failureCities(): CitiesAction {
  return {
    type: FAILURE_CITIES
  };
}
