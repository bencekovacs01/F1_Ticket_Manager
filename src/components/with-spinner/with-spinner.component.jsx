import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

import './with-spinner.styles.scss';

const WithSpinner = WrappedComeponent => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        {/* <SpinnerContainer /> */}
        <div className="loader">Loading...</div>
      </SpinnerOverlay>
    ) : (
      <WrappedComeponent {...otherProps} />
    );
  };
  return Spinner;
};

export default WithSpinner;
