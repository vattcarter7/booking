import axios from 'axios';

import { AUTH_URL } from '../../utils/misc';
import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  USER_LOADED,
  REGISTER_FAIL,
  LOGIN_FAIL,
  AUTH_FAIL
} from './userTypes';

export const register = ({ firstname, lastname, email, password }) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ firstname, lastname, email, password });

  try {
    const res = await axios.post(`${AUTH_URL}/register`, body, config);
    dispatch({
      type: USER_LOADED,
      payload: res.data.user
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: AUTH_FAIL
    });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`${AUTH_URL}/login`, body, config);
    dispatch({
      type: USER_LOADED,
      payload: res.data.user
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const getAuth = () => async (dispatch) => {
  try {
    const res = await axios.get(`${AUTH_URL}/me`);

    if (!res.data.user) {
      dispatch({
        type: AUTH_FAIL
      });
    } else {
      dispatch({
        type: USER_LOADED,
        payload: res.data.user
      });
    }
  } catch (err) {
    console.log(err);

    dispatch({
      type: AUTH_FAIL
    });
  }
};