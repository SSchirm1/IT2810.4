export type RemoteDataT<D, E> =
  | { phase: "NOT_ASKED" }
  | { phase: "PENDING"; count: number | null }
  | { phase: "SUCCESS"; data: D; count: number | null }
  | { phase: "FAILURE"; error: E | null };
