import React from "react";
import { connect } from "react-redux";
import * as DashboardActions from "../../store/actions/Dashboard/actions";
import { calculateMarginalTax } from "./utility";
import Loader from "../Loader/component";
import Error from "../Error/component";
import TaxBreakdown from "../TaxBreakdown/component";
/**
 * The landing page dashboard
 *
 * @class Dashboard
 * @extends React.Component
 */
export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        year: undefined,
        income: undefined
    }
  }
  handleChangeYear = event => {
    this.setState({ year: event.target.value });
  };
  handleChangeIncome = event => {
    this.setState({ income: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();

    calculateMarginalTax(
      { year: this.state.year, income: this.state.income },
      this.props
    );
  };

  handleReset = event => {
      document.getElementById("income-tax-form").reset();
      this.setState({
        year: undefined,
        income: undefined
      })
      this.props.reset_store();
  }

  /**
   * Render the component.
   *
   * @return {component} JSX markup for the component.
   * {@link https://facebook.github.io/react/docs/component-specs.html#render|render()}
   */
  render() {
    return (
        
      <div className="d-flex align-items-center flex-column">
      <div className="justify-content-center">
        <form id="income-tax-form" className="form mt-5">
          <div className="row mb-3">
            <label htmlFor="income" className="col-sm-2 col-form-label">
              Annual Income
            </label>
            <div className="col-sm-10">
            <div className="input-group mb-3">
            <span className="input-group-text">$</span>
            <input
              id="income"
              onChange={this.handleChangeIncome}
              type="text"
              className="form-control"
              autoComplete="off"
            /></div>
            </div>
            
          </div>
          <div className="row mb-3">
            <label htmlFor="Year" className="col-sm-2 col-form-label">
              Tax Year
            </label>
            <div className="col-sm-10">
            <input
              id="year"
              onChange={this.handleChangeYear}
              type="text"
              className="form-control "
              autoComplete="off"
            />
            </div>
            
          </div>
          <div className="row">
          <div className="mr-3"><button type="button" className="btn btn-primary" id="submit" onClick={this.handleSubmit}>
            Submit
          </button>
          <button type="button" className="btn btn-secondary" id="clear" onClick={this.handleReset}>
            Clear
          </button>
          </div>
          </div>
          <div className="row mt-3">
          <Error errors = {this.props.errors} />
          </div>
          <Loader is_loading={this.props.is_loading}/>
          <TaxBreakdown {...this.props} />
        </form>
        </div>
      </div>
      
    );
  }
}

function mapStateToProps(state) {
  return {
    is_loading: state.is_loading,
    errors: state.errors,
    result: state.result,
    tax_brackets: state.tax_brackets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reset_store: () => dispatch(DashboardActions.reset_store()),
    set_loading: state => dispatch(DashboardActions.set_loading(state)),
    set_error: errors => dispatch(DashboardActions.set_error(errors)),
    set_result: result =>
      dispatch(DashboardActions.set_calculated_result(result)),
    set_tax_brackets: brackets => dispatch(DashboardActions.set_tax_brackets(brackets))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
