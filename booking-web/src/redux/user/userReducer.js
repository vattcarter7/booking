import {
  USER_LOADED,
  REGISTER_FAIL,
  LOGIN_FAIL,
  AUTH_FAIL,
  LOGOUT_USER
} from './userTypes';

const INITIAL_STATE = {
  isAuthenticated: null,
  loading: true,
  user: null
};
const userReducer = (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_FAIL:
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
};

export default userReducer;
