import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Sfwrapper from "./components/Search&filter/sfwrapper";
import { Box } from "@chakra-ui/core";
import { useStore } from "react-redux";
import { RootState } from "./store/reducers";
import {
  GetCities,
  GetStudentCities,
  GetStudentCity,
  GetCity
} from "./store/actions/actions";
import { useActions } from "./hooks/useActions";

function App() {
  const actions = useActions({
    GetCities,
    GetCity,
    GetStudentCities,
    GetStudentCity
  });
  const onClickCities = () => {
    actions.GetCities();
  };
  const onClickCity = () => {
    actions.GetCity(1);
  };
  const onClickStudentCities = () => {
    actions.GetStudentCities();
  };
  const onClickStudentCity = () => {
    actions.GetStudentCity(1);
  };

  return (
    <div className="App">
      <Header />
      <div className="body">
        <Sfwrapper />
      </div>
      <button onClick={onClickCities}> Get Cities </button>
      <button onClick={onClickCity}> Get City1 </button>
      <button onClick={onClickStudentCities}> Get Student Cities </button>
      <button onClick={onClickStudentCity}> Get StudentCity1 </button>
    </div>
  );
}

export default App;
