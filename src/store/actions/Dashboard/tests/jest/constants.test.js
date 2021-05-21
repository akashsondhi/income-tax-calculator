jest.dontMock("../../constants");

describe("Dashboard Action Constants", ()=> {
    const ACTION_TYPES = require("../../constants")
    it("contains SET_LOADING constant", ()=> {
        expect(ACTION_TYPES.SET_LOADING).toBeDefined();
        expect(ACTION_TYPES.SET_LOADING).toEqual("SET_LOADING")
    })
    it("contains SET_ERROR constant", ()=> {
        expect(ACTION_TYPES.SET_ERROR).toBeDefined();
        expect(ACTION_TYPES.SET_ERROR).toEqual("SET_ERROR")
    })
    it("contains SET_RESULT constant", ()=> {
        expect(ACTION_TYPES.SET_RESULT).toBeDefined();
        expect(ACTION_TYPES.SET_RESULT).toEqual("SET_RESULT")
    })
    it("contains SET_TAX_BRACKETS constant", ()=> {
        expect(ACTION_TYPES.SET_TAX_BRACKETS).toBeDefined();
        expect(ACTION_TYPES.SET_TAX_BRACKETS).toEqual("SET_TAX_BRACKETS")
    })
    it("contains RESET_STORE constant", ()=> {
        expect(ACTION_TYPES.RESET_STORE).toBeDefined();
        expect(ACTION_TYPES.RESET_STORE).toEqual("RESET_STORE")
    })
})