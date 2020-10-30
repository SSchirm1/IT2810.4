/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, fireEvent, screen } from "./testUtils";
import "@testing-library/jest-dom/extend-expect";
import SearchInput from "..";

import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Store, AnyAction } from "redux";
import { RenderResult } from "@testing-library/react";
import { setFilter } from "../../../store/filter/actions";

const mockStore = configureStore([]); // mock the store
describe("My Connected React-Redux Component", () => {
  let store: Store<any, AnyAction>; // the mocked store
  let component: RenderResult<typeof import("@testing-library/dom/queries")>; // component we want to test

  beforeEach(() => {
    // Setup the mocked store with some data
    store = mockStore({
      citiesState: {
        cities: {
          phase: "SUCCESS",
          data: [
            {
              id: 1,
              navn: "Oslo",
            },
            {
              id: 2,
              navn: "Trondheim",
            },
          ],
          count: null,
        },
      },
      filterState: {
        filter: {
          sort: "alphabetical",
          queryString: "",
          page: 0,
          city: "",
        },
      },
    });
    store.dispatch = jest.fn(); // mock all dispatches
    // render component with store
    component = render(
      <Provider store={store}>
        <SearchInput />
      </Provider>,
      {}
    );
  });

  it("should render with given state from Redux store", () => {
    expect(component.asFragment()).toMatchSnapshot();
  });

  it("renders with correct cities as options", async () => {
    expect(screen.getByRole("option", { name: "Oslo" })).toHaveAttribute(
      "value",
      "1"
    );

    expect(screen.getByRole("option", { name: "Trondheim" })).toHaveAttribute(
      "value",
      "2"
    );
  });

  it("input renders with correct placeholder", async () => {
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "placeholder",
      "søk etter studentby"
    );
  });

  it("dispatches action when searching", async () => {
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "a" } });
    expect(store.dispatch).toHaveBeenCalledWith(
      setFilter({ sort: "alphabetical", queryString: "a", page: 0, city: "" })
    );
  });

  it("dispatches action when selecting city", async () => {
    fireEvent.change(screen.getByTestId("select-cities"), {
      target: { value: "1" },
    });
    expect(store.dispatch).toHaveBeenCalledWith(
      setFilter({
        sort: "alphabetical",
        queryString: "",
        page: 0,
        city: "1",
      })
    );
  });

  it("dispatches action when selecting sort", async () => {
    fireEvent.change(screen.getByTestId("select-sort"), {
      target: { value: "inverseAlphabetical" },
    });
    expect(store.dispatch).toHaveBeenCalledWith(
      setFilter({
        sort: "inverseAlphabetical",
        queryString: "",
        page: 0,
        city: "",
      })
    );
  });
});
