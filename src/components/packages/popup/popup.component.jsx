import React from 'react';

import './popup.styles.scss';

const Popup = ({ onClose }) => {
  return (
    <div className="popup-box">
      <div className="popup-content">
        <h2>Added to cart! ✅</h2>
      </div>
    </div>
  );
};

export default Popup;
