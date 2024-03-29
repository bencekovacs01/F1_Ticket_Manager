export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.type === cartItemToAdd.type
  );

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.type === cartItemToAdd.type
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
  return [];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.type === cartItemToRemove.type
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(
      cartItem => cartItem.type !== cartItemToRemove.type
    );
  }

  return cartItems.map(cartItem =>
    cartItem.type === cartItemToRemove.type
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
