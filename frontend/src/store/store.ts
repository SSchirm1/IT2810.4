import { createStore, applyMiddleware } from "redux";
import rootReducer, { RootState } from "./reducers";
import thunk from "redux-thunk";
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from "redux-devtools-extension";
import { all, call, put, select, takeEvery, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";
import { API, OFFSET } from "./actions/actions";

const sagaMiddleware = createSagaMiddleware()
export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, sagaMiddleware))
);


const getFilter = (state: RootState) => state.filter.filter;

function* mySaga() {
  const filter = yield select(getFilter);
  console.log("Filter!!: ", filter)
  const data = yield call(axios.get, `${API}/studentbyer`,
  { params: {
    take: OFFSET,
    skip: filter.page * OFFSET,
    sort: filter.sort,
    querystring: filter.queryString,
    filter: filter.city
  }
}
);
  console.log("data: ", data);
  yield put({type: "GET_STUDENTCITIES", studentCities: data.data.studentbyer, count: data.data.count});
}

function* sagas() {
  yield all([takeLatest('SET_FILTER', mySaga)])
}

sagaMiddleware.run(sagas)