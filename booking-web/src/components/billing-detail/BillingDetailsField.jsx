import React, { Fragment } from 'react';
import FormField from '../common/FormField';

const BillingDetailsFields = () => {
  return (
    <Fragment>
      <FormField name='name' label='Name' type='text' />
      <FormField name='email' label='Email' type='email' />
      <FormField name='address' label='Address' type='text' />
      <FormField name='city' label='City' type='text' />
    </Fragment>
  );
};
export default BillingDetailsFields;
