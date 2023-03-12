import React from 'react';

import './order-detail-item.styles.scss';

const OrderDetailItem = ({ cartItem }) => {
  const { type, url, interval, quantity, price } = cartItem;
  return (
    <div className="order-detail-item">
      <div className="detail-image-container">
        <img src={url} alt="item" />
      </div>
      <span className="name">{type}</span>
      <span className="quantity">
        <span className="value">{quantity}</span>
      </span>
      <span className="price">${price}</span>
      <span className="price-total">${quantity * price}</span>
      <span className="interval">{interval}</span>
    </div>
  );
};

export default OrderDetailItem;
