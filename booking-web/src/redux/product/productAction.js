import axios from 'axios';

import { GET_PRODUCTS } from './productTypes';
import { PRODUCT_URL } from '../../utils/misc';

export const getAllProducts = () => async (dispatch) => {
  try {
    const res = await axios.get(`${PRODUCT_URL}`);
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    });
  } catch (error) {
    console.log('ERROR getting all products');
  }
};
