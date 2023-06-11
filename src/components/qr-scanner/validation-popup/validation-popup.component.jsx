import React from 'react';
import './validation-popup.styles.scss';

import ValidIcon from '../../../assets/valid.png';
import InvalidIcon from '../../../assets/invalid.png';
import Loader from '../../loader/loader.component';

const ValidationPopup = ({ isSuccessful, scanned }) => {
  return (
    <div className="popup-container">
      <div className="popup-message">
        {!scanned
          ? 'Waiting...'
          : isSuccessful
          ? 'Validation successful!'
          : 'Validation failed!'}
      </div>
      <div className="popup-icon">
        {scanned ? (
          <img
            className="valid-icon"
            src={isSuccessful ? ValidIcon : InvalidIcon}
          />
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default ValidationPopup;
