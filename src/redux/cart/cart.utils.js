export const addItemToCart = (cartItems, cartItemToAdd) => {
  // console.log(cartItemToAdd[0]);
  const existingCartItem = cartItems.find(
    // cartItem => cartItem.id === cartItemToAdd.id
    cartItem => cartItem[0] === cartItemToAdd[0]
  );

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem[0] === cartItemToAdd[0]
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map(cartItem =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
