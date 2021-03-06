import axios from 'axios';
import { CART_URL, PURCHASE_URL } from '../../utils/misc';

import {
  ADD_CART_ITEM,
  GET_CART_ITEMS,
  DECREMENT_CART_ITEM_QUANTITY,
  REMOVE_CART_ITEM,
  CLEAR_CART_ITEMS,
  CLEAR_CART_ITEMS_LOCAL,
  PURCHASE,
  SET_SUCCESS_BUY_TO_FALSE
} from './cartTypes';

// get all cart items of the user
export const getCartItems = () => async (dispatch) => {
  try {
    const res = await axios.get(`${CART_URL}`);
    dispatch({
      type: GET_CART_ITEMS,
      payload: res.data.results
    });
  } catch (error) {
    dispatch({
      type: 'CART_ERROR',
      payload: { error: 'Unable to fetch cart items' }
    });
  }
};

// add cart item
export const addCartItem = (body) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`${CART_URL}`, body, config);
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
      type: 'CART_ERROR',
      payload: { error: 'Unable to add cart item' }
    });
  }
};

// decrement cart item quantity
export const decrementCartItemQuantity = (body) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(`${CART_URL}`, body, config);
    console.log(res.data);
    dispatch({
      type: DECREMENT_CART_ITEM_QUANTITY,
      payload: {
        product_id: res.data.results.product_id,
        quantity: res.data.results.quantity
      }
    });
  } catch (err) {
    dispatch({
      type: 'CART_ERROR',
      payload: { error: 'Unable to decrement cart item' }
    });
  }
};

// remove cart item
export const removeCartItem = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${CART_URL}/${id}`);
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: res.data.results.id
    });
  } catch (err) {
    dispatch({
      type: 'CART_ERROR',
      payload: { error: 'Unable to remove cart item' }
    });
  }
};

// clear cart items
//TODO: clear all cart items from the server
export const clearCartItems = () => async (dispatch) => {
  try {
    await axios.delete(`${CART_URL}`);
    dispatch({ type: CLEAR_CART_ITEMS });
  } catch (error) {
    dispatch({
      type: 'CART_ERROR',
      payload: { error: 'Unable to remove all cart items' }
    });
  }
};

// clear cart items locally
export const clearCartItemsLocal = () => (dispatch) => {
  dispatch({ type: CLEAR_CART_ITEMS_LOCAL });
};

export const purchase = (id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // const body = JSON.stringify({ id, nameOnCard, contactEmail, address });
  try {
    const res = await axios.post(`${PURCHASE_URL}`, { id }, config);
    dispatch({
      type: PURCHASE,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: 'ERROR PURCHASE' });
  }
};

export const setSuccessBuyToFalse = () => (dispatch) => {
  dispatch({ type: SET_SUCCESS_BUY_TO_FALSE });
};
