import React, { Fragment } from 'react';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button
} from '@material-ui/core';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: 'wrap'
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  }
}));

const Header = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <CssBaseline />
      <AppBar
        position='static'
        color='default'
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant='h6'
            color='inherit'
            noWrap
            className={classes.toolbarTitle}
          >
            Booking
          </Typography>

          <Link to='/login'>
            <Button color='primary' variant='outlined' className={classes.link}>
              Login
            </Button>
          </Link>
          <Link to='/register'>
            <Button color='primary' variant='outlined' className={classes.link}>
              Register
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Header;
