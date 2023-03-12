import React, { useEffect } from 'react';

import './order-detail.styles.scss';

import BackIcon from '../../../../assets/back.png';
import { useHistory } from 'react-router-dom';

const OrderDetail = ({ order, onBackClicked }) => {
  const handleBackClicked = () => {
    onBackClicked();
  };

  return (
    <div className="order-detail">
      <img className="back-icon" src={BackIcon} onClick={handleBackClicked} />
      <span>Total ${order.total}</span>
    </div>
  );
};

export default OrderDetail;
