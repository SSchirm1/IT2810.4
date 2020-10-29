import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { all, takeLatest } from "@redux-saga/core/effects";
import { listenToFilterChanges } from "./saga/filterSaga";
import { listenToFetchByer } from "./saga/byerSaga";

const sagaMiddleware = createSagaMiddleware();
export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, sagaMiddleware))
);

function* sagas() {
  yield all([
    takeLatest("SET_FILTER", listenToFilterChanges),
    takeLatest("FETCH_CITIES", listenToFetchByer)
  ]);
}

sagaMiddleware.run(sagas);
