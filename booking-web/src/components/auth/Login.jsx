import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import * as Yup from 'yup';

// import { Form, FormField, ErrorMessage, SubmitButton } from '../forms';
import { login } from '../../redux/user/userAction';
import { DRAW_WIDTH } from '../../utils/misc';

// const validationSchema = Yup.object().shape({
//   email: Yup.string().required().email().label('Email'),
//   password: Yup.string().required().min(4).label('Password')
// });

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '30px',
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      marginLeft: DRAW_WIDTH,
      flexShrink: 0
    }
  }
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: ''
  // });

  const [loginFailed, setLoginFailed] = useState(false);

  // const { email, password } = formData;

  // const onChange = (e) =>
  //   setFormData({ ...formData, [e.target.name]: e.target.value });

  // const handleSubmit = (e) => {
  //   try {
  //     e.preventDefault();
  //     dispatch(login({ email, password }));
  //     setLoginFailed(false);
  //   } catch (error) {
  //     setLoginFailed(true);
  //   }
  // };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className={classes.root}>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign Into Your Account
      </p>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required('Email is required')
            .email('Please provide a valid email'),
          password: Yup.string().required('Password is required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(login(values));
          setSubmitting(false);
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
          <form onSubmit={handleSubmit} autoComplete='off'>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '200px',
                padding: 20
              }}
            >
              <input
                type='email'
                name='email'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <input
                type='password'
                name='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
              <button type='submit' disabled={!isValid || isSubmitting}>
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
    </div>
  );
};

export default Login;
