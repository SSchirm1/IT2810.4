import { StudentCity } from "./interfaces";
import {
  FAILURE_STUDENT_CITIES,
  FETCH_STUDENT_CITIES,
  PENDING_STUDENT_CITIES,
  SUCCESS_STUDENT_CITIES,
  StudentCitiesAction,
} from "./actionTypes";

export function fetchStudentCities(): StudentCitiesAction {
  return {
    type: FETCH_STUDENT_CITIES,
  };
}
export function pendingStudentCities(): StudentCitiesAction {
  return {
    type: PENDING_STUDENT_CITIES,
  };
}
export function successStudentCities(
  data: StudentCity[],
  count: number
): StudentCitiesAction {
  return {
    type: SUCCESS_STUDENT_CITIES,
    studentCities: data,
    count,
  };
}
export function failureStudentCities(): StudentCitiesAction {
  return {
    type: FAILURE_STUDENT_CITIES,
  };
}
