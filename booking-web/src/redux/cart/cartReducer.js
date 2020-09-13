import {
  ADD_CART_ITEM,
  DECREMENT_CART_ITEM_QUANTITY,
  GET_CART_ITEMS
} from './cartTypes';
import { addItemToCart, removeItemFromCart } from './cartUtils';

const INITIAL_STATE = {
  cartItems: [],
  loading: true,
  error: {}
};

const cartReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CART_ITEM:
      return {
        ...state,
        // cartItems: [payload, ...state.cartItems],
        cartItems: addItemToCart(state.cartItems, payload),
        loading: false
      };
    case DECREMENT_CART_ITEM_QUANTITY:
      return {
        ...state,
        // cartItems: [payload, ...state.cartItems],
        cartItems: removeItemFromCart(state.cartItems, payload),
        loading: false
      };
    case GET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default cartReducer;
