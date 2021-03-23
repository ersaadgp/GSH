import React, { useEffect } from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import apis from '../../apis';
import actionTypes from '../../constant/action-types';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#fff',
    boxShadow: '50%',
  },
  paper: {
    borderRadius: '5rem',
    padding: '3rem',
    margin: '3rem',
    height: '75vh',
    maxHeight: 900,
    width: '30rem',
  },
  container: {
    maxHeight: '50vh',
    margin: '1rem',
  },
  cell: {
    padding: 0,
    margin: 0,
    height: '2rem',
  },
});

function Taskete(props) {
  const renderTask = (task, props) => {
    if (task.userStoryID === props.taskid) {
      return (
        <TableRow hover role="checkbox" tabIndex={-1} key={task.taskid}>
          <TableCell key={task.taskID} align="left">
            {task.description}
          </TableCell>
        </TableRow>
      );
    }
  };
  const classes = useStyles();

  const dispatch = useDispatch();
  const sprintID = props.sprintid;

  const tasks = useSelector((state) => Object.values(state.task));

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

  useEffect(() => {
    if (sprintID) {
      dispatch(fetchTask(sprintID));
    }
  }, [sprintID]);

  return (
    <div>
      <Paper className={classes.paper}>
        <Typography variant="h5" align="center">
          Task List
        </Typography>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
              {tasks.map((task) => {
                return renderTask(task, props);
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default Taskete;
