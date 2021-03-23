import React, { useEffect } from 'react';
import {
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Select,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

import { makeStyles } from '@material-ui/core/styles';
import apis from '../../apis';
import actionTypes from '../../constant/action-types';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {
    padding: '2rem 12rem',
  },
  container: {
    maxHeight: '45vh',
  },
  Paper: {
    width: '100%',
    textAlign: 'center',
    margin: '2rem 0',
    maxHeight: '50rem',
    padding: '2rem 3rem 2rem 3rem',

    borderRadius: '2rem',
  },
  Button: {
    margin: '2rem 1rem 1rem 1rem',
    width: '8rem',
    backgroundColor: '#7189BF',
    color: 'white',
  },
  textField: {
    width: '15rem',
    paddingRight: '3rem',
  },
  deleteButton: {
    width: '3rem',
  },
}));

export default function StickyHeadTable({ projectId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const projectTeams = useSelector((state) => Object.values(state.projectTeam));

  const fetchProjectTeam = (projectId) => {
    return async (dispatch) => {
      await apis
        .get(`/users/project/${projectId}`)
        .then((response) => {
          dispatch({
            type: actionTypes.FETCH_PROJECT_TEAM,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  const updateProjectTeam = (formData) => {
    return async (dispatch) => {
      await apis
        .patch(`/project/team/${projectId}`, formData)
        .then((response) => {
          dispatch({
            type: actionTypes.UPDATE_PROJECT_TEAM,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  const deleteProjectTeam = (formData) => {
    return async (dispatch) => {
      await apis
        .patch(`/project/team`, formData)
        .then((response) => {
          dispatch({
            type: actionTypes.DELETE_PROJECT_TEAM,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  const handleRoleChange = (event, projectTeam) => {
    const lvAccess = event.target.value;
    const userID = projectTeam.userID;

    dispatch(updateProjectTeam({ lvAccess, userID, projectID: projectId }));
  };

  const handleDeleteDevTeam = (event, projectTeam) => {
    event.preventDefault();
    const userID = projectTeam.userID;
    const projectID = projectId;
    dispatch(deleteProjectTeam({ userID, projectID }));
  };

  useEffect(() => {
    dispatch(fetchProjectTeam(projectId));
  }, [projectId]);

  return (
    <div className={classes.root}>
      <h2>Edit Member</h2>
      <br />
      <Paper className={classes.Paper}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
              {projectTeams.map((projectTeam) => {
                const userID = projectTeam.userID;
                return (
                  <TableRow hover role="checkbox" key={userID} tabIndex={-1}>
                    <TableCell className={classes.deleteButton}>
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        onClick={(event) =>
                          handleDeleteDevTeam(event, projectTeam)
                        }
                      >
                        <CancelIcon color="secondary"></CancelIcon>
                      </IconButton>
                    </TableCell>
                    <TableCell align="left">{projectTeam.userName}</TableCell>
                    <TableCell align="left" className={classes.textField}>
                      <Select
                        className={classes.role}
                        placeholder="Role"
                        value={projectTeam.lvAccess}
                        onChange={handleRoleChange}
                      >
                        <MenuItem value={'04'}>Programmer</MenuItem>
                        <MenuItem value={'03'}>Reviewer</MenuItem>
                      </Select>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
