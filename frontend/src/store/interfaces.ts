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
  by: City | undefined;
}

export interface StudentCityState {
  studentCity: StudentCity | undefined;
}

export interface StudentCitiesState {
  studentCities: StudentCity[];
  count: number;
}

export interface City {
  id: number;
  navn: string;
  bilde: string;
  studentbyer: StudentCity[] | undefined;
}

export interface CityState {
  city: City | undefined;
}

export interface CitiesState {
  cities: City[];
}
