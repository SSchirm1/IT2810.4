import { StudentCity, City } from "../interfaces";
import Filter from "./interfaces";

export const FETCH_CITIES = "FETCH_CITIES";
export const SUCCESS_CITIES = "SUCCESS_CITIES";
export const PENDING_CITIES = "PENDING_CITIES";
export const FAILURE_CITIES = "FAILURE_CITIES";

export const FETCH_STUDENT_CITIES = "FETCH_STUDENT_CITIES";
export const SUCCESS_STUDENT_CITIES = "SUCCESS_STUDENT_CITIES";
export const PENDING_STUDENT_CITIES = "PENDING_STUDENT_CITIES";
export const FAILURE_STUDENT_CITIES = "FAILURE_STUDENT_CITIES";

export const SET_FILTER = "SET_FILTER";


// CITIES:
export interface FetchCitiesAction {
  type: typeof FETCH_CITIES;
}

export interface PendingCitiesAction {
  type: typeof PENDING_CITIES;
}

export interface SuccessCitiesAction {
  type: typeof SUCCESS_CITIES;
  cities: City[];
}

export interface FailureCitiesAction {
  type: typeof FAILURE_CITIES;
}

export type CitiesAction = FetchCitiesAction | PendingCitiesAction | SuccessCitiesAction | FailureCitiesAction;

// STUDENTCITIES

export interface FetchStudentCitiesAction {
  type: typeof FETCH_STUDENT_CITIES;
}

export interface PendingStudentCitiesAction {
  type: typeof PENDING_STUDENT_CITIES;
}

export interface SuccessStudentCitiesAction {
  type: typeof SUCCESS_STUDENT_CITIES;
  studentCities: StudentCity[];
  count: number;
}

export interface FailureStudentCitiesAction {
  type: typeof FAILURE_STUDENT_CITIES  ;
}

export type StudentCitiesAction = FetchStudentCitiesAction | PendingStudentCitiesAction | SuccessStudentCitiesAction | FailureStudentCitiesAction;


export interface SetFilterAction {
  type: typeof SET_FILTER;
  filter: Filter;
}

