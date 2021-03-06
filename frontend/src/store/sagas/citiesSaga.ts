import { API } from "../../constants";
import axios from "axios";
import { call, put } from "@redux-saga/core/effects";
import { pendingCities, successCities, failureCities } from "../cities/actions";

/* Listens to FETCH_CITIES actions, then fetches new cities */
export function* listenToFetchCities() {
  yield put(pendingCities());

  try {
    const { data } = yield call(axios.get, `${API}/byer`);
    yield put(successCities(data));
  } catch (error) {
    yield put(failureCities());
  }
}
