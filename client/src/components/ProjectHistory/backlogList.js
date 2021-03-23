import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import apis from '../../apis';
import actionTypes from '../../constant/action-types';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 375,
    height: '28vh',
  },
  cell: {
    padding: '1rem',
  },
});

export default function BacklogList({ projectID }) {
  const classes = useStyles();
  const productBacklog = useSelector((state) =>
    Object.values(state.productBacklog)
  );

  const users = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const fetchProductBacklog = (projectId) => {
    return async (dispatch) => {
      await apis
        .get(`/product-backlog-item/project/${projectId}`)
        .then((response) => {
          dispatch({
            type: actionTypes.FETCH_PBITEM,
            payload: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  useEffect(() => {
    dispatch(fetchProductBacklog(projectID));
  }, [users.userID]);

  if (!Object.keys(productBacklog).length)
    return <div>Nothing on Product Backlog</div>;
  else
    return (
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Product Backlog Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productBacklog.map((project) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={project.PBItemID}
                  >
                    <TableCell className={classes.cell}>
                      {project.description}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
}
