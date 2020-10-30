export default interface Filter {
  queryString: string;
  sort: Sort;
  city: string;
  page: number;
}
export interface FilterState {
  filter: Filter;
}

export type Sort =
  | "alphabetical"
  | "inverseAlphabetical"
  | "ratingHighToLow"
  | "ratingLowToHigh"
  | "";
