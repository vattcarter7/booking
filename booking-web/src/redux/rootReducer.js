import { combineReducers } from 'redux';

import userReducer from './category/categoryReducer';
import productReducer from './product/productReducer';
import categoryReducer from './category/categoryReducer';
import cartReducer from './cart/cartReducer';

const rootReducer = combineReducers({
  category: categoryReducer,
  user: userReducer,
  product: productReducer,
  cart: cartReducer
});

export default rootReducer;
