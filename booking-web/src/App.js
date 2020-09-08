import React from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/header/Header';
import HomePage from './pages/home/HomePage';

function App() {
  return (
    <div>
      <Header />
      <HomePage />
    </div>
  );
}

export default App;
