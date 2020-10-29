import { API, OFFSET } from "../../constants";
import axios from "axios";
import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "@redux-saga/core/effects";
import { RootState } from "../reducers";
import {
  pendingCities,
  successCities,
  failureCities,
} from "../actions/actions";

export function* listenToFetchCities() {
  yield put(pendingCities());

  try {
    const { data } = yield call(axios.get, `${API}/byer`);
    yield put(successCities(data));
  } catch (error) {
    yield put(failureCities());
  }
}
