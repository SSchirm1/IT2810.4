import { call, put, take } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";
import { RootState } from "../../reducers";
import { listenToFilterChanges } from "../filterSaga";
import { listenToFetchCities } from "../citiesSaga";
import axios from "axios";
import {
  FAILURE_CITIES,
  FAILURE_STUDENT_CITIES,
  FETCH_CITIES,
  PENDING_CITIES,
  SUCCESS_CITIES,
} from "../../actions/actiontypes";
import { API } from "../../../constants";

it("fetches the cities", () => {
  const fakeCities = {
    data: [{ id: "0", navn: "Oslo" }],
  };
  return expectSaga(listenToFetchCities)
    .provide([[call(axios.get, `${API}/byer`), fakeCities]])
    .put({
      type: SUCCESS_CITIES,
      cities: fakeCities.data,
    })
    .dispatch({ type: FETCH_CITIES })
    .dispatch({ type: PENDING_CITIES })
    .run();
});

it("fetch cities handles errors", () => {
  return expectSaga(listenToFetchCities)
    .provide([[call(axios.get, `${API}/byer`), throwError()]])
    .put({ type: FAILURE_CITIES })
    .dispatch({ type: FETCH_CITIES })
    .run();
});
