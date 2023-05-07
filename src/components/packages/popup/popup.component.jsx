import React from 'react';

import './popup.styles.scss';

const Popup = ({ message }) => {
  return (
    <div className="popup-box">
      <div className="popup-content">
        <h2>{message} ✅</h2>
      </div>
    </div>
  );
};

export default Popup;
