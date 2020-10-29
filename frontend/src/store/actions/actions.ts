import { City, StudentCity } from "../interfaces";
import {
  CitiesAction,
  FAILURE_CITIES,
  FAILURE_STUDENT_CITIES,
  FETCH_CITIES,
  FETCH_STUDENT_CITIES,
  PENDING_CITIES,
  PENDING_STUDENT_CITIES,
  SetFilterAction,
  SET_FILTER,
  SUCCESS_CITIES,
  SUCCESS_STUDENT_CITIES,
  StudentCitiesAction
} from "./actiontypes";

import Filter from "./interfaces";

// Inspired by: https://medium.com/unpacking-trunk-club/using-redux-and-redux-saga-to-handle-api-calls-18964d234660

export function setFilter(filter: Filter): SetFilterAction {
  return {
    type: SET_FILTER,
    filter
  };
}

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
  console.log("data success: ", data);
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


export function fetchStudentCities(): StudentCitiesAction {
  return {
    type: FETCH_STUDENT_CITIES
  };
}
export function pendingStudentCities(): StudentCitiesAction {
  return {
    type: PENDING_STUDENT_CITIES
  };
}
export function successStudentCities(data: StudentCity[], count: number): StudentCitiesAction {
  console.log("data success: ", data);
  return {
    type: SUCCESS_STUDENT_CITIES,
    studentCities: data,
    count
  };
}
export function failureStudentCities(): StudentCitiesAction {
  return {
    type: FAILURE_STUDENT_CITIES
  };
}