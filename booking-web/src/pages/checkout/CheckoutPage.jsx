import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { makeStyles } from '@material-ui/core/styles';

import { DRAW_WIDTH } from '../../utils/misc';

import CheckoutForm from '../../components/checkout/CheckoutForm';

import { getCartItems } from '../../redux/cart/cartAction';

const stripePromise = loadStripe(
  'pk_test_51HNuCnHhTL6aJuZWqPtBInpLw5JBKlIqtPbHfX4WAzoKGxxgKNghZ2Aa8zCmPpdI3PacnBVN2ixs7rRzjy4gVvDX00xzBOhkHT'
);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px',
    padding: '30px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: DRAW_WIDTH,
      flexShrink: 0
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar
}));

const CheckoutPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { successBuy, cartItems, loading } = useSelector((state) => state.cart);
  const [status, setStatus] = React.useState('ready');

  if (loading) return <h5>loading...</h5>;

  if (successBuy)
    return (
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '60px',
          padding: '30px'
        }}
      >
        Congrats
      </h1>
    );

  if (cartItems.length === 0 && !loading) return <Redirect to='/' />;

  return (
    <div className={classes.root}>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
