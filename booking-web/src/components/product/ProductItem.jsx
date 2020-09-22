import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 230,
    maxWidth: 235,
    minHeight: 240,
    maxHeight: 245,
    margin: 10
  },
  cartAction: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#8d8f91',
    cursor: 'pointer',
    color: 'white'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  price: {
    marginRight: 10
  }
}));

const ProductItem = ({ id, name, price, image }) => {
  const classes = useStyles();

  return (
    <Card key={id} className={classes.root}>
      <CardMedia className={classes.media} image={image} title={name} />
      <CardContent className={classes.cardContent}>
        <Typography variant='subtitle2' component='subtitle2'>
          {name}
        </Typography>
        <Typography variant='subtitle1' color='textSecondary'>
          ${price}
        </Typography>
      </CardContent>
      <CardActions className={classes.cartAction} disableSpacing>
        <Typography variant='subtitle2' component='subtitle2'>
          ADD TO CART
        </Typography>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
