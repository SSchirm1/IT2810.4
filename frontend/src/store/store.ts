import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { all, takeLatest } from "@redux-saga/core/effects";
import { listenToFilterChanges } from "./sagas/filterSaga";
import { listenToFetchCities } from "./sagas/citiesSaga";
import { FETCH_CITIES } from "./cities/actionTypes";
import { FETCH_STUDENT_CITIES } from "./studentCities/actionTypes";
import { SET_FILTER } from "./filter/actionTypes";
import { combineReducers } from "redux";
import { citiesReducer } from "./cities/reducers";
import { studentCitiesReducer } from "./studentCities/reducers";
import { filterReducer } from "./filter/reducers";

const rootReducer = combineReducers({
  citiesState: citiesReducer,
  studentCitiesState: studentCitiesReducer,
  filterState: filterReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

const sagaMiddleware = createSagaMiddleware();
export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

/* Setup the root for all our sagas. We are using takeLatest because we only want the latest requests anyways */
function* sagas() {
  yield all([
    takeLatest(SET_FILTER, listenToFilterChanges),
    takeLatest(FETCH_STUDENT_CITIES, listenToFilterChanges),
    takeLatest(FETCH_CITIES, listenToFetchCities),
  ]);
}

sagaMiddleware.run(sagas);
