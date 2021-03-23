import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Navbar from '../../Navigation/NavbarDevTeam';
import SprintBoard from '../../Board/index';
import SprintBoardDev from '../../Board/indexDev';
import SprintBoardRev from '../../Board/indexRev';
import SprintMenu from '../../Board/sprintMenus';
import { useDispatch, useSelector } from 'react-redux';
import apis from '../../../apis';
import actionTypes from '../../../constant/action-types';
import history from '../../../history';

function MainBoard(props) {
  const dispatch = useDispatch();
  const sprint = useSelector((state) => Object.values(state.sprint));
  const users = useSelector((state) => state.auth);

  const fetchSprint = (projectId) => {
    return async (dispatch) => {
      await apis
        .get(`/sprint/project/${projectId}`)
        .then((response) => {
          if (!response.data.length)
            history.push(`/sprint-planning/${projectId}`);
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

  const fetchLevelAccess = (projectId) => {
    return async (dispatch) => {
      await apis
        .get(`/project/access/${projectId}/${users.userID}`)
        .then((response) => {
          dispatch({
            type: actionTypes.FETCH_LEVEL_ACCESS,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  useEffect(() => {
    dispatch(fetchSprint(props.match.params.projectId));
    dispatch(fetchLevelAccess(props.match.params.projectId));
  }, [users.userID]);

  const renderBoard = () => {
    if (users.lvAccess === '02' || users.lvAccess === '01') {
      return <SprintBoard sprint={sprint} />;
    } else if(users.lvAccess === '03'){
      return <SprintBoardRev sprint={sprint} />;
    } else return <SprintBoardDev sprint={sprint} />
  };

  const renderSprintMenu = () => {
    if (users.lvAccess === '02' || users.lvAccess === '01') {
      return (
        <SprintMenu projectId={props.match.params.projectId} sprint={sprint} />
      );
    }
  };

  if (!sprint.length) return <div>Loading...</div>;
  return (
    <>
      <Navbar />
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={6}>
          <Typography
            variant="h4"
            align="center"
            style={{ margin: '2rem 0 1rem 0' }}
          >
            Sprint Board
            {renderSprintMenu()}
          </Typography>

          <Divider></Divider>
        </Grid>
      </Grid>
      {renderBoard()}
    </>
  );
}

export default MainBoard;
