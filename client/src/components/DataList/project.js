import React, { useEffect } from 'react';

import {
  Container,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import apis from '../../apis';
import actionTypes from '../../constant/action-types';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '3rem 0 0 0',
  },
  fullHeight: {
    height: '100%',
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default function ListProject(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const projects = useSelector((state) => Object.values(state.projects));
  const productOwner = useSelector((state) => Object.values(state.projectTeam));

  const fetchProjects = () => {
    return async (dispatch) => {
      let str = '';
      if (props.usertype === 'admin') str = '/project/active';
      else str = `/project/${props.userid}`;

      await apis
        .get(str)
        .then((response) => {
          dispatch({
            type: actionTypes.FETCH_PROJECTS,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  const fetchProductOwnerProjectTeam = () => {
    return async (dispatch) => {
      await apis
        .get(`/project/product-owner/${props.userid}`)
        .then((response) => {
          dispatch({
            type: actionTypes.FETCH_PROJECTS_PRODUCT_OWNER,
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
    dispatch(fetchProductOwnerProjectTeam());
  }, [props.userid]);

  const renderProjectLink = (projectID, projectName, productOwnerName) => {
    const link =
      productOwnerName === 'Me'
        ? `/product-backlog/${projectID}`
        : `/main-board/${projectID}`;
    return <Link to={link}>{projectName}</Link>;
  };

  const renderItemList = (project) => {
    const date = new Date(project.projectEstEndDate);
    let theProductOwner, productOwnerName;
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
    const projectDueDate = `${
      month[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;

    if (productOwner.length > 0) {
      theProductOwner = productOwner.filter(
        (po) => po.projectID === project.projectID
      );

      if (theProductOwner.length > 0) {
        if (theProductOwner[0].userID === props.userid) productOwnerName = 'Me';
        else productOwnerName = theProductOwner[0].userName;
      }
    }

    if (props.usertype === 'admin') {
      return (
        <TableRow key={project.projectID}>
          <TableCell component="th" scope="row">
            {project.projectName}
          </TableCell>
          <TableCell scope="row" align="center">
            {productOwnerName}
          </TableCell>
          <TableCell scope="row" align="center">
            {projectDueDate}
          </TableCell>
        </TableRow>
      );
    } else {
      return (
        <TableRow key={project.projectID}>
          <TableCell component="th" scope="row">
            {renderProjectLink(
              project.projectID,
              project.projectName,
              productOwnerName
            )}
          </TableCell>
          <TableCell scope="row" align="center">
            {productOwnerName}
          </TableCell>
          <TableCell scope="row" align="center">
            {projectDueDate}
          </TableCell>
        </TableRow>
      );
    }
  };

  const renderPageTitle = () => {
    if (props.usertype === 'admin')
      return <h2 style={{ margin: '1rem 0' }}>Active Project</h2>;
    return <h2 style={{ margin: '1rem 0' }}>My Project</h2>;
  };

  if (!projects.length)
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
                  <StyledTableCell>Project Name</StyledTableCell>
                  <StyledTableCell align="center">
                    Product Owner
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Project Due Date
                  </StyledTableCell>
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
