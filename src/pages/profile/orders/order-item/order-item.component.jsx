import React from 'react';

import './order-item.styles.scss';

import detailsIcon from '../../../../assets/details_icon.png';

const OrderItem = ({ idx, order, onItemSelected }) => {
  const { orderDate, total } = order;

  const handleClick = () => {
    onItemSelected(idx);
  };

  return (
    <div className="order-item">
      <div className="no">{idx + 1}</div>
      <div className="date">
        {new Date(orderDate?.seconds * 1000).toLocaleDateString()}
      </div>
      <div className="total">${total}</div>
      <div className="details" onClick={handleClick}>
        <img src={detailsIcon} alt="Details" />
      </div>
    </div>
  );
};

export default OrderItem;
