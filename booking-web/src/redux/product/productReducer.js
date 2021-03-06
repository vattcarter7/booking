import { GET_PRODUCTS } from './productTypes';

const INITIAL_STATE = {
  products: [],
  loading: true,
  order: null,
  limit: 12,
  skip: 0,
  error: {}
};

const productReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false,
        limit: payload.limit,
        skip: payload.skip
      };
    default:
      return state;
  }
};

export default productReducer;
