import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: 300,
    maxWidth: 305,
    minHeight: 380,
    maxHeight: 505,
    margin: 10
  },
  cartAction: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  price: {
    marginRight: 10
  }
}));

const ProductItem = ({ id, name, description, price, image }) => {
  const classes = useStyles();

  return (
    <Card key={id} className={classes.root}>
      <CardHeader title={name} />
      <CardMedia className={classes.media} image={image} title={name} />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cartAction} disableSpacing>
        <IconButton aria-label='shop'>
          <AddShoppingCartOutlinedIcon />
        </IconButton>
        <span className={classes.price}>${price}</span>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
