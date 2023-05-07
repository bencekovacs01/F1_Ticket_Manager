import React, { useState } from 'react';
import OrderDetail from './order-detail/order-detail.component';
import OrderList from './order-list/order-list.component';

import './orders.styles.scss';

const Orders = ({ orders }) => {
  const [itemIndex, setItemIndex] = useState(0);
  const [detail, setDetail] = useState(false);

  orders = [...orders].sort((a, b) => {
    const aDate = new Date(
      a.orderDate.seconds * 1000 + a.orderDate.nanoseconds / 1000000
    );
    const bDate = new Date(
      b.orderDate.seconds * 1000 + b.orderDate.nanoseconds / 1000000
    );
    return bDate - aDate;
  });

  if (orders.length === 0)
    return (
      <div
        style={{ marginTop: '30px', fontSize: '25px' }}
        className="orders-container"
      >
        There are no orders yet!
      </div>
    );

  const handleItemSelected = index => {
    setItemIndex(index);
    setDetail(true);
  };

  const handleBackClicked = () => {
    setDetail(false);
  };

  return (
    <>
      {detail ? (
        <OrderDetail
          order={orders[itemIndex]}
          onBackClicked={handleBackClicked}
        />
      ) : (
        <OrderList orders={orders} onItemSelected={handleItemSelected} />
      )}
    </>
  );
};

export default Orders;
