import { combineReducers } from 'redux';

import appReducer from './app/appReducer';
import cartReducer from './cart/cartReducer';
import categoryReducer from './category/categoryReducer';
import productReducer from './product/productReducer';
import userReducer from './user/userReducer';
import drawerReducer from './drawer/drawerReducer';

const rootReducer = combineReducers({
  app: appReducer,
  cart: cartReducer,
  category: categoryReducer,
  drawer: drawerReducer,
  product: productReducer,
  user: userReducer
});

export default rootReducer;
