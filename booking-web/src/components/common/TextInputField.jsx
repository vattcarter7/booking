import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 'center',
    alignItems: 'center',
    marginLeft: 15,
    borderTop: '1px solid #f7f7f5',
    '&:first-of-type': {
      borderTop: 'none'
    }
  },
  label: {
    width: '20%',
    minWidth: 70,
    padding: '11px 0',
    color: '#757574',
    overflow: 'hidden',
    fontSize: 16,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  input: {
    fontSize: 16,
    width: '100%',
    padding: '11px 15px 11px 8px',
    color: 'grey',
    backgroundCcolor: 'transparent',
    border: 'none',
    outline: 'none'
  }
}));

const TextInputField = ({ label, type, name, placeholder }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <label className={classes.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={classes.input}
        name={name}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInputField;
