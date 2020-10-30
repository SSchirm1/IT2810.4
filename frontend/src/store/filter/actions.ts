export function setFilter(filter: Filter): SetFilterAction {
  return {
    type: SET_FILTER,
    filter,
  };
}
