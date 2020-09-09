import { combineReducers } from 'redux';

import userReducer from '../user/userReducer';
import productReducer from '../product/productReducer';

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer
});

export default rootReducer;
