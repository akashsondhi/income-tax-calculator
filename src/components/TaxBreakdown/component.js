import React from "react";

const TaxBreakdown = props => {
  if (props.result) {
    return (
      <div data-testid="result">
        <h2 className="text-start">Result</h2>
        <p className="lead">On your annual income of ${props.result.income}, your total tax owed is: ${Number(props.result.tax).toLocaleString('en-US')}</p>
        <h2 className="text-start">Tax Breakdown</h2>
        
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Min</th>
              <th scope="col">Max</th>
              <th scope="col">Rate</th>
              <th scope="col">Tax</th>
            </tr>
          </thead>
          <tbody>
            {
                props.tax_brackets.map((bracket, index) => {
                    return(
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{bracket.min.toLocaleString('en-US')}</td>
                        <td>{bracket.max? bracket.max.toLocaleString('en-US') : "-"}</td>
                        <td>{bracket.rate}</td>
                        <td>{bracket.partialTax? Number(bracket.partialTax).toLocaleString('en-US') : "-"}</td>
                    </tr>)
                }
              
            )}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
};

export default TaxBreakdown;
