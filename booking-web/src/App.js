import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getAuth } from './redux/user/userAction';

import Header from './components/header/Header';
import HomePage from './pages/home/HomePage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

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
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </div>
  );
}

export default App;
