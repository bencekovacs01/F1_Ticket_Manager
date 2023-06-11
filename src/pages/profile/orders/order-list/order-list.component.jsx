import React from 'react';
import OrderItem from '../order-item/order-item.component';

import './order-list.styles.scss';

const OrderList = ({ orders, onItemSelected }) => {
  const handleItemSelected = index => {
    onItemSelected(index);
  };

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
      <div style={{ height: '50vh', width: '100%', overflowY: 'auto' }}>
        {orders.map((order, index) => (
          <OrderItem
            key={index}
            idx={index}
            order={order}
            onItemSelected={handleItemSelected}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
