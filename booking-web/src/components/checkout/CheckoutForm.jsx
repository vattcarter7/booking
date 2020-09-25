import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { PURCHASE_URL } from '../../utils/misc';
import { successBuyAction } from '../../redux/cart/cartAction';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Typography, Button } from '@material-ui/core';
import BillingDetailsField from '../billing-detail/BillingDetailsField';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
    width: 400
  },
  errorContainer: {
    minWidth: 300,
    height: 25,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  },
  error: {
    color: 'red',
    display: 'block',
    height: 30
  },
  boxContainer: {
    minWidth: 350,
    margin: '30px auto',
    borderRadius: 4,
    backgroundColor: '#ebe9e6',
    position: 'relative'
  },
  CardElementContainer: {
    height: 40,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#ebe9e6',
    position: 'relative',

    '& .StripeElement': {
      minWidth: 400,
      padding: 15
    }
  },
  payBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#165de0',
    height: 40,
    cursor: 'pointer'
  },
  payBtn: {
    color: 'white',
    width: 400
  }
}));

const CheckoutForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [processing, setProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

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
        await axios.post(`${PURCHASE_URL}`, { id });
        setProcessing(false);
        dispatch(successBuyAction());
      } catch (error) {
        setCheckoutError(error.response.data.message);
        setProcessing(false);
      }
    }
  };

  const cardElementOption = {
    style: {
      base: {
        fontSize: '16px',
        color: '#757574',
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

  const handleCardDetailsChange = (event) => {
    event.error ? setCheckoutError(event.error.message) : setCheckoutError();
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <div className={classes.boxContainer}>
          <BillingDetailsField />
        </div>
        <div className={classes.CardElementContainer}>
          <CardElement
            options={cardElementOption}
            onChange={handleCardDetailsChange}
          />
        </div>

        <div className={classes.errorContainer}>
          {checkoutError && (
            <Typography className={classes.error}>{checkoutError}</Typography>
          )}
        </div>
        <div className={classes.payBtnContainer}>
          <Button
            onClick={handleSubmit}
            disabled={processing || !stripe}
            className={classes.payBtn}
          >
            {processing ? 'Processing Payment...' : 'Pay Now'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
