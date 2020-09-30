import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Typography, Button, Divider } from '@material-ui/core';
import { ccyFormat } from '../../utils/misc';
import { DRAW_WIDTH } from '../../utils/misc';

import { purchase } from '../../redux/cart/cartAction';

const validationSchema = Yup.object({
  nameOnCard: Yup.string().required('Name on card is required'),
  contactEmail: Yup.string()
    .required('Contact email is required')
    .email('Please provide a valid email'),
  address: Yup.string().required('Shipping address is required')
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '30px',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      marginLeft: DRAW_WIDTH,
      flexShrink: 0
    }
  },
  errorContainer: {
    minWidth: 300,
    height: 25,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
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
    backgroundColor: '#F5F6F7',
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
  },

  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: 430,
    height: 'auto',
    backgroundColor: '#eff1f9',
    padding: 15,
    marginTop: 20,
    fontWeight: 300,
    paddingLeft: 57,
    paddingRight: 57
  },
  input: {
    width: '100%',
    height: 35,
    border: '1px solid #d6d7db',
    paddingLeft: 10,
    marginBottom: 20,
    background: '#f5f6f7',
    outline: 'none',
    textAlign: 'center'
  },
  label: {
    fontWeight: 400,
    fontSize: 15,
    color: 'grey',
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  error: {
    alignItems: 'center',
    alignContent: 'center',
    color: 'red',
    fontSize: 12,
    height: 5,
    marginTop: -17
  },
  payErrorMsg: {
    color: 'red'
  }
}));

const CheckoutForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { cartItems, successBuy } = useSelector((state) => state.cart);
  const [cardComplete, setCardComplete] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const stripe = useStripe();
  const elements = useElements();

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
    console.log(event);
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
      <div className={classes.formContainer}>
        <Formik
          initialValues={{ nameOnCard: '', contactEmail: '', address: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              const { error, paymentMethod } = await stripe.createPaymentMethod(
                {
                  type: 'card',
                  card: elements.getElement(CardElement)
                }
              );

              if (!error) {
                const { id } = paymentMethod;
                dispatch(purchase(id));
              }
            } catch (error) {
              setErrors({ info: error.message });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid
          }) => (
            <form autoComplete='off'>
              <h3>Billing Information</h3>
              <div>
                <label className={classes.label} htmlFor='contactEmail'>
                  Contact Email
                </label>
                <input
                  className={classes.input}
                  type='email'
                  name='contactEmail'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.contactEmail}
                />
                <div className={classes.error}>
                  {errors.contactEmail &&
                    touched.contactEmail &&
                    errors.contactEmail}
                </div>
              </div>

              <br />

              <div>
                <label className={classes.label} htmlFor='address'>
                  Shipping Address
                </label>
                <input
                  className={classes.input}
                  type='text'
                  name='address'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                />
                <div className={classes.error}>
                  {errors.address && touched.address && errors.address}
                </div>
              </div>

              <br />
              <br />
              <Divider />
              <br />

              <h3>Payment Information</h3>
              <div>
                <label className={classes.label} htmlFor='nameOnCard'>
                  Name On Card
                </label>
                <input
                  className={classes.input}
                  type='text'
                  name='nameOnCard'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nameOnCard}
                />
                <div className={classes.error}>
                  {errors.nameOnCard && touched.nameOnCard && errors.nameOnCard}
                </div>
              </div>
              <br />
              <label className={classes.label} htmlFor='nameOnCard'>
                Card Details
              </label>
              <div className={classes.CardElementContainer}>
                <CardElement
                  options={cardElementOption}
                  onChange={handleCardDetailsChange}
                />
              </div>

              {checkoutError && (
                <Typography className={classes.payErrorMsg}>
                  {checkoutError}
                </Typography>
              )}

              <div
                className={
                  !cardComplete || !isValid || isSubmitting
                    ? classes.payBtnContainerPending
                    : classes.payBtnContainer
                }
              >
                <Button
                  onClick={handleSubmit}
                  type='submit'
                  disabled={
                    !stripe || !cardComplete || !isValid || isSubmitting
                  }
                  className={classes.payBtn}
                >
                  {isSubmitting || successBuy
                    ? 'Processing Payment...'
                    : `Pay $${ccyFormat(grandTotalPrice)}`}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CheckoutForm;
