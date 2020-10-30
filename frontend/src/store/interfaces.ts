import Filter from "./actions/interfaces";

type RemoteDataT<D, E> =
  | { phase: "NOT_ASKED" }
  | { phase: "PENDING"; count: number | null }
  | { phase: "SUCCESS"; data: D; count: number | null }
  | { phase: "FAILURE"; error: E | null };

export interface Rating {
  vurderingTotal: string;
  vurderingPris: string;
  vurderingLokasjon: string;
  vurderingFellesAreal: string;
  vurderingTilstand: string;
}

export interface StudentCity {
  id: number;
  navn: string;
  utleier: string;
  vurdering: Rating;
  anmeldelserCount: number | undefined;
  by: City;
}

export interface City {
  id: number;
  navn: string;
}

export interface CitiesState {
  cities: RemoteDataT<Array<City>, {}>;
}

export interface StudentCitiesState {
  studentCities: RemoteDataT<Array<StudentCity>, {}>;
}

export interface FilterState {
  filter: Filter;
}
