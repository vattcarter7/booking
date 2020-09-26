import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { PURCHASE_URL } from '../../utils/misc';
import { successBuyAction } from '../../redux/cart/cartAction';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Typography, Button } from '@material-ui/core';
import TextInputField from '../common/TextInputField';
import { ccyFormat } from '../../utils/misc';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
    minWidth: 450,
    backgroundColor: '#edf4ff',
    padding: 30
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
    margin: '15px auto',
    borderRadius: 0,
    backgroundColor: '#ebe9e6',
    position: 'relative'
  },
  CardElementContainer: {
    height: 40,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 0,
    backgroundColor: '#ebe9e6',
    position: 'relative',
    marginTop: 15,

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
    cursor: 'pointer',
    marginBottom: 10
  },
  payBtnContainerPending: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#6199f2',
    height: 40,
    cursor: 'pointer',
    marginBottom: 10
  },
  payBtn: {
    color: 'white',
    width: 400
  }
}));

const CheckoutForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [processing, setProcessing] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
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
    setCardComplete(event.complete);
    event.error ? setCheckoutError(event.error.message) : setCheckoutError();
  };

  let totalPriceArray = [];

  cartItems.map((cartItem) =>
    totalPriceArray.push(cartItem.price * cartItem.quantity)
  );

  const grandTotalPrice = totalPriceArray.reduce((a, b) => {
    return a + b;
  }, 0);

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{ name: '', email: '' }}
        // validationSchema={Yup.object({
        //   name: Yup.string().required('Card name holder is required')
        // })}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await handleSubmit();
          } catch (error) {
            setErrors({ info: error.message });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, isSubmitting, isValid, dirty, touched }) => (
          <Form autoComplete='off'>
            <h3>Personal Information</h3>
            <div className={classes.boxContainer}>
              <TextInputField
                name='name'
                label='Name'
                type='text'
                value={values.name}
              />
              <TextInputField
                name='email'
                label='Email'
                type='email'
                onChange={values.email}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <TextInputField name='address' label='Address' type='text' />
              <TextInputField name='city' label='City' type='text' />
            </div>

            <h3>Card Details</h3>
            <div className={classes.CardElementContainer}>
              <CardElement
                options={cardElementOption}
                onChange={handleCardDetailsChange}
              />
            </div>

            <div className={classes.errorContainer}>
              {checkoutError && (
                <Typography className={classes.error}>
                  {checkoutError}
                </Typography>
              )}
            </div>
            <div
              className={
                processing || !cardComplete
                  ? classes.payBtnContainerPending
                  : classes.payBtnContainer
              }
            >
              <Button
                onClick={handleSubmit}
                disabled={
                  processing ||
                  !isValid ||
                  isSubmitting ||
                  !stripe ||
                  !cardComplete
                }
                className={classes.payBtn}
              >
                {processing
                  ? 'Processing Payment...'
                  : `Pay $${ccyFormat(grandTotalPrice)}`}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CheckoutForm;
