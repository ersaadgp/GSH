import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper, TextField } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  Paper: {
    textAlign: 'center',
    minWidthL: 700,
    width: '50rem',
    padding: '1rem 2rem 1rem 2rem',

    borderRadius: '1rem',
  },
  Input: {
    marginTop: '1rem',
    width: '28rem',
  },
  Button: {
    margin: '1rem',
    width: '8rem',
  },
}));

const CreateProductBacklog = (props) => {
  const classes = useStyles();

  const [description, setDescription] = React.useState('');

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({ projectID: props.projectId, description });
    setDescription('');
  };

  return (
    <>
      <Grid
        className={classes.gridHeight}
        container
        direction="row"
        justify="center"
      >
        <Paper className={classes.Paper} elevation={3}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              className={classes.Input}
              placeholder="New Product Backlog"
              value={description}
              onChange={handleDescriptionChange}
            ></TextField>
            <Button
              type="submit"
              className={classes.Button}
              variant="contained"
              color="primary"
            >
              Add
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default CreateProductBacklog;
