import React from 'react';
import axios from 'axios';

import { PURCHASE_URL } from '../../utils/misc';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
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
        const { data } = await axios.post(`${PURCHASE_URL}`, { id });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div style={{ width: '300px', alignItems: 'center', margin: '20px' }}>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
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
              }
            },
            hidePostalCode: true
          }}
        />
        <button type='submit' disabled={!stripe}>
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
