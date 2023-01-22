import React from 'react';

import './cart-item.styles.scss';

const CartItem = ({ item: { url, interval, type, quantity, circuit } }) => (
  <div className="cart-item" key={circuit}>
    <img src={url} alt="item"></img>
    <div className="item-details">
      <span className="name">{type}</span>
      <span className="name">{interval}</span>
      <span className="price">
        {quantity} x ${quantity}
      </span>
    </div>
  </div>
);

export default CartItem;
