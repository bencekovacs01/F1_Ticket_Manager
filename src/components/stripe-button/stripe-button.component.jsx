import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import Logo from '../../assets/F1.svg';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51LBeUlGMNWn8GNGUXZVhagu5gVKdongiHuXJ01vk6b25QhzSk0yc4DpmQQcDvLGKcpyXk79tMYtRWwDGO7hJV26S00nrdpMDiU';
  const onToken = token => {
    console.log(token);
    alert('Payment Successful');
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="F1 Ticket Manager™"
      billingAddress
      shippingAddress
      image={Logo}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
