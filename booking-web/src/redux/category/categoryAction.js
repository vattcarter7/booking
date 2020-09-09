import axios from 'axios';

import { GET_CATEGORIES } from './categoryTypes';

export const getAllCategories = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/category');
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    });
  } catch (error) {
    console.log('ERROR getting all category');
  }
};
