import React from "react";

const Loader = props => {
  if (props.is_loading) {
    return (
      <div className="text-center mb-3">
        <div className="spinner-border" role="status" data-testid="loader">
          <span className="visually-hidden">Calculating...</span>
        </div>
      </div>
    );
  }
  return null;
};

export default Loader;
