import React from 'react';

import './order-detail.styles.scss';

import BackIcon from '../../../../assets/back.png';
import OrderDetailItem from './order-detail-item/order-detail-item.component';

const OrderDetail = ({ order, onBackClicked }) => {
  const { cartItems, total } = order;

  const handleBackClicked = () => {
    onBackClicked();
  };

  return (
    <div className="order-detail">
      <img className="back-icon" src={BackIcon} onClick={handleBackClicked} />
      <div className="order-detail-header">
        <div className="order-detail-header-block">
          <span>Circuit</span>
        </div>
        <div className="order-detail-header-block">
          <span>Ticket</span>
        </div>
        <div className="order-detail-header-block">
          <span>Quantity</span>
        </div>
        <div className="order-detail-header-block">
          <span>Price</span>
        </div>
        <div className="order-detail-header-block">
          <span>Price Total</span>
        </div>
        <div className="order-detail-header-block">
          <span>Interval</span>
        </div>
      </div>
      {cartItems.map((cartItem, index) => (
        <OrderDetailItem key={index} cartItem={cartItem} />
      ))}
      <div className="detail-total">
        <span>Total ${total}</span>
      </div>
    </div>
  );
};

export default OrderDetail;