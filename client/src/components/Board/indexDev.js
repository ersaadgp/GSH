import React, { useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import apis from '../../apis';
import actionTypes from '../../constant/action-types';
import Task from './task';
import Card from './card';

export default function RenderBoards(props) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => Object.values(state.task));
  const users = useSelector((state) => state.auth);

  const updateStatus = (taskID, status) => {
    dispatch(patchTask(taskID, users.userID, status));
  };

  const patchTask = (taskID, userID, newStatus) => {
    return async (dispatch) => {
      await apis.patch('/task', { taskID, userID, newStatus });
    };
  };

  const fetchTask = () => {
    return async (dispatch) => {
      await apis
        .get(`/task/${props.sprint[0].sprintID}/${users.userID}`)
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
    dispatch(fetchTask());
  }, [props.sprint.sprintID]);

  const renderTask = (task, index) => {
    return (
      <Task
        id={task.taskID}
        key={task.taskID}
        indexArr={index}
        status={task.status}
        className="task"
        draggable="true"
        style={{ backgroundColor: '#7189BF' }}
        taskDueDate={task.dueDate}
      >
        {task.description}
      </Task>
    );
  };

  return (
    <Grid container direction="row" justify="center" alignItems="flex-start">
      <Grid item xs={3}>
        <Typography
          variant="h6"
          align="center"
          style={{ margin: '2rem 0 1rem 0' }}
        >
          To Do
        </Typography>
        <Card
          id="card-1"
          className="card"
          status="to do"
          onUpdate={updateStatus}
        >
          {tasks
            .filter((task) => task.status === 'to do')
            .map((task, index) => {
              return renderTask(task, index, 'to do');
            })}
        </Card>
      </Grid>

      <Grid item xs={3}>
        <Typography
          variant="h6"
          align="center"
          style={{ margin: '2rem 0 1rem 0' }}
        >
          On Progress
        </Typography>

        <Card
          id="card-2"
          className="card"
          status="on progress"
          onUpdate={updateStatus}
        >
          {tasks
            .filter((task) => task.status === 'on progress')
            .map((task, index) => {
              return renderTask(task, index, 'on progress');
            })}
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Typography
          variant="h6"
          align="center"
          style={{ margin: '2rem 0 1rem 0' }}
        >
          Complete
        </Typography>
        <Card
          id="card-4"
          className="card"
          status="complete"
          onUpdate={updateStatus}
        >
          {tasks
            .filter((task) => task.status === 'complete')
            .map((task) => {
              return renderTask(task, 'complete');
            })}
        </Card>
      </Grid>
    </Grid>
  );
}
