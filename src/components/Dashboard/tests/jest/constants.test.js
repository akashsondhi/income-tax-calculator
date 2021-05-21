describe("Component Dashboard constants", ()=> {
    const CONSTANTS = require("../../constants");
    it("contains backend url for fetching marginal tax brackets", ()=> {
        expect(CONSTANTS.MARGINAL_TAX_BRACKETS_URL).toBeDefined();
    });
    describe("Verify Error messages", ()=> {
        it("for empty Annual Income field", ()=> {
            expect(CONSTANTS.EMPTY_ANNUAL_INCOME).toBeDefined();
            expect(CONSTANTS.EMPTY_ANNUAL_INCOME).not.toBe("");
        });
        it("for NaN Annual Income field", ()=> {
            expect(CONSTANTS.NAN_ANNUAL_INCOME).toBeDefined();
            expect(CONSTANTS.NAN_ANNUAL_INCOME).not.toBe("");
        });
        it("for empty Year field", ()=> {
            expect(CONSTANTS.EMPTY_YEAR).toBeDefined();
            expect(CONSTANTS.EMPTY_YEAR).not.toBe("");
        });
        it("for NaN Year field", ()=> {
            expect(CONSTANTS.NAN_YEAR).toBeDefined();
            expect(CONSTANTS.NAN_YEAR).not.toBe("");
        });
    })
})