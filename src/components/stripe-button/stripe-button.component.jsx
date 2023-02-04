import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

import Logo from '../../assets/F1.svg';
import { addOrder } from '../../firebase/firebase.utils';
import { clearCart } from '../../redux/cart/cart.actions';

const StripeCheckoutButton = ({ total, cartItems, clearCart }) => {
  const priceForStripe = total * 100;
  const publishableKey =
    'pk_test_51LBeUlGMNWn8GNGUXZVhagu5gVKdongiHuXJ01vk6b25QhzSk0yc4DpmQQcDvLGKcpyXk79tMYtRWwDGO7hJV26S00nrdpMDiU';

  const onToken = token => {
    // console.log(token);
    alert('Payment Successful');
    addOrder({ cartItems, total });
    clearCart();
  };

  return (
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
  );
};

const mapDispatchToProps = dispatch => ({
  clearCart: () => dispatch(clearCart()),
});

export default connect(null, mapDispatchToProps)(StripeCheckoutButton);
