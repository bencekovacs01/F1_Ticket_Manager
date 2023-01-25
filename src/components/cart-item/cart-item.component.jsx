import React from 'react';

import './cart-item.styles.scss';

const CartItem = ({
  item: { url, interval, type, quantity, circuit, price },
}) => {
  return (
    <div className="cart-item" key={circuit}>
      <img src={url} alt="item"></img>
      <div className="item-details">
        <span className="name">{type}</span>
        <span className="name">{interval}</span>
        <span className="price">
          {quantity} x ${price} = ${quantity * price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
