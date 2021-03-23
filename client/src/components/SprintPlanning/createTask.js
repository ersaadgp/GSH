import React, { useEffect } from 'react';
import { Button, Grid, MenuItem, Paper, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import apis from '../../apis';
import actionTypes from '../../constant/action-types';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#fff',
    boxShadow: '50%',
  },
  Paper: {
    textAlign: 'center',
    minWidth: 700,
    width: '65rem',
    padding: '2rem 1.5rem 2rem 1.5rem',

    borderRadius: '3rem',
  },
  container: {
    maxHeight: '50vh',
    margin: '1rem',
  },
  action: {},
  Input1: {
    marginRight: '1rem',
    width: '20rem',
  },
  Input2: {
    marginRight: '1rem',
    width: '6rem',
  },
  Input3: {
    marginRight: '1rem',
    width: '10rem',
  },
  Button: {
    margin: '1rem 1rem 0 1rem',
    width: '8rem',
  },
  Badge: {
    margin: '0 0 1.5rem 0',
  },
};

function TaskModal(props) {
  const [description, setDescription] = React.useState('');
  const [scope, setScope] = React.useState('');
  const [pic, setPIC] = React.useState('');
  const [reviewer, setReviewer] = React.useState('');
  const [dueDate, setDueDate] = React.useState('');
  const dispatch = useDispatch();
  const userStoryByID = useSelector((state) => Object.values(state.userStory));
  const projectTeam = useSelector((state) => Object.values(state.projectTeam));

  const fetchUserStorybyID = (userStoryID) => {
    return async (dispatch) => {
      await apis
        .get(`/user-story/${userStoryID}`)
        .then((response) => {
          dispatch({
            type: actionTypes.FETCH_USER_STORY_ID,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  const fetchProjectTeam = (projectID) => {
    return async (dispatch) => {
      await apis
        .get(`users/project/${projectID}`)
        .then((response) => {
          const theReviewer = response.data.filter(
            (data) => data.lvAccess === '03'
          );
          setReviewer(theReviewer[0].userID);
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
    dispatch(fetchUserStorybyID(props.usid));
  }, [props.usid]);

  useEffect(() => {
    dispatch(fetchProjectTeam(props.projectId));
  }, [props.projectId]);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleScopeChange = (event) => {
    setScope(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handlePICChange = (event) => {
    setPIC(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      userStoryID: props.usid,
      picID: pic,
      reviewerID: reviewer,
      fibonacciPoint: scope,
      dueDate,
      description,
    });
  };

  const renderTask = (us, props) => {
    if (us.userStoryID === props.usid) {
      return (
        <div className={props.classes.Badge}>User Story : {us.description}</div>
      );
    }
  };

  const picMenuItem = (member) => {
    if (member.lvAccess === '04') {
      return <MenuItem value={member.userID}>{member.userName}</MenuItem>;
    }
  };

  return (
    <div>
      <Grid
        className={props.classes.gridHeight}
        container
        direction="row"
        justify="center"
      >
        <Paper className={props.classes.Paper} elevation={3}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            {userStoryByID.map((us) => {
              return renderTask(us, props);
            })}
            <TextField
              className={props.classes.Input1}
              label="Task Description"
              value={description}
              onChange={handleDescriptionChange}
            ></TextField>
            <TextField
              className={props.classes.Input2}
              select
              label="Scope"
              value={scope}
              onChange={handleScopeChange}
            >
              <MenuItem value={1}>1 Point</MenuItem>
              <MenuItem value={2}>2 Point</MenuItem>
              <MenuItem value={3}>3 Point</MenuItem>
              <MenuItem value={5}>5 Point</MenuItem>
              <MenuItem value={8}>8 Point</MenuItem>
            </TextField>
            <TextField
              className={props.classes.Input3}
              type="date"
              label=" "
              value={dueDate}
              onChange={handleDueDateChange}
            ></TextField>
            <TextField
              className={props.classes.Input3}
              select
              label="PIC"
              value={pic}
              onChange={handlePICChange}
            >
              {projectTeam.map((member) => {
                return picMenuItem(member);
              })}
            </TextField>
            <Button
              type="submit"
              className={props.classes.Button}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Add
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
}
export default withStyles(styles)(TaskModal);
