import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MemberList from './memberList';

const useStyles = makeStyles(() => ({
  Paper: {
    textAlign: 'center',
    margin: '2rem',
    width: '50rem',
    padding: '3rem 5rem 2rem 5rem',

    borderRadius: '2rem',
  },
  Input: {
    marginTop: '2rem',
    width: '24rem',
  },
  Button: {
    margin: '2rem 1rem 2rem 1rem',
    width: '8rem',
  },
  TextField: {
    marginTop: '2rem',
  },
}));

export default function SignupForm() {
  const classes = useStyles();
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Paper className={classes.Paper} elevation={3}>
        <h2>Edit Project Member</h2>

        <hr />

        <MemberList />
      </Paper>
    </Grid>
  );
}
