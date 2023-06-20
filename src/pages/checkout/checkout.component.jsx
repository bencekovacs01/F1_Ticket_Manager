import { QRCodeCanvas } from 'qrcode.react';
import React, { useEffect, useState } from 'react';
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

import PinPopup from './pin-popup/pin-popup.component';

const CheckoutPage = ({ cartItems, total, clearCart }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [pin, setPin] = useState(null);

  const [popupClosed, setPopupClosed] = useState(false);

  let qrCodeList = [];

  useEffect(() => {
    const order = async () => {
      cartItems.map(item => {
        const canvas = document.getElementById(item.uid);
        const pngUrl = canvas
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream')
          .substring(31);
        qrCodeList.push(pngUrl);
      });

      const res = await addOrder({
        cartItems,
        total,
        images: qrCodeList,
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

  const qrCodes = cartItems.map(item => (
    <div key={item.uid}>
      <QRCodeCanvas
        hidden={true}
        id={item.uid}
        value={item.uid}
        size={300}
        bgColor={'transparent'}
        level={'H'}
      />
    </div>
  ));

  return (
    <>
      {showPopup && (
        <PinPopup
          onClose={pin => {
            setPopupClosed(true);
            setPin(pin);
          }}
          fromcheckout={true}
        />
      )}
      <div className="checkout-page">
        <h1 className="all-tracks-title">
          {'>>>>'} Checkout {'<<<<'}
        </h1>
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
            if (!cartItems || cartItems.length === 0) {
              console.log('EMPTY CART!');
              return;
            }
            setShowPopup(true);
          }}
        >
          Test order
        </CustomButton>
        {/* <CustomButton
        className="test-order"
        onClick={async () => {
          const response = await _NODE_GenerateKeyPair({
            userId: auth?.currentUser?.uid,
          });
          console.log('response', response);
          const encrypt = await _NODE_Encrypt({
            userId: auth?.currentUser?.uid,
          });
          console.log('encrypt', encrypt);
          const { encryptedKey, encryptedData } = encrypt?.data;

          const decrypt = await _NODE_Decrypt({
            userId: auth?.currentUser?.uid,
            encryptedKey: encryptedKey,
            encryptedData: encryptedData,
          });
          console.log('decrypt:', decrypt);
        }}
      >
        NODEJS
      </CustomButton> */}
        <StripeCheckoutButton total={total} cartItems={cartItems} />
        <div>{qrCodes}</div>
      </div>
    </>
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
