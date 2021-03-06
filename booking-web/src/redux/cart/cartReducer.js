import {
  ADD_CART_ITEM,
  DECREMENT_CART_ITEM_QUANTITY,
  GET_CART_ITEMS,
  REMOVE_CART_ITEM,
  CLEAR_CART_ITEMS,
  CLEAR_CART_ITEMS_LOCAL,
  PURCHASE,
  SET_SUCCESS_BUY_TO_FALSE
} from './cartTypes';
import { addItemToCart, removeItemFromCart } from './cartUtils';

const INITIAL_STATE = {
  cartItems: [],
  loading: true,
  successBuy: false,
  error: {}
};

const cartReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
        loading: false
      };
    case ADD_CART_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, payload),
        loading: false
      };
    case DECREMENT_CART_ITEM_QUANTITY:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, payload),
        loading: false
      };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== payload
        ),
        loading: false
      };
    case CLEAR_CART_ITEMS:
      return {
        ...state,
        cartItems: [],
        loading: false
      };
    case CLEAR_CART_ITEMS_LOCAL:
      return {
        ...state,
        cartItems: []
      };
    case PURCHASE:
      return {
        ...state,
        cartItems: [],
        successBuy: true,
        loading: false
      };
    case SET_SUCCESS_BUY_TO_FALSE:
      return {
        ...state,
        successBuy: false
      };
    default:
      return state;
  }
};

export default cartReducer;
