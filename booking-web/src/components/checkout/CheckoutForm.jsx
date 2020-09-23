import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { PURCHASE_URL } from '../../utils/misc';
import { successBuyAction } from '../../redux/cart/cartAction';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
    marginTop: 50,
    width: 350
  },
  payBtn: {
    marginTop: 30,
    marginBottom: 20
  },
  error: {
    color: 'red'
  }
}));

const CheckoutForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [processing, setProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    if (!error) {
      const { id } = paymentMethod;

      try {
        setProcessing(true);
        const { data } = await axios.post(`${PURCHASE_URL}`, { id });
        setProcessing(false);
        dispatch(successBuyAction());
        console.log(data);
      } catch (error) {
        setProcessing(false);
        console.log(error);
      }
    }
  };

  const cardElementOption = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#9e2146'
      },
      complete: {
        iconColor: 'green'
      }
    },
    hidePostalCode: true,
    iconStyle: 'solid'
  };

  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={cardElementOption}
          onChange={handleCardDetailsChange}
        />
        <button
          className={classes.payBtn}
          type='submit'
          disabled={!stripe || processing}
        >
          {!processing ? 'Pay Now' : 'Proccessing...'}
        </button>
        {checkoutError && (
          <Typography className={classes.error}>{checkoutError}</Typography>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
