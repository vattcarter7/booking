import React, { Fragment } from 'react';
import { CssBaseline, AppBar, Toolbar, Typography } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { makeStyles } from '@material-ui/core/styles';
import { DRAW_WIDTH } from '../../utils/misc';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: DRAW_WIDTH,
      flexShrink: 0
    }
  },
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
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: DRAW_WIDTH
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

const Header = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={() => {}}
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
