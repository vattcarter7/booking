import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import { getAllCategories } from '../../redux/category/categoryAction';

import { DRAW_WIDTH } from '../../utils/misc';
import { toggleMobileDrawerHidden } from '../../redux/drawer/drawerAction';

const useStyles = makeStyles((theme) => ({
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

const CustomDrawer = (props) => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);
  const { showMobileDrawer } = useSelector((state) => state.drawer);
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  if (loading) return <p>Loading...</p>;

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      {categories.results.length > 0 && !loading && (
        <List>
          <ListItem button>
            <ListItemText primary='All Categories' />
          </ListItem>
          {categories.results.map((category) => (
            <ListItem
              button
              // TODO: fetch products by category
              onClick={() => console.log('Clicked')}
              key={category.id}
            >
              <ListItemText
                primary={
                  // Make the first letter upper case
                  category.name.charAt(0).toUpperCase() + category.name.slice(1)
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label='mailbox folders'>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation='css'>
        <Drawer
          container={container}
          variant='temporary'
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={showMobileDrawer}
          onClose={() => dispatch(toggleMobileDrawerHidden())}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation='css'>
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant='permanent'
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default CustomDrawer;
