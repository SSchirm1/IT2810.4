import { SetFilterAction, SET_FILTER } from "./actionTypes";
import { FilterState } from "./interfaces";

const INITIAL_FILTER_STATE: FilterState = {
  filter: { sort: "alphabetical", queryString: "", page: 0, city: "" }
};

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
