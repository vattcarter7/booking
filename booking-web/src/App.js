import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getAuth } from './redux/user/userAction';
import { getAllCategories } from './redux/category/categoryAction';
import { getCartItems } from './redux/cart/cartAction';

import HomePage from './pages/home/HomePage';
import CheckoutPage from './pages/checkout/CheckoutPage';

import Cart from './components/cart/Cart';
import Header from './components/header/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import MyDrawer from './components/drawer/CustomDrawer';
import Loading from './components/loading/Loading';
import { APP_LOADED } from './redux/app/appReducer';

function App() {
  const dispatch = useDispatch();
  const { loading: categoriesLoading } = useSelector((state) => state.category);
  const { loading: authLoading } = useSelector((state) => state.user);
  const { loading: cartLoading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getAuth());
    dispatch(getAllCategories());
    dispatch(getCartItems());
  }, [dispatch]);

  if (categoriesLoading || authLoading || cartLoading) {
    return <Loading />;
  } else {
    dispatch({ type: APP_LOADED });
  }

  return (
    <div>
      <Header />
      <MyDrawer />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Switch>
    </div>
  );
}

export default App;
