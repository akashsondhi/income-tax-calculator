import * as ACTION_TYPES from "../../actions/Dashboard/constants";

const DashboardReducer = function(state = {}, action) {
  switch (action.type) {
    case ACTION_TYPES.RESET_STORE:
      return {
        ...state,
        is_loading: false,
        errors: undefined,
        result: undefined,
        tax_brackets: undefined
      };
    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        is_loading: action.payload.is_loading
      };
    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        errors: action.payload.errors
      };
    case ACTION_TYPES.SET_RESULT:
      return {
        ...state,
        result: {
          income: action.payload.income,
          tax: action.payload.tax
        }
      };
    case ACTION_TYPES.SET_TAX_BRACKETS:
      return {
          ...state,
          tax_brackets: action.payload.tax_brackets
      }
    default:
      return state;
  }
};
export default DashboardReducer;
