import React from 'react';
import Loader from '../loader/loader.component';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

import './with-spinner.styles.scss';

const WithSpinner = WrappedComeponent => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <SpinnerOverlay>
        {/* <SpinnerContainer /> */}
        <Loader />
      </SpinnerOverlay>
    ) : (
      <WrappedComeponent {...otherProps} />
    );
  };
  return Spinner;
};

export default WithSpinner;
