import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CartItem from './CartItem';

const Cart = () => {
  const { cartItems, loading } = useSelector((state) => state.cart);

  return <CartItem />;
};

export default Cart;
