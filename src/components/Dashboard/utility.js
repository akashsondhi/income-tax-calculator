import * as CONSTANTS from "./constants";

export function fetchMarginalTaxBrackets(year) {
    return fetch(CONSTANTS.MARGINAL_TAX_BRACKETS_URL + year).then((resp)=>{
        return resp.json();
    });
}

export function validateMandatoryFields(totalIncome, year) {
    let invalidProps = []; 
    if(!totalIncome) {
        invalidProps.push({message: CONSTANTS.EMPTY_ANNUAL_INCOME});
        
    } else if(isNaN(totalIncome)) {
        invalidProps.push({message: CONSTANTS.NAN_ANNUAL_INCOME});
    }
    if(!year) {
        invalidProps.push({message: CONSTANTS.EMPTY_YEAR});
    } else if(isNaN(year)) {
        invalidProps.push({message: CONSTANTS.NAN_YEAR});
    }
    return invalidProps;
}

export function calculateMarginalTax(stateObj, dispatchers) {
    dispatchers.reset_store();
    const year = stateObj.year; 
    const totalIncome = stateObj.income ? stateObj.income.replace(/[,]/g,''): stateObj.income;
    const preCheck = validateMandatoryFields(totalIncome, year);
    if (preCheck.length) {
        dispatchers.set_error({errors: preCheck});
        return;
    }
    dispatchers.set_loading(true);
    fetchMarginalTaxBrackets(year).then((data)=>{
        if(data.tax_brackets) {
            let tax_brackets = data.tax_brackets;
            tax_brackets.sort((a,b)=> a.rate-b.rate);
            let finalTax = 0, partial;
            tax_brackets.forEach(bracket=>{
                if(totalIncome > bracket.min) {
                    partial = 0;
                    if(bracket.max && totalIncome>bracket.max) {
                        partial= (Number(bracket.max) - Number(bracket.min)) * Number(bracket.rate);
                    } else {
                        partial= (Number(totalIncome) - Number(bracket.min)) * Number(bracket.rate);
                    }
                    bracket["partialTax"] = partial.toFixed(2)
                    finalTax += partial
                }
            });
            dispatchers.set_tax_brackets(tax_brackets);
            dispatchers.set_result({income: stateObj.income, tax: finalTax.toFixed(2)});
        } else {
            dispatchers.set_error(data);
        }
    })
    .catch(()=>{
        dispatchers.set_error({errors: [{message:["Something went wrong. Try again!"]}]});
    })
    .finally(()=>{
        dispatchers.set_loading(false)
    });
    
}

