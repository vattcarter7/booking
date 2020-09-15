import React from 'react';
import { Link } from 'react-router-dom';

const CongratsPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <h2>Congratulations on your purchase</h2>
      <Link to='/'>
        <h3>Go to home page to shop more</h3>
      </Link>
    </div>
  );
};

export default CongratsPage;
