import * as ACTION_TYPES from "./constants";

export function reset_store() {
    return {
        type: ACTION_TYPES.RESET_STORE
    }
}

export function set_loading(status) {
    return {
        type: ACTION_TYPES.SET_LOADING,
        payload: {
            is_loading: status
        }
    }
}

export function set_error(errorsObj) {
    return {
        type: ACTION_TYPES.SET_ERROR,
        payload: { 
            errors: errorsObj.errors
        }
    }
}

export function set_calculated_result(result) {
    return {
        type: ACTION_TYPES.SET_RESULT,
        payload: {
            income: result.income,
            tax: result.tax
        }
    }
}

export function set_tax_brackets(brackets) {
    return {
        type: ACTION_TYPES.SET_TAX_BRACKETS,
        payload: {
            tax_brackets: brackets
        }
    }
}