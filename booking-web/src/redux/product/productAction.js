import axios from 'axios';

import { GET_PRODUCTS } from './productTypes';
import { PRODUCT_URL } from '../../utils/misc';

export const getAllProducts = (order, limit, skip) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${PRODUCT_URL}/?order=${order}&limit=${limit}&skip=${skip}`
    );
    dispatch({
      type: GET_PRODUCTS,
      payload: { ...res.data, limit, skip }
    });
  } catch (error) {
    console.log('ERROR getting all products');
  }
};
