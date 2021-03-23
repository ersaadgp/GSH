import React from 'react';
import { Container } from 'react-bootstrap';

import Divider from '@material-ui/core/Divider';
import Navbar from '../../Navigation/NavbarAdmin';
import NavbarDev from '../../Navigation/NavbarDevTeam';
import ProductBacklog from '../../DataList/productBacklog';
import Form from '../../Form/newProductBacklog';

import { useSelector, useDispatch } from 'react-redux';

import apis from '../../../apis';
import history from '../../../history';
import actionTypes from '../../../constant/action-types';
import { Button, Grid } from '@material-ui/core';

export default function ProductBacklogPage(props) {
  const users = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const projectID = props.match.params.projectId;

  const createProject = (formData) => {
    return async (dispatch) => {
      await apis
        .post('/product-Backlog-Item', formData)
        .then((res) => {
          dispatch({
            type: actionTypes.ADD_PBITEM,
            payload: res.data,
          });

          history.push(`/product-backlog/${props.match.params.projectId}`);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  const endProject = (projectID) => {
    return async (dispatch) => {
      await apis
        .patch(`/project/${projectID}`)
        .then((response) => {
          dispatch({
            type: actionTypes.PATCH_PROJECT_END,
            payload: response.data,
          });
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  const handleEndProject = (projectID) => {
    dispatch(endProject(projectID));
  };

  const handleSubmit = (formData) => {
    dispatch(createProject(formData));
  };

  const renderNavbar = () => {
    return users.userType === 'admin' ? <Navbar /> : <NavbarDev />;
  };

  return (
    <>
      {renderNavbar()}
      <Container>
        <Grid container alignItems="flex-end">
          <Grid item xs={9}>
            <h2 style={{ margin: '3rem 10rem 1rem 10rem' }}>Project List</h2>
          </Grid>
          <Grid item xs={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                margin: '1rem 0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#DF7599',
                color: 'white',
              }}
              onClick={() => handleEndProject(projectID)}
            >
              End Project
            </Button>
          </Grid>
        </Grid>
        <Divider />
        <ProductBacklog
          projectId={props.match.params.projectId}
          usertype={users.userType}
          userid={users.userID}
        />

        <Form
          onSubmit={handleSubmit}
          projectId={props.match.params.projectId}
        ></Form>
      </Container>
    </>
  );
}
