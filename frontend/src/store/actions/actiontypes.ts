import { StudentCity, City } from "../interfaces";
import Filter from "./interfaces";

export const GET_STUDENTCITIES = "GET_STUDENTCITIES";
export const GET_STUDENTCITY = "GET_STUDENTCITY";

export const GET_CITIES = "GET_CITIES";
export const GET_CITY = "GET_CITY";
export const SET_FILTER = "SET_FILTER";

interface GetStudentCityAction {
  type: typeof GET_STUDENTCITY;
  studentCity: StudentCity;
}

interface GetStudentCitiesAction {
  type: typeof GET_STUDENTCITIES;
  studentCities: StudentCity[];
  count: number;
}

export interface GetCitiesAction {
  type: typeof GET_CITIES;
  cities: City[];
}
interface GetCityAction {
  type: typeof GET_CITY;
  city: City;
}

export interface SetFilterAction {
  type: typeof SET_FILTER;
  filter: Filter;
}

export type apiActionTypes =
  | GetStudentCitiesAction
  | GetStudentCityAction
  | GetCitiesAction
  | GetCityAction;
