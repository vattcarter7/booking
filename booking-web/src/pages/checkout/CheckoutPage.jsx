import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from '../../components/checkout/CheckoutForm';
import { Redirect } from 'react-router-dom';

import { getCartItems } from '../../redux/cart/cartAction';

const stripePromise = loadStripe(
  'pk_test_51HNuCnHhTL6aJuZWqPtBInpLw5JBKlIqtPbHfX4WAzoKGxxgKNghZ2Aa8zCmPpdI3PacnBVN2ixs7rRzjy4gVvDX00xzBOhkHT'
);

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { successBuy, cartItems, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  if (loading) return <h5>loading...</h5>;

  if (successBuy) return <h1>Congrats</h1>;

  if (cartItems.length === 0 && !loading) return <Redirect to='/' />;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px',
        padding: '30px'
      }}
    >
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
