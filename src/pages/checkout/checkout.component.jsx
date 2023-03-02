import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';
import { addOrder } from '../../firebase/firebase.utils';
import { clearCart } from '../../redux/cart/cart.actions';

import {
  selectCartItems,
  selectCartTotal,
} from '../../redux/cart/cart.selectors';

import './checkout.styles.scss';

const CheckoutPage = ({ cartItems, total, clearCart }) => {
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Circuit</span>
        </div>
        <div className="header-block">
          <span>Ticket</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Price Total</span>
        </div>
        <div className="header-block">
          <span>Interval</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem, index) => (
        <CheckoutItem key={index} cartItem={cartItem} />
      ))}
      <div className="total">
        <span>Total: ${total}</span>
      </div>
      <div className="test-warning">
        *Please use the following credit card for payments*
        <br />
        4242 4242 4242 4242 - Exp: 12/34 - CVV: 123
      </div>
      <CustomButton
        onClick={() => {
          if (cartItems && cartItems.length !== 0) {
            addOrder({ cartItems, total });
            clearCart();
          }
        }}
      >
        Test order
      </CustomButton>
      <StripeCheckoutButton total={total} cartItems={cartItems} />
    </div>
  );
};

const mapStateToPtops = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

const mapDispatchToProps = dispatch => ({
  clearCart: () => dispatch(clearCart()),
});

export default connect(mapStateToPtops, mapDispatchToProps)(CheckoutPage);
