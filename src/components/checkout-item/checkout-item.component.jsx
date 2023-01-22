import React from 'react';
import { connect } from 'react-redux';

import {
  clearItemFromCart,
  addItem,
  removeItem,
} from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';
import removeIcon from '../../assets/remove.png';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { type, url, interval, quantity } = cartItem;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={url} alt="item" />
      </div>
      <span className="name">{type}</span>
      <span className="quantity">
        <div
          className="arrow"
          onClick={() =>
            /*console.log(cartItem.interval)*/ removeItem(cartItem)
          }
        >
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItem(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="interval">{interval}</span>
      <div className="remove-button" onClick={() => clearItem(cartItem)}>
        <img src={removeIcon} alt="Remove item" />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItemFromCart(item)),
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
