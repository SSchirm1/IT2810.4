export interface StudentCity {
  id: number;
  navn: string;
  utleier: string;
  bilde: string;
  vurderingTotalt: number;
  vurderingPris: number;
  vurderingLokasjon: number;
  vurderingFellesAreal: number;
  vurderingTilstand: number;
  path: string;
  by: City | undefined;
}

export interface StudentCityState {
  studentCity: StudentCity | undefined;
}

export interface StudentCitiesState {
  studentCities: StudentCity[];
}

export interface City {
  id: number;
  navn: string;
  bilde: string;
  path: string;
  studentbyer: StudentCity[] | undefined;
}

export interface CityState {
  city: City | undefined;
}

export interface CitiesState {
  cities: City[];
}
