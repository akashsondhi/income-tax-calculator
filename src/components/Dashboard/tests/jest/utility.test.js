jest.dontMock("../../utility");

describe("Validating utility methods for Dashboard", ()=> {
    const UTIL = require("../../utility");
    const CONSTANTS = require("../../constants");
    beforeEach(() => {
        fetch.resetMocks();
      });
    it("fetchMarginalTaxBrackets calls backend endpoint", ()=> {
        fetch.mockResponseOnce(JSON.stringify({"tax_brackets":[{"max":47630,"min":0,"rate":0.15},{"max":95259,"min":47630,"rate":0.205},{"max":147667,"min":95259,"rate":0.26},{"max":210371,"min":147667,"rate":0.29},{"min":210371,"rate":"0.33"}]}));
        const year = 2019;
        UTIL.fetchMarginalTaxBrackets(year).then((data)=> {
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(CONSTANTS.MARGINAL_TAX_BRACKETS_URL+year);
        });
    });
    describe("Validate validateMandatoryFields", ()=>{
        it("returns true for valid data", () => {
            expect(UTIL.validateMandatoryFields("10000", "2019").length).toEqual(0);
        })

        it("returns error for missing income data", () => {
            expect(UTIL.validateMandatoryFields(undefined, "2019").length).toEqual(1);
            expect(UTIL.validateMandatoryFields(undefined, "2019")).toEqual([{message: CONSTANTS.EMPTY_ANNUAL_INCOME}]);
        })

        it("returns error for missing year data", () => {
            expect(UTIL.validateMandatoryFields("10000", undefined).length).toEqual(1);
            expect(UTIL.validateMandatoryFields("10000", undefined)).toEqual([{message: CONSTANTS.EMPTY_YEAR}]);
        })

        it("returns error for missing income and year data", () => {
            expect(UTIL.validateMandatoryFields(undefined, undefined).length).toEqual(2);
            expect(UTIL.validateMandatoryFields(undefined, undefined)).toEqual([{message: CONSTANTS.EMPTY_ANNUAL_INCOME}, {message: CONSTANTS.EMPTY_YEAR}]);
        })

        it("returns error for invalid income data", () => {
            expect(UTIL.validateMandatoryFields("12amc", "2019").length).toEqual(1);
            expect(UTIL.validateMandatoryFields("12amc", "2019")).toEqual([{message: CONSTANTS.NAN_ANNUAL_INCOME}]);
        })

        it("returns error for invalid income and missing year data", () => {
            expect(UTIL.validateMandatoryFields("12amc", undefined).length).toEqual(2);
            expect(UTIL.validateMandatoryFields("12amc", undefined)).toEqual([{message: CONSTANTS.NAN_ANNUAL_INCOME}, {message: CONSTANTS.EMPTY_YEAR}]);
        })

        it("returns error for invalid year data", () => {
            expect(UTIL.validateMandatoryFields("12000", "201a").length).toEqual(1);
            expect(UTIL.validateMandatoryFields("12000", "201a")).toEqual([{message: CONSTANTS.NAN_YEAR}]);
        })

        it("returns error for invalid year and missing income data", () => {
            expect(UTIL.validateMandatoryFields(undefined, "201a").length).toEqual(2);
            expect(UTIL.validateMandatoryFields(undefined, "201a")).toEqual([{message: CONSTANTS.EMPTY_ANNUAL_INCOME}, {message: CONSTANTS.NAN_YEAR}]);
        })

        it("returns error for invalid income and year data", () => {
            expect(UTIL.validateMandatoryFields("1200s", "201a").length).toEqual(2);
            expect(UTIL.validateMandatoryFields("1200s", "201a")).toEqual([{message: CONSTANTS.NAN_ANNUAL_INCOME}, {message: CONSTANTS.NAN_YEAR}]);
        })
    });

    describe("calculateMarginalTax is", ()=> {
        const dispatchers = {
            set_error: jest.fn(),
            reset_store: jest.fn(),
            set_loading: jest.fn(),
            set_tax_brackets: jest.fn(),
            set_result: jest.fn()
        }
        it("not calling all dispatchers for invalid input field ", async ()=> {
            UTIL.calculateMarginalTax({year: "2019", income: "12a"}, dispatchers);
            expect(dispatchers.reset_store).toHaveBeenCalledTimes(1);
            expect(dispatchers.set_error).toHaveBeenCalledTimes(1);
            expect(dispatchers.set_loading).toHaveBeenCalledTimes(0);
            expect(dispatchers.set_tax_brackets).toHaveBeenCalledTimes(0);
            expect(dispatchers.set_result).toHaveBeenCalledTimes(0);
        
            
        });
        it("not throwing error for valid input field ", ()=> {
            fetch.mockResponseOnce(JSON.stringify({"tax_brackets":[{"max":47630,"min":0,"rate":0.15},{"max":95259,"min":47630,"rate":0.205},{"max":147667,"min":95259,"rate":0.26},{"max":210371,"min":147667,"rate":0.29},{"min":210371,"rate":"0.33"}]}));
            UTIL.calculateMarginalTax({year: "2019", income: "12,000"}, dispatchers);
            expect(dispatchers.reset_store).toHaveBeenCalledTimes(1);
            expect(dispatchers.set_error).toHaveBeenCalledTimes(0);
        });

        
    })
    
})