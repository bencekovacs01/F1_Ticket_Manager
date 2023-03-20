import { getUserCart } from '../../firebase/firebase.utils';
import { establishCart } from '../cart/cart.actions';
import { store } from '../store';
import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      getUserCart().then(cart => {
        if (cart) {
          store.dispatch(establishCart(cart));
        } else {
          // console.log('Could not load cart OR is empty!');
        }
      });
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    case UserActionTypes.SIGN_UP_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_IN_FAILURE:
      alert('Wrong credentials or unverified account!');
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
