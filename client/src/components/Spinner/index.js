import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  gridHeight: {
    height: '100%',
  },
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <Grid
      className={classes.gridHeight}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={1} sm={1} md={1}>
        <Box display="flex" width="100%" justifyContent="center">
          <CircularProgress />
        </Box>
      </Grid>
    </Grid>
  );
}
