import React, { useEffect } from 'react';

import { Container, Divider, Grid, Paper } from '@material-ui/core';

import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import apis from '../../apis';
import actionType from '../../constant/action-types';

const useStyles = makeStyles({
  table: {},
  container: {
    margin: '3rem 0 0 0',
  },
  fullHeight: {
    height: '100%',
  },
});

export default function ListProject(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const projects = useSelector((state) => Object.values(state.projects));

  const fetchProjects = () => {
    let str = '';
    if (props.usertype === 'admin') str = '/project/active';
    else str = `/project/` + props.userid;
    return async (dispatch) => {
      await apis
        .get(str)
        .then((response) => {
          dispatch({
            type: actionType.FETCH_PROJECTS,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  useEffect(() => {
    dispatch(fetchProjects());
  }, [props.userid]);

  const renderItemList = (project) => {
    if (props.usertype === 'admin') {
      return (
        <>
          <TableCell component="th" scope="row">
            project.projectName
          </TableCell>
          <TableCell scope="row">{project.projectEstEndDate}</TableCell>
        </>
      );
    } else {
      return (
        <>
          <TableCell component="th" scope="row">
            <Link to={`/MainBoard/${project.projectID}`}>
              {project.projectName}
            </Link>
          </TableCell>
          <TableCell scope="row">{project.projectEstEndDate}</TableCell>
        </>
      );
    }
  };

  const renderPageTitle = () => {
    if (props.usertype === 'admin')
      return <h2 style={{ margin: '1rem 0' }}>Active Project</h2>;
    return <h2 style={{ margin: '1rem 0' }}>My Project</h2>;
  };

  if (!Object.keys(projects).length)
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.fullHeight}
      >
        There's no active project for now
      </Grid>
    );
  else
    return (
      <>
        {renderPageTitle()}
        <Divider />
        <Container className={classes.container}>
          <TableContainer component={Paper} className={classes.table}>
            <Table
              stickyHeader
              className={classes.table}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Project Name</TableCell>
                  <TableCell>Project Due Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((project) => renderItemList(project))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </>
    );
}
