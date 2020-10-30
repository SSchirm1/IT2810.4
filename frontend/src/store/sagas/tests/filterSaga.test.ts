import { call } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";
import { listenToFilterChanges, getFilterSelector } from "../filterSaga";
import axios from "axios";
import {
  FAILURE_STUDENT_CITIES,
  FETCH_STUDENT_CITIES,
  SUCCESS_STUDENT_CITIES,
} from "../../actions/actiontypes";
import { API, OFFSET } from "../../../constants";
import { select } from "redux-saga-test-plan/matchers";

const filter = {
  queryString: "",
  sort: "alphabetical",
  page: 0,
  city: "",
};

describe("tests the citiesSage", () => {
  it("fetches the studentcities", () => {
    const fakeStudentCities = {
      data: {
        studentbyer: [
          {
            id: 1,
            navn: "Singsaker",
            utleier: "SiT",
            vurderingTotal: "4",
            vurderingPris: "4",
            vurderingLokasjon: "4",
            vurderingFellesAreal: "4",
            vurderingTilstand: "4",
            anmeldelserCount: 0,
            by: {
              id: 1,
              navn: "Trondheim",
            },
          },
        ],
        count: 1,
      },
    };
    return expectSaga(listenToFilterChanges)
      .provide([
        [
          call(axios.get, `${API}/studentbyer`, {
            params: {
              take: OFFSET,
              skip: filter.page * OFFSET,
              sort: filter.sort,
              querystring: filter.queryString,
              filter: filter.city,
            },
          }),
          fakeStudentCities,
        ],
        [select(getFilterSelector), filter],
      ])
      .put({
        type: SUCCESS_STUDENT_CITIES,
        studentCities: fakeStudentCities.data.studentbyer,
        count: fakeStudentCities.data.count,
      })
      .dispatch({ type: FETCH_STUDENT_CITIES })
      .run();
  });

  it("fetch studentcities handles errors", () => {
    return expectSaga(listenToFilterChanges)
      .provide([
        [
          call(axios.get, `${API}/studentbyer`, {
            params: {
              take: OFFSET,
              skip: filter.page * OFFSET,
              sort: filter.sort,
              querystring: filter.queryString,
              filter: filter.city,
            },
          }),
          throwError(),
        ],
      ])
      .put({ type: FAILURE_STUDENT_CITIES })
      .dispatch({ type: FETCH_STUDENT_CITIES })
      .run();
  });
});
