import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';
import { addOrder, checkOrders } from '../../firebase/firebase.utils';
import { clearCart } from '../../redux/cart/cart.actions';

import CryptUtils, { decryptData, encryptData } from './crypt/crypt.utils';

import {
  selectCartItems,
  selectCartTotal,
} from '../../redux/cart/cart.selectors';

import './checkout.styles.scss';

import { v4 as uuidv4 } from 'uuid';
import PinPopup from './pin-popup/pin-popup.component';

const CheckoutPage = ({ cartItems, total, clearCart }) => {
  const qr =
    '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';

  const [showPopup, setShowPopup] = useState(false);
  const [pin, setPin] = useState(null);
  // const [cryptedUID, setCryptedUID] = useState(null);

  const [popupClosed, setPopupClosed] = useState(false);

  useEffect(() => {
    const order = async () => {
      // console.log(pin);
      const res = await addOrder({
        cartItems,
        total,
        image: qr,
        pin: pin,
      });
      if (res) clearCart();
    };

    if (pin) {
      order();
    }
  }, [pin]);

  useEffect(() => {
    if (popupClosed) {
      setTimeout(() => {
        setShowPopup(false);
        setPopupClosed(false);
      }, 700);
    }
  }, [popupClosed]);

  return (
    <div className="checkout-page">
      {showPopup && (
        <PinPopup
          onClose={pin => {
            setPopupClosed(true);
            setPin(pin);
          }}
          fromcheckout={true}
        />
      )}
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
        className="test-order"
        onClick={() => {
          // console.log(uuidv4());
          // console.log(generateCode());
          setShowPopup(true);
          // if (cartItems && cartItems.length !== 0) {
          //   addOrder({
          //     cartItems,
          //     total,
          //     image: qr,
          //     cryptedUID: encryptData(uuidv4()),
          //   });
          // }
        }}
      >
        Test order
      </CustomButton>
      <CustomButton
        className="test-order"
        onClick={() => {
          checkOrders({ circuitId: 'bahrain', pin: 123456 });
        }}
      >
        CHECK
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
