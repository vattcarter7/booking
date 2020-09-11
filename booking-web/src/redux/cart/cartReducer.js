import { ADD_CART_ITEM } from './cartTypes';

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
        cartItems: [payload, ...state.cartItems],
        loading: false
      };
    default:
      return state;
  }
};

export default cartReducer;
