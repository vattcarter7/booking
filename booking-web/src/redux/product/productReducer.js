import { GET_PRODUCTS } from './productTypes';

const INITIAL_STATE = {
  products: [],
  loading: true,
  error: {}
};

const productReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default productReducer;