import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/header/Header';
import HomePage from './pages/home/HomePage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

function App() {
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
