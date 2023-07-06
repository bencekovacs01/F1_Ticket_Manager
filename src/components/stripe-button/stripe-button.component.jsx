import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

import Logo from '../../assets/F1.svg';
import { addOrder, auth } from '../../firebase/firebase.utils';
import { clearCart } from '../../redux/cart/cart.actions';

import '../../pages/checkout/checkout.styles.scss';

import { QRCodeCanvas } from 'qrcode.react';
import { useEffect, useState } from 'react';
import PinPopup from '../../pages/checkout/pin-popup/pin-popup.component';

const StripeCheckoutButton = ({ total, cartItems, clearCart }) => {
  const priceForStripe = total * 100;
  const publishableKey =
    'pk_test_51LBeUlGMNWn8GNGUXZVhagu5gVKdongiHuXJ01vk6b25QhzSk0yc4DpmQQcDvLGKcpyXk79tMYtRWwDGO7hJV26S00nrdpMDiU';

  const onToken = token => {
    // console.log(token);
    setShowPopup(true);
    alert('Payment Successful');
  };

  const [showPopup, setShowPopup] = useState(false);
  const [popupClosed, setPopupClosed] = useState(false);
  const [pin, setPin] = useState(null);

  let qrCodeList = [];

  const qrCodes = cartItems.map(item => (
    <div key={item.uid}>
      <QRCodeCanvas
        hidden={true}
        id={item.uid}
        value={auth?.currentUser?.uid + '*' + item.uid}
        size={300}
        bgColor={'transparent'}
        level={'H'}
      />
    </div>
  ));

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
      <StripeCheckout
        label="Pay Now"
        name="F1 Ticket Manager™"
        billingAddress
        shippingAddress
        image={Logo}
        description={`Your total is $${total}`}
        amount={priceForStripe}
        panelLabel="Pay Now"
        token={onToken}
        stripeKey={publishableKey}
      />
      <div>{qrCodes}</div>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  clearCart: () => dispatch(clearCart()),
});

export default connect(null, mapDispatchToProps)(StripeCheckoutButton);
