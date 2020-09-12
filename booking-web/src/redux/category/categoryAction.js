import axios from 'axios';

import { GET_CATEGORIES } from './categoryTypes';
import { CATEGORY_URL } from '../../utils/misc';

export const getAllCategories = () => async (dispatch) => {
  try {
    const res = await axios.get(`${CATEGORY_URL}`);
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    });
  } catch (error) {
    console.log('ERROR getting all category');
  }
};
