import { combineReducers } from "redux";
import { citiesReducer } from "./cities/reducers";
import { studentCitiesReducer } from "./studentCities/reducers";
import { filterReducer } from "./filter/reducers";

const rootReducer = combineReducers({
  cities: citiesReducer,
  studentCities: studentCitiesReducer,
  filter: filterReducer
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
