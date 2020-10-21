import { StudentCity, City } from "../interfaces";

export const GET_STUDENTCITIES = "GET_STUDENTCITIES";
export const GET_STUDENTCITY = "GET_STUDENTCITY";

export const GET_CITIES = "GET_CITIES";
export const GET_CITY = "GET_CITY";

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

export type apiActionTypes =
  | GetStudentCitiesAction
  | GetStudentCityAction
  | GetCitiesAction
  | GetCityAction;
