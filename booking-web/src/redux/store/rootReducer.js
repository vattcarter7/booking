import { combineReducers } from 'redux';

import userReducer from '../user/userReducer';
import productReducer from '../product/productReducer';
import categoryReducer from '../category/categoryReducer';

const rootReducer = combineReducers({
  category: categoryReducer,
  user: userReducer,
  product: productReducer
});

export default rootReducer;
