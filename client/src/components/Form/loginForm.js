import React from 'react';
import { Button, Input, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  Paper: {
    textAlign: 'center',
    margin: '2rem',
    height: '28rem',
    width: '25rem',
    padding: '3rem',
    borderRadius: '.5rem',
  },
  Input: {
    margin: '1rem',
    width: '15rem',
  },
  Button: {
    margin: '2rem',
    width: '10rem',
  },
}));

const AuthComponent = (props) => {
  const classes = useStyles();

  const [identifier, setIdentifier] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleIdentifierChange = (event) => {
    setIdentifier(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({ password, identifier });
  };

  return (
    <Paper className={classes.Paper} elevation={3}>
      <h2 variant="bold">G S H</h2>
      <hr></hr>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Input
          className={classes.Input}
          placeholder="Email or Username"
          id="standard-basic"
          label="identifier"
          size="small"
          value={identifier}
          onChange={handleIdentifierChange}
        />
        <Input
          className={classes.Input}
          placeholder="Password"
          type="password"
          id="standard-basic"
          label="password"
          size="small"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
        />
        <Button
          type="submit"
          className={classes.Button}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Log In
        </Button>
      </form>
      <hr></hr>
      Have an account? <Link to="/register">Sign Up</Link>
    </Paper>
  );
};

export default AuthComponent;
