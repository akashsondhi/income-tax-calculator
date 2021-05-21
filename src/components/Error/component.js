import React from "react";

const Error = props => {
  if (props.errors) {
    return (
      <div data-testid="error">
        {props.errors.map((item,i) => {
          return(<div
          className="alert alert-danger"
          role="alert" key={i}
        >
          <strong>Error!</strong> {item.message}
          </div>);
        })}
      </div>
    );
  }
  return null;
};

export default Error;
