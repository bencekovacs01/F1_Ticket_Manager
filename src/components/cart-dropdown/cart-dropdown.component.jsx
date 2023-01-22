import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import './cart-dropdown.styles.scss';
import { v4 as uuidv4 } from 'uuid';

const CartDropdown = ({ v4 = uuidv4(), cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <div className="loader" />
        // <span className="empty-message">
        //   {/* {setInterval(() => {
        //     v4 = uuidv4();
        //     console.log('RELOADED');
        //   }, 5000)} */}
        //   {cartItems.length === 0 ? (
        //     <div className="loader" />
        //   ) : (
        //     'Your cart is empty or failed to load!'
        //   )}
        // </span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push('/checkout');
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

const mapStateToPtops = createStructuredSelector({
  cartItems: selectCartItems,
});

export default withRouter(connect(mapStateToPtops)(CartDropdown));
