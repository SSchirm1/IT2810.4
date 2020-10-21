export default interface Filter {
  queryString: string;
  sort: Sort;
}

type Sort =
  | "alphabetical"
  | "inverseAlphabetical"
  | "ratingHighToLow"
  | "ratingLowToHigh"
  | "";
