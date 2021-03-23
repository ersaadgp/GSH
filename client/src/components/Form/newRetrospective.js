import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, MenuItem, Paper, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import apis from '../../apis';
import actionTypes from '../../constant/action-types';

const useStyles = makeStyles(() => ({
  Paper: {
    textAlign: 'center',
    margin: '2rem',
    width: '50rem',
    padding: '3rem 8rem 3rem 8rem',

    borderRadius: '2rem',
  },
  Input: {
    marginTop: '1rem',
  },
  Button: {
    margin: '2rem 1rem 2rem 1rem',
    width: '8rem',
  },
  TextField: {
    marginTop: '1rem',
  },
}));

const CreateRetrospective = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [userID, setName] = React.useState('');
  const [message01, setMessage01] = React.useState('');
  const [message02, setMessage02] = React.useState('');
  const [message03, setMessage03] = React.useState('');

  const projectTeam = useSelector((state) => Object.values(state.projectTeam));

  const fetchProjectTeam = (projectID) => {
    return async (dispatch) => {
      await apis
        .get(`users/project/${projectID}`)
        .then((response) => {
          dispatch({
            type: actionTypes.FETCH_PROJECT_TEAM,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  useEffect(() => {
    dispatch(fetchProjectTeam(props.projectID));
  }, [props.projectID]);

  const renderProjectMember = (member) => {
    if (member.lvAccess === '04' || member.lvAccess === '03') {
      return <MenuItem value={member.userID}>{member.userName}</MenuItem>;
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMessage01Change = (event) => {
    setMessage01(event.target.value);
  };

  const handleMessage02Change = (event) => {
    setMessage02(event.target.value);
  };

  const handleMessage03Change = (event) => {
    setMessage03(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      userID,
      sprintID: props.sprintID,
      messageHaveToChange: message01,
      messageHaveToKeep: message02,
      messageHaveToStart: message03,
    });
    setMessage01('');
    setMessage02('');
    setMessage03('');
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Paper className={classes.Paper} elevation={3}>
        <h2>Retrospective</h2>
        <hr />
        <TextField
          className={classes.TextField}
          fullWidth
          select
          variant="outlined"
          label="Team Name"
          multiline
          defaultValue={props.defaultValue}
          value={userID}
          onChange={handleNameChange}
        >
          {projectTeam.map((member) => {
            return renderProjectMember(member);
          })}
        </TextField>
        <TextField
          className={classes.TextField}
          fullWidth
          variant="outlined"
          multiline
          defaultValue={props.defaultValue}
          rows={2}
          label="Have to Keep"
          value={message01}
          onChange={handleMessage01Change}
        />
        <TextField
          className={classes.TextField}
          fullWidth
          variant="outlined"
          multiline
          rows={2}
          label="Have to Change"
          value={message02}
          onChange={handleMessage02Change}
        />
        <TextField
          className={classes.TextField}
          fullWidth
          variant="outlined"
          multiline
          rows={2}
          label="Have to Start"
          value={message03}
          onChange={handleMessage03Change}
        />

        <Button
          variant="contained"
          style={{ width: '180px', margin: '2rem 1rem 0 1rem' }}
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Paper>
    </Grid>
  );
};

export default CreateRetrospective;
