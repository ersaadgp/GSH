import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../apis';
import apis from '../../../apis';
import actionTypes from '../../../constant/action-types';
import history from '../../../history';

import ErrorIcon from '@material-ui/icons/Error';
import Popover from '../../Popover';
import Grid from '@material-ui/core/Grid';
import LoginCard from '../../Form/loginForm';
import LogoMain from '../../../assets/GSH-Main.png';
import Navbar from '../../Navigation';

function LoginPage() {
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

  const logIn = (formData) => {
    return async (dispatch) => {
      await apis
        .post('/auth/login', formData)
        .then((res) => {
          setToken(res.data.token);
          dispatch({
            type: actionTypes.LOG_IN,
            payload: res.data,
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

  const handleSubmit = (formData) => {
    dispatch(logIn(formData));
  };

  return (
    <>
      <Navbar />
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={6}>
          <img src={LogoMain} width={600} alt="gsh logo large" />
        </Grid>
        <Grid item xs={4}>
          <LoginCard onSubmit={handleSubmit} />
        </Grid>
      </Grid>
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

export default LoginPage;
