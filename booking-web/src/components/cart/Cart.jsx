import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CartItem from './CartItem';

const Cart = () => {
  const { cartItems, loading } = useSelector((state) => state.cart);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <CartItem />
      {cartItems.length > 0 && !loading ? (
        <Link to='/checkout'>
          <div style={{ marginTop: 50 }}>Procceed checkout</div>
        </Link>
      ) : (
        <Link to='/'>Go to home page for more shopping</Link>
      )}
    </div>
  );
};

export default Cart;
