import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';

import * as Yup from 'yup';

import { login } from '../../redux/user/userAction';
import { DRAW_WIDTH } from '../../utils/misc';

const validationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email('Please provide a valid email'),
  password: Yup.string().required('Password is required')
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
  formFieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '350px',
    padding: 20
  },
  formField: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15
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
  button: {
    cursor: 'pointer',
    backgroundColor: '#1a3be0',
    color: 'white',
    border: 'none',
    padding: 10,
    fontSize: 16,
    outline: 'none'
  },
  buttonDisabled: {
    cursor: 'not-allowed',
    backgroundColor: '#798df2',
    color: 'white',
    border: 'none',
    padding: 10,
    fontSize: 16,
    outline: 'none'
  },
  error: {
    alignItems: 'center',
    alignContent: 'center',
    color: 'red',
    fontSize: 12,
    height: 5,
    marginTop: -17
  }
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.formContainer}>
        <h1 style={{ color: 'grey' }}>Sign In</h1>
        <h3 style={{ color: 'grey' }}> Sign In To Your Account</h3>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
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
              <div className={classes.formFieldContainer}>
                <div className={classes.formField}>
                  <label className={classes.label} htmlFor='email'>
                    Email
                  </label>
                  <input
                    className={classes.input}
                    type='email'
                    name='email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <div className={classes.error}>
                    {errors.email && touched.email && errors.email}
                  </div>
                </div>

                <div className={classes.formField}>
                  <label className={classes.label} htmlFor='password'>
                    Password
                  </label>
                  <input
                    className={classes.input}
                    type='password'
                    name='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <div className={classes.error}>
                    {errors.password && touched.password && errors.password}
                  </div>
                </div>
                <button
                  className={
                    !isValid || isSubmitting
                      ? classes.buttonDisabled
                      : classes.button
                  }
                  type='submit'
                  disabled={!isValid || isSubmitting}
                >
                  SIGN IN
                </button>
              </div>
            </form>
          )}
        </Formik>
        <h4 style={{ color: 'grey' }}>
          Don't have an account? <Link to='/register'>REGISTER</Link>
        </h4>
      </div>
    </div>
  );
};

export default Login;
