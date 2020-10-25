export interface StudentCity {
  id: number;
  navn: string;
  utleier: string;
  bilde: string;
  vurderingTotal: string;
  vurderingPris: string;
  vurderingLokasjon: string;
  vurderingFellesAreal: string;
  vurderingTilstand: string;
  by: City;
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
