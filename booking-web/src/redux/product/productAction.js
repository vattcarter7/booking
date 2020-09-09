import axios from 'axios';

import { GET_PRODUCTS } from './productTypes';

export const getAllProducts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/product');
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    });
  } catch (error) {
    console.log('ERROR getting all products');
  }
};
