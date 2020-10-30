import {
  StudentCitiesAction,
  SUCCESS_STUDENT_CITIES,
  FAILURE_STUDENT_CITIES,
  PENDING_STUDENT_CITIES
} from "./actionTypes";
import { StudentCitiesState } from "./interfaces";

const INITIAL_STUDENT_CITIES_STATE: StudentCitiesState = {
  studentCities: { phase: "NOT_ASKED" }
};

export function studentCitiesReducer(
  state = INITIAL_STUDENT_CITIES_STATE,
  action: StudentCitiesAction
): StudentCitiesState {
  switch (action.type) {
    case SUCCESS_STUDENT_CITIES: {
      return {
        ...state,
        studentCities: {
          phase: "SUCCESS",
          data: action.studentCities,
          count: action.count
        }
      };
    }
    case FAILURE_STUDENT_CITIES: {
      return {
        ...state,
        studentCities: { phase: "FAILURE", error: null }
      };
    }
    case PENDING_STUDENT_CITIES: {
      return {
        ...state,
        studentCities: { phase: "PENDING", count: null }
      };
    }
    default:
      return state;
  }
}
