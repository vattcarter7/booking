import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getAuth } from './redux/user/userAction';

import HomePage from './pages/home/HomePage';
import CheckoutPage from './pages/checkout/CheckoutPage';

import Cart from './components/cart/Cart';
import Header from './components/header/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuth());
  }, [dispatch]);

  return (
    <div>
      <Header />
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
