import { StudentCity } from "./interfaces";

export const FETCH_STUDENT_CITIES = "FETCH_STUDENT_CITIES";
export const SUCCESS_STUDENT_CITIES = "SUCCESS_STUDENT_CITIES";
export const PENDING_STUDENT_CITIES = "PENDING_STUDENT_CITIES";
export const FAILURE_STUDENT_CITIES = "FAILURE_STUDENT_CITIES";

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
  type: typeof FAILURE_STUDENT_CITIES;
}

export type StudentCitiesAction =
  | FetchStudentCitiesAction
  | PendingStudentCitiesAction
  | SuccessStudentCitiesAction
  | FailureStudentCitiesAction;
