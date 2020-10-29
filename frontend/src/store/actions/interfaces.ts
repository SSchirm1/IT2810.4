export default interface Filter {
  queryString: string;
  sort: Sort;
  city: string; //burde kanskje vært number?
  page: number;
}

export type Sort =
  | "alphabetical"
  | "inverseAlphabetical"
  | "ratingHighToLow"
  | "ratingLowToHigh"
  | "";
