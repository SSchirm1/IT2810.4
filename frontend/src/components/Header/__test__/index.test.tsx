import { render } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import Header from "../index";
it("renders without crashing", () => {
  const div = document.createElement("div");
    ReactDOM.render(<Header/>, div);
})