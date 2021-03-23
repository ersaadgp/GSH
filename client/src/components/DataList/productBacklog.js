import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Paper';
import { useSelector, useDispatch } from 'react-redux';
import apis from '../../apis';
import actionTypes from '../../constant/action-types';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    height: '42vh',
  },
  container: {
    margin: '3rem 10rem 2rem 10rem',
  },
});

export default function ProductBacklog({ projectId }) {
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
    dispatch(fetchProductBacklog(projectId));
  }, [users.userID]);

  if (!Object.keys(productBacklog).length) return <div>Loading...</div>;
  else
    return (
      <Container className={classes.container}>
        <TableContainer component={Paper} className={classes.table}>
          <Table stickyHeader aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Your Product Backlog</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productBacklog.map((project) => (
                <TableRow key={project.PBItemID}>
                  <TableCell component="th" scope="row">
                    {project.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
}
