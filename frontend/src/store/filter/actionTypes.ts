import Filter from "./interfaces";

export const SET_FILTER = "SET_FILTER";

export interface SetFilterAction {
  type: typeof SET_FILTER;
  filter: Filter;
}
