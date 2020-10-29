import { combineReducers } from "redux";
import {
  CitiesAction,
  StudentCitiesAction,
  FAILURE_CITIES,
  PENDING_CITIES,
  SetFilterAction,
  SET_FILTER,
  SUCCESS_CITIES,
  SUCCESS_STUDENT_CITIES,
  FAILURE_STUDENT_CITIES,
  PENDING_STUDENT_CITIES
} from "./actions/actiontypes";
import { CitiesState, FilterState, StudentCitiesState } from "./interfaces";

const INITIAL_CITIES_STATE: CitiesState = {
  cities: { phase: "NOT_ASKED" }
};

const INITIAL_FILTER_STATE: FilterState = {
  filter: { sort: "alphabetical", queryString: "", page: 0, city: "" }
};

const INITIAL_STUDENT_CITIES_STATE: StudentCitiesState = {
  studentCities: { phase: "NOT_ASKED" }
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

export function filterReducer(
  state = INITIAL_FILTER_STATE,
  action: SetFilterAction
): FilterState {
  switch (action.type) {
    case SET_FILTER: {
      return {
        ...state,
        filter: { ...state.filter, ...action.filter }
      };
    }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  cities: citiesReducer,
  studentCities: studentCitiesReducer,
  filter: filterReducer
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
