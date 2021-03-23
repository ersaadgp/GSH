import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = {
  Paper: {
    textAlign: 'left',
    margin: '0 1rem 0 1rem',
    minHeight: '25rem',
    padding: '1rem',
    borderRadius: '1rem',
  },
};

function Card(props) {
  const drop = (e) => {
    e.preventDefault();
    const taskID = e.dataTransfer.getData('taskID');

    const task = document.getElementById(taskID);
    task.style.display = 'block';

    props.onUpdate(taskID, props.status);

    e.target.appendChild(task);
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  return (
    <Paper
      id={props.id}
      onDrop={drop}
      onDragOver={dragOver}
      className={props.classes.Paper}
      elevation={3}
    >
      {props.children}
    </Paper>
  );
}

export default withStyles(styles)(Card);
