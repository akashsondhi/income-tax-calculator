jest.dontMock("../../constants");
jest.dontMock("../../actions");

describe("Dashboard Actions", ()=> {
    const ACTIONS = require("../../actions");
    const ACTION_TYPES = require("../../constants");

    it("returns expected object on reset_store", ()=> {
        expect(ACTIONS.reset_store()).toEqual(
            {
                type: ACTION_TYPES.RESET_STORE
            }
        )
    });

    it("returns expected object on set_loading", () => {
        expect(ACTIONS.set_loading(true)).toEqual(
            {
                type: ACTION_TYPES.SET_LOADING,
                payload: {
                    is_loading: true
                }
            }
        )
    });

    it("returns expected object on set_error", () => {
        const errorObj = {errors: [{message: "DB Error"}]};
        expect(ACTIONS.set_error(errorObj)).toEqual(
            {
                type: ACTION_TYPES.SET_ERROR,
                payload: {
                    errors: errorObj.errors
                }
            }
        )
    });

    it("returns expected object on set_calculated_result", () => {
        const result = {
            income: 1000,
            tax: 150,
            val: 120
        }
        expect(ACTIONS.set_calculated_result(result)).toEqual(
            {
                type: ACTION_TYPES.SET_RESULT,
                payload: {
                    income: result.income,
                    tax: result.tax
                }
            }
        )
    });

    it("returns expected object on set_tax_brackets", () => {
        const brackets = [{min:0, max:20000, rate: 0.15}]
        expect(ACTIONS.set_tax_brackets(brackets)).toEqual(
            {
                type: ACTION_TYPES.SET_TAX_BRACKETS,
                payload: {
                    tax_brackets: brackets
                }
            }
        )
    });
})