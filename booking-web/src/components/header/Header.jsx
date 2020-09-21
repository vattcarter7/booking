import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CssBaseline, AppBar, Toolbar, Typography } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { makeStyles } from '@material-ui/core/styles';
import { DRAW_WIDTH } from '../../utils/misc';
import { toggleMobileDrawerHidden } from '../../redux/drawer/drawerAction';

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${DRAW_WIDTH}px)`,
      marginLeft: DRAW_WIDTH
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { initialized } = useSelector((state) => state.app);

  return (
    <Fragment>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={() => dispatch(toggleMobileDrawerHidden())}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Booking App
          </Typography>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Header;
