jest.dontMock("../../reducer");

describe("Dashboard Reducer", () => {
  const reducer = require("../../reducer").default;

  const state = {
    is_loading: false,
    result: undefined,
    errors: undefined,
    tax_brackets: undefined
  };

  const nextStateOnLoading = {
    is_loading: true,
    result: undefined,
    errors: undefined,
    tax_brackets: undefined
  };

  const nextStateOnError = {
    is_loading: false,
    result: undefined,
    errors: [{ message: "Error!" }],
    tax_brackets: undefined
  };

  const nextStateOnResult = {
    is_loading: false,
    result: { income: 10000, tax: 1500 },
    errors: undefined,
    tax_brackets: undefined
  };

  const nextStateOnTaxBrackets = {
      is_loading: false,
      result: { income: 10000, tax: 1500},
      errors: undefined,
      tax_brackets: [{"max":47630,"min":0,"rate":0.15, "partialTax": 1500},{"max":95259,"min":47630,"rate":0.205},{"max":147667,"min":95259,"rate":0.26},{"max":210371,"min":147667,"rate":0.29},{"min":210371,"rate":"0.33"}]
  }

  it("Should return empty object for undefined state", () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it("Should return existing state for unknown action", () => {
    expect(reducer(state, { type: "MADE_UP_ACTION", payload: {is_loading: true} })).toEqual(
      state
    );
  });

  it("Should update is_loading", () => {
    expect(reducer(state, { type: "SET_LOADING", payload: {is_loading: true} })).toEqual(
      nextStateOnLoading
    );
  });

  it("Should update error on receiving SET_ERROR", () => {
    expect(
      reducer(state, {
        type: "SET_ERROR",
        payload: { errors: [{ message: "Error!" }] }
      })
    ).toEqual(nextStateOnError);
  });

  it("Should update result on receiving SET_RESULT", () => {
    expect(
      reducer(state, {
        type: "SET_RESULT",
        payload: { income: 10000, tax: 1500 }
      })
    ).toEqual(nextStateOnResult);
  });

  it("Should update tax_brackets on receiving SET_TAX_BRACKETS", () => {
    expect(
      reducer(nextStateOnResult, {
        type: "SET_TAX_BRACKETS",
        payload: {"tax_brackets":[{"max":47630,"min":0,"rate":0.15, "partialTax": 1500},{"max":95259,"min":47630,"rate":0.205},{"max":147667,"min":95259,"rate":0.26},{"max":210371,"min":147667,"rate":0.29},{"min":210371,"rate":"0.33"}]}
      })
    ).toEqual(nextStateOnTaxBrackets);
  });
  it("Should reset store on receiving RESET_STORE", () => {
    expect(
      reducer(nextStateOnResult, {
        type: "RESET_STORE"
      })
    ).toEqual(state);
  });
});
