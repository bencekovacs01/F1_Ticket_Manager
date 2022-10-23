import React from 'react';

const Package = ({ Country, CircuitName }) => {
  return (
    <div className="package">
      <div className="country">{Country}</div>
      <div className="circuitName">{CircuitName}</div>
    </div>
  );
};

export default Package;
