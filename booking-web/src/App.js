import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { APP_LOADED } from './redux/app/appReducer';
import { getAuth } from './redux/user/userAction';
import { getAllCategories } from './redux/category/categoryAction';

import HomePage from './pages/home/HomePage';
import CheckoutPage from './pages/checkout/CheckoutPage';

import Cart from './components/cart/Cart';
import Header from './components/header/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import MyDrawer from './components/drawer/CustomDrawer';

function App() {
  const dispatch = useDispatch();
  const { initialized } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(getAuth());
    dispatch(getAllCategories());
    dispatch({ type: APP_LOADED });
  }, [dispatch]);

  if (!initialized)
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center'
        }}
      >
        Loading...
      </div>
    );

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
