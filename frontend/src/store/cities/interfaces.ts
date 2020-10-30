import { RemoteDataT } from "../interfaces";

export interface City {
  id: number;
  navn: string;
}

export interface CitiesState {
  cities: RemoteDataT<Array<City>, {}>;
}
