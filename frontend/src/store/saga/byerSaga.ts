import { API, OFFSET } from "../../constants";
import axios from "axios";
import { all, call, put, select, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { RootState } from "../reducers";
import { pendingCities, successCities, failureCities } from "../actions/actions";


export function* listenToFetchByer() {

        yield put(pendingCities())

        try {
          const { data }= yield call(axios.get, `${API}/byer`)
          console.log("data: ", data);

          yield put(successCities(data))
        } catch(error) {
          yield put(failureCities())
        }
}