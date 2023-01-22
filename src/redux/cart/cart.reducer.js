import { getUserCart, updateUserCart } from '../../firebase/firebase.utils';
import { store } from '../store';
import { establishCart } from './cart.actions';
import { CartActionTypes } from './cart.types';
import { addItemToCart, removeItemFromCart } from './cart.utils';

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

const CartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.ESTABLISH_CART: {
      return {
        ...state,
        cartItems: action.payload,
      };
    }
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case CartActionTypes.ADD_ITEM:
      updateUserCart({
        type: action.payload.type,
        interval: action.payload.interval,
        url: action.payload.url,
        quantity: 1,
      }).then(() => {
        getUserCart().then(cart => {
          if (cart) {
            store.dispatch(establishCart(cart));
          } else {
            console.log('Could not load cart OR is empty!');
          }
        });
      });
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      updateUserCart({
        type: action.payload.type,
        quantity: 0,
      });
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem => cartItem.type !== action.payload.type
        ),
      };
    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    default:
      return state;
  }
};

export default CartReducer;
