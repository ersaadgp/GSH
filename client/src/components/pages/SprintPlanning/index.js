import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Navbar from '../../Navigation/NavbarDevTeam';
import Backlog from '../../SprintPlanning/backlogList';
import UserStory from '../../SprintPlanning/userStoryList';
import Info from '../../SprintPlanning/sprintInfo';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import apis from '../../../apis';
import actionTypes from '../../../constant/action-types';
import { useSelector, useDispatch } from 'react-redux';
const useStyles = makeStyles({
  Paper: {
    textAlign: 'center',
    margin: '1rem 0rem 1rem 0rem',
    maxHeight: '26rem',
    minHeight: '19rem',
    height: '36vh',
    width: '50rem',
    padding: '0.5rem',
    borderRadius: '1rem',
  },
  container: {
    margin: '2rem 0 1rem 0',
  },
  Button: {
    borderRadius: '2rem',
    width: '25rem',
    height: '8vh',
    backgroundColor: '#72D6C9',
    color: 'white',
  },
  Button2: {
    margin: '1.5rem 2rem',
    width: '10rem',
    color: 'white',
  },
});

export default function SprintPlanningPage(props) {
  const classes = useStyles();
  const users = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const projectId = props.match.params.projectId;

  const sprint = useSelector((state) => Object.values(state.sprint));

  const [currentSprint, setCurrentSprint] = useState('');
  const userStoryCount = 0;

  const fetchSprint = (projectId) => {
    return async (dispatch) => {
      await apis
        .get(`/sprint/ready/${projectId}`)
        .then((response) => {
          if (!response.data.length) dispatch(handleCreateSprint(projectId));
          setCurrentSprint(response.data[0].sprintID);
          dispatch({
            type: actionTypes.FETCH_SPRINTS,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  const handleCreateSprint = (projectId) => {
    return async (dispatch) => {
      await apis
        .post(`/sprint/init/${projectId}`)
        .then((response) => {
          dispatch({
            type: actionTypes.INIT_SPRINT,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  useEffect(() => {
    if (sprint.length > 0) {
      setCurrentSprint(sprint[0].sprintID);
    }
    dispatch(fetchSprint(props.match.params.projectId));
  }, [users.userID]);

  const handleSprint = (sprintID) => {
    setCurrentSprint(sprintID);
  };

  return (
    <>
      <Navbar></Navbar>
      <Container>
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
            <Grid item xs={12}>
              <div
                className={classes.Paper}
                elevation={3}
                style={{ marginBottom: '2rem' }}
              >
                <Typography variant="h5" align="center">
                  Backlog List
                </Typography>

                <Backlog
                  sprintId={currentSprint}
                  projectId={projectId}
                  usertype={users.userType}
                  userid={users.userID}
                ></Backlog>
              </div>
            </Grid>

            <Grid item xs={12}>
              <Divider></Divider>
              <div
                className={classes.Paper}
                elevation={3}
                style={{ minHeight: '0', marginTop: '1rem' }}
              >
                <Typography variant="h5" align="center">
                  User Story List
                </Typography>
                <UserStory
                  currentSprint={currentSprint}
                  onSetSprint={handleSprint}
                  projectId={props.match.params.projectId}
                ></UserStory>
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
            <Info
              projectId={props.match.params.projectId}
              userStoryCount={userStoryCount}
              sprintID={currentSprint}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
