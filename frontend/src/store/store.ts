import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { all, takeLatest } from "@redux-saga/core/effects";
import { listenToFilterChanges } from "./saga/filterSaga";
import { listenToFetchCities } from "./saga/citiesSaga";
import {
  FETCH_CITIES,
  FETCH_STUDENT_CITIES,
  SET_FILTER,
} from "./actions/actiontypes";

const sagaMiddleware = createSagaMiddleware();
export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, sagaMiddleware))
);

function* sagas() {
  yield all([
    takeLatest(SET_FILTER, listenToFilterChanges),
    takeLatest(FETCH_STUDENT_CITIES, listenToFilterChanges),
    takeLatest(FETCH_CITIES, listenToFetchCities),
  ]);
}

sagaMiddleware.run(sagas);
