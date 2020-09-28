import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));

const AppButton = ({
  title,
  onClick,
  color = 'primary',
  variant = 'outlined'
}) => {
  const classes = useStyles();
  return (
    <div>
      <Button onClick={onClick} variant={variant} color={color}>
        {title}
      </Button>
    </div>
  );
};

export default AppButton;
