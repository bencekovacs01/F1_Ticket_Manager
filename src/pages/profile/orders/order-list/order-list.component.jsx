import React, { useState } from 'react';
import OrderItem from '../order-item/order-item.component';

import './order-list.styles.scss';

const OrderList = ({ orders, onItemSelected }) => {
  const handleItemSelected = index => {
    onItemSelected(index);
  };

  const sortedOrders = [...orders].sort((a, b) => {
    const aDate = new Date(
      a.orderDate.seconds * 1000 + a.orderDate.nanoseconds / 1000000
    );
    const bDate = new Date(
      b.orderDate.seconds * 1000 + b.orderDate.nanoseconds / 1000000
    );
    return aDate - bDate;
  });

  console.log(sortedOrders);

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
      {sortedOrders.map((order, index) => (
        <OrderItem
          key={index}
          idx={index}
          order={order}
          onItemSelected={handleItemSelected}
        />
      ))}
    </div>
  );
};

export default OrderList;
