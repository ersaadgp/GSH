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

  const fetchFinishedProjects = () => {
    return async (dispatch) => {
      await apis
        .get('project/finished')
        .then((response) => {
          dispatch({
            type: actionTypes.FETCH_PROJECTS_FINISHED,
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
    dispatch(fetchFinishedProjects());
    dispatch(fetchProductOwnerProjectTeam());
  }, [props.userid]);

  const renderProjectLink = (projectID, projectName) => {
    const link = `history/${projectID}`;
    return <Link to={link}>{projectName}</Link>;
  };

  const renderItemList = (project) => {
    const date = new Date(project.projectEndDate);
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
            {renderProjectLink(project.projectID, project.projectName)}
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

  if (!Object.keys(projects).length)
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.fullHeight}
      >
        There's no finished project for now
      </Grid>
    );
  else
    return (
      <>
        <h2 style={{ margin: '1rem 0' }}>History Project</h2>
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
