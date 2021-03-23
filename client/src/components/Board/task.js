import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Divider } from '@material-ui/core';

const styles = {
  Paper: {
    textAlign: 'center',
    margin: '0 0 1rem 0',
    width: '100%',
    maxHeight: '5rem',
    minWidth: '20rem',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    color: 'white',
  },
  contain: {
    fontSize: '12px',
  },
};

function Task(props) {
  const dragStart = (e) => {
    const target = e.target;

    e.dataTransfer.setData('taskID', target.id);
  };

  const dragOver = (e) => {
    e.stopPropagation();
  };

  const date = new Date(props.taskDueDate);
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
  const taskDueDate = `${
    month[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

  return (
    <div
      id={props.id}
      className={props.className}
      draggable={props.draggable}
      onDragStart={dragStart}
      onDragOver={dragOver}
    >
      <Card className={props.classes.Paper} style={props.style} elevation={3}>
        <div className={props.classes.contain}>Due Date : {taskDueDate}</div>
        <Divider></Divider>

        <h6>{props.children}</h6>
      </Card>
    </div>
  );
}

export default withStyles(styles)(Task);
