import { City } from "./interfaces";

export const FETCH_CITIES = "FETCH_CITIES";
export const SUCCESS_CITIES = "SUCCESS_CITIES";
export const PENDING_CITIES = "PENDING_CITIES";
export const FAILURE_CITIES = "FAILURE_CITIES";

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

export type CitiesAction =
  | FetchCitiesAction
  | PendingCitiesAction
  | SuccessCitiesAction
  | FailureCitiesAction;
