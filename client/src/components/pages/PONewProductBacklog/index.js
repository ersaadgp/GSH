import React from 'react';
import { Container } from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import Navbar from '../../Navigation/NavbarDevTeam';
import Form from '../../../components/Form/newProductBacklog';

import apis from '../../../apis';
import actionTypes from '../../../constant/action-types';
import history from '../../../history';

function CreateProductBacklog(props) {
  const dispatch = useDispatch();

  const createNewProductBacklog = (formData) => {
    return async (dispatch) => {
      await apis
        .post('/product-backlog-Item', formData)
        .then((response) => {
          dispatch({
            type: actionTypes.ADD_PBITEM,
            payload: response.data,
          });

          history.push(`/product-backlog/${props.match.params.projectId}`);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  const handleSubmit = (formData) => {
    dispatch(createNewProductBacklog(formData));
  };

  return (
    <>
      <Navbar></Navbar>
      <Container>
        <Form
          onSubmit={handleSubmit}
          projectId={props.match.params.projectId}
        />
      </Container>
    </>
  );
}

export default CreateProductBacklog;
