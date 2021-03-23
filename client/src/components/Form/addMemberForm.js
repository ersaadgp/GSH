import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, MenuItem, Paper, TextField, Select } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import apis from '../../apis';
import actionTypes from '../../constant/action-types';

const useStyles = makeStyles(() => ({
  root: {
    padding: '2rem 12rem',
  },
  Paper: {
    textAlign: 'center',
    minWidthL: 700,
    width: '50rem',
    padding: '1rem 0 1rem 0',

    borderRadius: '1rem',
  },
  email: {
    marginTop: '1rem',
    width: '20rem',
    padding: '0 1rem',
  },
  dropdown: {
    marginTop: '1rem',
    width: '6rem',
  },
  Button: {
    margin: '1rem',
    width: '8rem',
  },
}));

export default function AddMember({ projectId }) {
  const classes = useStyles();
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('04');

  const dispatch = useDispatch();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const addProjectTeam = (formData) => {
    return async (dispatch) => {
      await apis
        .post('/project/team', formData)
        .then((response) => {
          dispatch({
            type: actionTypes.ADD_PROJECT_TEAM,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  const handleSubmit = () => {
    dispatch(addProjectTeam({ projectID: projectId, email, lvAccess: role }));
  };

  return (
    <>
      <div className={classes.root}>
        <h3>Add Dev. Team</h3>
        <br />
        <Paper className={classes.Paper} elevation={3}>
          <TextField
            className={classes.email}
            placeholder="Invite Member"
            value={email}
            onChange={handleEmailChange}
          ></TextField>
          <Select
            className={classes.role}
            placeholder="Role"
            value={role}
            onChange={handleRoleChange}
          >
            <MenuItem value={'04'}>Programmer</MenuItem>
            <MenuItem value={'03'}>Reviewer</MenuItem>
          </Select>
          <Button
            type="submit"
            className={classes.Button}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Add
          </Button>
        </Paper>
      </div>
    </>
  );
}
