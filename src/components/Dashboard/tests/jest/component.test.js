import React from "react";
import { screen, render, rerender } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { createStore } from "redux";
import Dashboard from "../../component";
import reducer from "../../../../store/reducers/index";
import { Provider } from 'react-redux';

import {calculateMarginalTax} from "../../utility";

jest.mock("../../utility");
const initialState = { };

let store = createStore(reducer, initialState);
store.dispatch = jest.fn();

const Wrapper = ({ children }) => (
	<Provider store={store}>{children}</Provider>
);

describe("Dashboard", () => {
    let page;
    beforeEach(()=> {
        page = render(<Dashboard />, { wrapper: Wrapper });
    })
  it("should display all input fields labels", async () => {
    const annualIncomeLabel = await screen.findByText("Annual Income");
    const yearLabel = await screen.findByText("Tax Year");

    expect(annualIncomeLabel).toBeTruthy();
    expect(yearLabel).toBeTruthy();
  });

  it("should have all input fields", async () => {
    // const page = render(<Dashboard />, { wrapper: Wrapper });

    const annualIncomeInput = page.container.querySelector("#income");
    const yearInput =  page.container.querySelector("#year");

    expect(annualIncomeInput).toBeTruthy();
    expect(yearInput).toBeTruthy();
  });

  it("should have all the buttons", async () => {
    
    expect(page.container.querySelector("#submit")).toBeInTheDocument();
    expect(page.container.querySelector("#clear")).toBeInTheDocument();
  });

  it("should call calculateMarginalTax on hitting Submit", async () => {
    userEvent.click(page.container.querySelector("#submit"));
    expect(calculateMarginalTax).toHaveBeenCalledTimes(1);
  });
});