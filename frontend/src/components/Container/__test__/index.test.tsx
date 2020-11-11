import React from "react";
import ReactDOM from "react-dom";
import Container from "../index";

import {render} from "@testing-library/react";


it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Container/>, div);
})



