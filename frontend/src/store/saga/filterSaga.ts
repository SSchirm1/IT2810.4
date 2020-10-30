import { API, OFFSET } from "../../constants";
import axios from "axios";
import { call, put, select } from "@redux-saga/core/effects";
import { RootState } from "../reducers";
import {
  pendingStudentCities,
  successStudentCities,
  failureStudentCities
} from "../studentCities/actions";

export const getFilterSelector = (state: RootState) => state.filter.filter;
//axios.get(API + "/byer").then(res => {

export function* listenToFilterChanges() {
  yield put(pendingStudentCities());

  try {
    const filter = yield select(getFilterSelector);
    const { data } = yield call(axios.get, `${API}/studentbyer`, {
      params: {
        take: OFFSET,
        skip: filter.page * OFFSET,
        sort: filter.sort,
        querystring: filter.queryString,
        filter: filter.city
      }
    });
    yield put(successStudentCities(data.studentbyer, data.count));
  } catch (error) {
    yield put(failureStudentCities());
  }
}
