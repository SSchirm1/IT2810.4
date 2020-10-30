import { API } from "../../constants";
import axios from "axios";
import { call, put } from "@redux-saga/core/effects";
import {
  pendingCities,
  successCities,
  failureCities
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
