import React from 'react';
import OrderItem from './order-item/order-item.component';

import './orders.styles.scss';

const Orders = ({ orders }) => {
  if (!orders)
    return (
      <div
        style={{ marginTop: '30px', fontSize: '25px' }}
        className="orders-container"
      >
        There are no orders yet!
      </div>
    );
  return (
    <div className="orders-container">
      <div className="orders">
        <div className="block">
          <span>No.</span>
        </div>
        <div className="block">
          <span>Date</span>
        </div>
        <div className="block">
          <span>Total</span>
        </div>
        <div className="block">
          <span>Details</span>
        </div>
      </div>
      {orders.map((order, index) => (
        <OrderItem key={index} idx={index} order={order} />
      ))}
    </div>
  );
};

export default Orders;
