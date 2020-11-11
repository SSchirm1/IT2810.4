import React from "react";
import ReactDOM from "react-dom";
import StudentCityCard from "../StudentCityCard";

import {render} from "@testing-library/react";
import "jest-dom/extend-expect"; 
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import Student_cities from "../index";
import { StudentCity } from "../../../store/interfaces";

type Props = {
    studentCity: StudentCity;
  };
const [showDetails, setShowDetails] = React.useState(false);

Props.studentCity = {
    id: 1,
    navn: "Kringsjå",
    utleier: "SiO",
    vurderingTotal: "3",
    vurderingPris: "5",
    vurderingLokasjon: "3",
    vurderingFellesAreal: "2",
    vurderingTilstand: "3",
    anmeldelserCount: 0,
    by: undefined,
}

const studentCityCard = StudentCityCard(studentCity);



/* 
{scity.props.studentCities.map(studentCity => {
    return <StudentCityCard studentCity={studentCity} />;
  })}

it("renders card correctly", () => {
    render(<StudentCityCard studentCity={studentCity} )
})

/** */
