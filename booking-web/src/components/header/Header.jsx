import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CssBaseline, AppBar, Toolbar, Button } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

import { DRAW_WIDTH } from '../../utils/misc';
import { toggleMobileDrawerHidden } from '../../redux/drawer/drawerAction';
import { logOut } from '../../redux/user/userAction';
import CartIcon from '../../components/shopping-icon/CartIcon';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'white',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${DRAW_WIDTH}px)`,
      marginLeft: DRAW_WIDTH
    }
  },
  menuButton: {
    color: 'grey',
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      alignContent: 'center',
      justifyContent: 'space-between'
    },
    [theme.breakpoints.up('sm')]: {
      alignContent: 'center',
      justifyContent: 'flex-end'
    }
  }
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <Fragment>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={() => dispatch(toggleMobileDrawerHidden())}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <CartIcon />
          {isAuthenticated ? (
            <span style={{ color: 'blue', marginRight: '20px' }}>
              <Button onClick={handleLogout} color='primary'>
                Log Out
              </Button>
            </span>
          ) : (
            <span>
              <Button color='primary'>
                {' '}
                <Link to='/login'>Log In</Link>{' '}
              </Button>
              <Button color='primary'>
                {' '}
                <Link to='/register'>Register</Link>{' '}
              </Button>
            </span>
          )}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Header;
