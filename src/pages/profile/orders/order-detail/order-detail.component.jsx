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
      <img
        className="back-icon"
        alt="Go back"
        src={BackIcon}
        onClick={handleBackClicked}
      />
      <div className="order-detail-header">
        <div className="order-detail-header-block">
          <span className="rm-span">Circuit</span>
        </div>
        <div className="order-detail-header-block">
          <span className="rm-span">Ticket</span>
        </div>
        <div className="order-detail-header-block">
          <span className="rm-span">Quantity</span>
        </div>
        <div className="order-detail-header-block">
          <span className="rm-span">Price</span>
        </div>
        <div className="order-detail-header-block">
          <span className="rm-span">Price Total</span>
        </div>
        <div className="order-detail-header-block">
          <span className="rm-span">Interval</span>
        </div>
      </div>
      <div style={{ height: '35vh', width: '100%', overflowY: 'auto' }}>
        {cartItems.map((cartItem, index) => (
          <OrderDetailItem key={index} cartItem={cartItem} />
        ))}
      </div>
      <div className="detail-total">
        <span className="rm-span">Total ${total}</span>
      </div>
    </div>
  );
};

export default OrderDetail;
