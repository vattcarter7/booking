import { combineReducers } from 'redux';

import cartReducer from './cart/cartReducer';
import categoryReducer from './category/categoryReducer';
import productReducer from './product/productReducer';
import userReducer from './user/userReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  category: categoryReducer,
  product: productReducer,
  user: userReducer
});

export default rootReducer;
