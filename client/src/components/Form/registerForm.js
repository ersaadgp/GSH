import React from 'react';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  Paper: {
    textAlign: 'center',
    margin: '2rem',
    height: '32rem',
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

export default function SignupForm(props) {
  const classes = useStyles();
  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChangeUsername = (event) => {
    setUserName(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({ userName, password, email });
  };

  return (
    <Paper className={classes.Paper} elevation={3}>
      <h3>GSH</h3>
      <hr />
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Input
          className={classes.Input}
          placeholder="Username"
          inputProps={{ 'aria-label': 'username' }}
          onChange={handleChangeUsername}
        />
        <Input
          className={classes.Input}
          placeholder="Email"
          inputProps={{ 'aria-label': 'description' }}
          onChange={handleChangeEmail}
        />
        <Input
          className={classes.Input}
          placeholder="Password"
          type="password"
          inputProps={{ 'aria-label': 'password' }}
          onChange={handlePasswordChange}
        />
        <Button
          type="submit"
          className={classes.Button}
          variant="contained"
          color="primary"
        >
          Sign up
        </Button>
      </form>
      <hr />
      Have an account?
      <Link to="/login">Log in</Link>
    </Paper>
  );
}
