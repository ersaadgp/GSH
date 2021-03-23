import React from 'react';
import Data from '../../ProjectHistory/backlogList';
import Task from '../../ProjectHistory/task';
import Info from '../../ProjectHistory/projectInfo';
import User from '../../ProjectHistory/user';
import Navbar from '../../Navigation/NavbarAdmin';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  Paper: {
    textAlign: 'center',
    margin: '0rem 0rem 0rem 0rem',
    minHeight: '19rem',
    width: '60rem',
    padding: '0.5rem',
    borderRadius: '1rem',
  },
  Paper2: {
    textAlign: 'center',
    margin: '2.5rem 2.5rem 0 2.5rem',
    borderRadius: '1rem',
  },
  container: {
    margin: '2rem 0 1rem 0',
  },
  Header: {
    margin: '1rem',
  },
});

export default function ProjectDetail(props) {
  const classes = useStyles();

  return (
    <>
      <Navbar></Navbar>
      <Container style={{ maxWidth: '1600px' }}>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
          item
          xs={12}
          className={classes.container}
        >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            item
            xs={8}
          >
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              item
              xs={12}
            >
              <Grid item xs={4} elevation={3}>
                <div className={classes.Paper2}>
                  <Typography
                    variant="h5"
                    align="center"
                    className={classes.Header}
                  >
                    Backlog List
                  </Typography>
                  <Data projectID={props.match.params.projectID}></Data>
                </div>
              </Grid>
              <Grid item xs={8} elevation={3}>
                <div className={classes.Paper2}>
                  <Typography
                    variant="h5"
                    align="center"
                    className={classes.Header}
                  >
                    Task List
                  </Typography>
                  <Task projectID={props.match.params.projectID}></Task>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.Paper} elevation={3}>
                <Typography
                  variant="h5"
                  align="center"
                  className={classes.Header}
                >
                  Sprint and Retrospective
                </Typography>
                <User projectID={props.match.params.projectID}></User>
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            item
            xs={4}
          >
            <Info projectID={props.match.params.projectID}></Info>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
