import { useDispatch } from 'react-redux';
import apis from '../../../apis';
import history from '../../../history';
import actionTypes from '../../../constant/action-types';

import ErrorIcon from '@material-ui/icons/Error';
import Popover from '../../Popover';
import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import Navbar from '../../Navigation/NavbarAdmin';
import Form from '../../../components/Form/newProjectForm';

function CreateProject() {
  const dispatch = useDispatch();
  const [emails, setEmails] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [errorTitle, setErrorTitle] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createProject = (formData) => {
    return async (dispatch) => {
      await apis
        .post('/project', formData)
        .then((response) => {
          dispatch({
            type: actionTypes.ADD_PROJECTS,
            payload: response.data,
          });

          history.push('/');
        })
        .catch((err) => {
          setErrorTitle(err.response.data.title);
          setMessage(err.response.data.message);
          handleOpen();
        });
    };
  };

  const changeEmailList = (email) => {
    setEmails(email);
  };

  const handleSubmit = (formData) => {
    dispatch(createProject(formData));
  };

  return (
    <>
      <Navbar></Navbar>
      <Container>
        <Form
          onSubmit={handleSubmit}
          onChangeEmail={changeEmailList}
          emails={emails}
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

export default CreateProject;
