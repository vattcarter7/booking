import axios from 'axios';

import { ADD_CART_ITEM } from './cartTypes';

// add cart item
export const addCartItem = (body) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`/api/v1/cart`, body, config);
    console.log(res.data);
    dispatch({
      type: ADD_CART_ITEM,
      payload: {
        product_id: res.data.results.product_id,
        quantity: res.data.results.quantity
      }
    });
  } catch (err) {
    dispatch({
      type: 'POST_ERROR',
      payload: { error: 'Unable to add cart item' }
    });
  }
};
