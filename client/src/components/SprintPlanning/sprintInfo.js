import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import PeopleIcon from '@material-ui/icons/People';
import { Link } from 'react-router-dom';
import apis from '../../apis';
import actionTypes from '../../constant/action-types';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ErrorIcon from '@material-ui/icons/Error';
import Popover from '../Popover';

const useStyles = makeStyles(() => ({
  Paper: {
    textAlign: 'center',
    margin: '2rem',
    height: '31rem',
    width: '25rem',
    padding: '2rem',
    borderRadius: '2rem',
  },
  Input: {
    margin: '0.75rem',
    width: '15rem',
  },
  Button: {
    margin: '0rem 1rem',
    width: '6rem',
    color: 'white',
  },
}));

export default function SignupForm(props) {
  useEffect(() => {}, [props.userStoryCount]);

  const dispatch = useDispatch('');
  const history = useHistory();
  const classes = useStyles();

  const tasks = useSelector((state) => Object.values(state.task));
  const userStory = useSelector((state) => Object.values(state.userStory));

  const [goals, setGoals] = React.useState('');
  const [dueDate, setDueDate] = React.useState('');

  const countTask = tasks.length;
  const userStoryTask = userStory.length;
  const scope = tasks.reduce((accumulator, task) => {
    return accumulator + task.fibonacciPoint;
  }, 0);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [errorTitle, setErrorTitle] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchUserStory = (sprintID) => {
    return async (dispatch) => {
      await apis
        .get(`/user-story/sprint/${sprintID}`)
        .then((response) => {
          dispatch({
            type: actionTypes.FETCH_USER_STORY,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  const fetchTask = (sprintID) => {
    return async (dispatch) => {
      await apis
        .get(`/task/sprint/${sprintID}`)
        .then((response) => {
          dispatch({
            type: actionTypes.FETCH_TASK,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  const startSprint = (formData) => {
    return async (dispatch) => {
      await apis
        .patch('/sprint/start', formData)
        .then((response) => {
          dispatch({
            type: actionTypes.PATCH_SPRINT_START,
            payload: response.data,
          });
          history.push(`/main-board/${props.projectId}`);
        })
        .catch((err) => {
          setErrorTitle(err.response.data.title);
          setMessage(err.response.data.message);
          handleOpen();
        });
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleStartSprint({
      sprintID: props.sprintID,
      dueDate: dueDate,
      sprintGoal: goals,
    });
  };

  const handleStartSprint = (formData) => {
    dispatch(startSprint(formData));
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleGoalsChange = (event) => {
    setGoals(event.target.value);
  };

  useEffect(() => {
    if (props.sprintID) {
      dispatch(fetchTask(props.sprintID));
      dispatch(fetchUserStory(props.sprintID));
    }
  }, [props.sprintID, userStory.length, tasks.length]);

  return (
    <>
      <Paper className={classes.Paper} elevation={3}>
        <h2>
          Sprint ke - 1{' '}
          <Link to={`/edit-member/${props.projectId}`}>
            <PeopleIcon></PeopleIcon>
          </Link>
        </h2>
        <hr></hr>
        <Input
          type="date"
          className={classes.Input}
          placeholder="Sprint Due Date"
          value={dueDate}
          onChange={handleDueDateChange}
          inputProps={{ 'aria-label': 'startDate' }}
        />
        <Input
          className={classes.Input}
          placeholder="Sprint Goals"
          value={goals}
          onChange={handleGoalsChange}
          inputProps={{ 'aria-label': 'duration' }}
        />
        <Input
          className={classes.Input}
          value={`${countTask} Task`}
          inputProps={{ 'aria-label': 'totalTask' }}
          disabled
        />
        <Input
          className={classes.Input}
          value={`Scope : ${scope} point`}
          inputProps={{ 'aria-label': 'totalScope' }}
          disabled
        />
        <Input
          className={classes.Input}
          value={`${userStoryTask} User Story`}
          inputProps={{ 'aria-label': 'totalMember' }}
          disabled
        />
      </Paper>
      <Button
        className={classes.Button2}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Start Sprint
      </Button>
      <Popover
        message={message}
        onClose={handleClose}
        visibility={open}
        title={errorTitle}
        icon={<ErrorIcon style={{ fontSize: 40 }} />}
      />
    </>
  );
}
