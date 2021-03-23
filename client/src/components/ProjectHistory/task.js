import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import apis from '../../apis';
import actionTypes from '../../constant/action-types';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 375,
    height: '28vh',
  },
  cell: {
    padding: '1rem',
  },
});

export default function TaskList({ projectID }) {
  const classes = useStyles();
  const tasks = useSelector((state) => Object.values(state.task));

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const users = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fetchProjectTask = (projectId) => {
    return async (dispatch) => {
      await apis
        .get(`/task/${projectId}`)
        .then((response) => {
          dispatch({
            type: actionTypes.FETCH_PROJECT_TASK,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  useEffect(() => {
    dispatch(fetchProjectTask(projectID));
  }, [users.userID]);

  if (!Object.keys(tasks).length) return <div>Nothing on Task</div>;
  else
    return (
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Task Name</TableCell>
                <TableCell align="left">PIC</TableCell>
                <TableCell align="left">Duration</TableCell>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={task.taskID}
                  >
                    <TableCell className={classes.cell}>
                      {task.description}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {task.userName}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {`${task.duration} Hours`}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {formatDate(task.startDate)}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {formatDate(task.endDate)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
}
