import { RemoteDataT } from "../interfaces";

export interface StudentCity {
  id: number;
  navn: string;
  utleier: string;
  byNavn: string;
  anmeldelserCount: number | undefined;
  vurderingTotal: string;
  vurderingPris: string;
  vurderingLokasjon: string;
  vurderingFellesAreal: string;
  vurderingTilstand: string;
}

export interface StudentCitiesState {
  studentCities: RemoteDataT<Array<StudentCity>, {}>;
}
