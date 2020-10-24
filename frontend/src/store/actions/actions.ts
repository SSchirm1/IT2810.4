import {
  GET_CITIES,
  GET_CITY,
  GET_STUDENTCITIES,
  GET_STUDENTCITY,
  apiActionTypes
} from "./actiontypes";
import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { Dispatch } from "redux";
import { City, StudentCity } from "../interfaces";
import { gridColumnGap } from "styled-system";
import Filter from "../../hooks/Filter/interfaces";

const API = "http://it2810-72.idi.ntnu.no:3000/api";
console.log("API: ", process.env.NODE_ENV);

const OFFSET = 2;

export function GetCities(): ThunkAction<
  Promise<void>,
  {},
  {},
  apiActionTypes
> {
  console.log("GetCities");
  return async (dispatch: Dispatch<apiActionTypes>) => {
    axios.get(API + "/byer").then(res => {
      const cities: City[] = res.data;
      dispatch({
        type: GET_CITIES,
        cities: cities
      });
    });
  };
}

export function GetStudentCities(
  page: number,
  filter: Filter
): ThunkAction<Promise<void>, {}, {}, apiActionTypes> {
  console.log("GetStudentCities");

  return async (dispatch: Dispatch<apiActionTypes>) => {
    axios
      .get(
        `${API}/studentbyer?skip=${page * OFFSET}&take=${OFFSET}&sort=${
          filter.sort
        }&querystring=`
      )
      .then(res => {
        console.log(res.data);
        const studentCities: StudentCity[] = res.data.studentbyer;
        const count: number = res.data.count;
        dispatch({
          type: GET_STUDENTCITIES,
          studentCities: studentCities,
          count: count
        });
      });
  };
}

export function GetStudentCity(
  id: number
): ThunkAction<Promise<void>, {}, {}, apiActionTypes> {
  console.log("GetStudentCity");
  return async (dispatch: Dispatch<apiActionTypes>) => {
    axios.get(API + "/studentbyer/" + id.toString()).then(res => {
      //TODO: change '1' to input value
      const studentcity: StudentCity = res.data;
      dispatch({
        type: GET_STUDENTCITY,
        studentCity: studentcity
      });
    });
  };
}

export function GetCity(
  id: number
): ThunkAction<Promise<void>, {}, {}, apiActionTypes> {
  console.log("GetCity");
  return async (dispatch: Dispatch<apiActionTypes>) => {
    axios.get(API + "/byer/" + id.toString()).then(res => {
      //TODO: change '1' to input value
      const city: City = res.data;
      dispatch({
        type: GET_CITY,
        city: city
      });
    });
  };
}
