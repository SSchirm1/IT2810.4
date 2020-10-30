import { SetFilterAction, SET_FILTER } from "./actionTypes";

import Filter from "./interfaces";

export function setFilter(filter: Filter): SetFilterAction {
  return {
    type: SET_FILTER,
    filter
  };
}
