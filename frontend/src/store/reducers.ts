import { combineReducers } from "redux";
import {
  GET_CITIES,
  GET_STUDENTCITIES,
  GET_STUDENTCITY,
  GET_CITY,
  SetFilterAction
} from "./actions/actiontypes";
import { apiActionTypes } from "./actions/actiontypes";
import {
  CitiesState,
  StudentCitiesState,
  StudentCityState,
  CityState,
  FilterState
} from "./interfaces";

import store from "../store/store";

import { GetStudentCities } from "./actions/actions";
import Filter from "./actions/interfaces";
import { useActions } from "../hooks/useActions";

const INITIAL_CITIES_STATE: CitiesState = {
  cities: []
};

export function citiesReducer(
  state = INITIAL_CITIES_STATE,
  action: apiActionTypes
): CitiesState {
  switch (action.type) {
    case GET_CITIES: {
      return {
        ...state,
        cities: action.cities
      };
    }
    default:
      return state;
  }
}

const INITIAL_STUDENTCITIES_STATE: StudentCitiesState = {
  studentCities: [],
  count: 0
};

export function studentCitiesReducer(
  state = INITIAL_STUDENTCITIES_STATE,
  action: apiActionTypes
): StudentCitiesState {
  switch (action.type) {
    case GET_STUDENTCITIES: {
      return {
        ...state,
        studentCities: action.studentCities,
        count: action.count
      };
    }
    default:
      return state;
  }
}

const INITIAL_STUDENTCITY_STATE: StudentCityState = {
  studentCity: undefined
};

export function studentCityReducer(
  state = INITIAL_STUDENTCITY_STATE,
  action: apiActionTypes
): StudentCityState {
  switch (action.type) {
    case GET_STUDENTCITY: {
      return {
        ...state,
        studentCity: action.studentCity
      };
    }
    default:
      return state;
  }
}

const INITIAL_CITY_STATE: CityState = {
  city: undefined
};

export function cityReducer(
  state = INITIAL_CITY_STATE,
  action: apiActionTypes
): CityState {
  switch (action.type) {
    case GET_CITY: {
      return {
        ...state,
        city: action.city
      };
    }
    default:
      return state;
  }
}

const INITIAL_FILTER_STATE: FilterState = {
  filter: { sort: "alphabetical", queryString: "", page: 0, city: "" }
};

export function filterReducer(
  state = INITIAL_FILTER_STATE,
  action: SetFilterAction
): FilterState {
  return { filter: { ...state.filter, ...action.filter } };
}

const rootReducer = combineReducers({
  city: cityReducer, //TODO: add taskreducer and name is task for future use.
  cities: citiesReducer,
  studentCity: studentCityReducer,
  studentCities: studentCitiesReducer,
  filter: filterReducer
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
