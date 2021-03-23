import { useDispatch } from 'react-redux';
import apis from '../../../apis';
import actionTypes from '../../../constant/action-types';

import ErrorIcon from '@material-ui/icons/Error';
import Popover from '../../Popover';
import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import Navbar from '../../Navigation/NavbarDevTeam';
import Form from '../../../components/Form/newRetrospective';

function RetrospectivePage(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [errorTitle, setErrorTitle] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createRetrospective = (formData) => {
    return async (dispatch) => {
      await apis
        .post('/sprint-retrospective/new/', formData)
        .then((res) => {
          dispatch({
            type: actionTypes.ADD_RETROSPECTIVE,
            payload: res.data,
          });
        })
        .catch((err) => {
          setErrorTitle(err.response.data.title);
          setMessage(err.response.data.message);
          handleOpen();
        });
    };
  };

  const handleSubmit = (formData) => {
    dispatch(createRetrospective(formData));
  };

  return (
    <>
      <Navbar></Navbar>
      <Container>
        <Form
          sprintID={props.match.params.sprintID}
          projectID={props.match.params.projectID}
          onSubmit={handleSubmit}
          defaultValue={''}
        />
      </Container>
      <Popover
        message={message}
        onClose={handleClose}
        visibility={open}
        title={errorTitle}
        icon={<ErrorIcon style={{ fontSize: 40 }} />}
      />
    </>
  );
}

export default RetrospectivePage;
