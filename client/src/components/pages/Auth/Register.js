import { useDispatch } from 'react-redux';
import apis from '../../../apis';
import history from '../../../history';
import actionTypes from '../../../constant/action-types';

import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

import LogoMain from '../../../assets/GSH-Main.png';
import Navbar from '../../Navigation';
import Popover from '../../Popover';
import RegisterCard from '../../Form/registerForm';

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

  const register = (formData) => {
    return async (dispatch) => {
      await apis
        .post('/auth/register', formData)
        .then((res) => {
          dispatch({
            type: actionTypes.REGISTER,
            payload: res.data,
          });

          history.push('/');
        })
        .catch((err) => {
          setErrorTitle('Failed to create account');
          setMessage(err.response.data.message);
          handleOpen();
        });
    };
  };

  const handleSubmit = (formData) => {
    dispatch(register(formData));
  };

  return (
    <>
      <Navbar />
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={6}>
          <img src={LogoMain} width={600} alt="gsh logo large" />
        </Grid>
        <Grid item xs={4}>
          <RegisterCard onSubmit={handleSubmit} />
        </Grid>
      </Grid>
      <Popover
        title={errorTitle}
        message={message}
        onClose={handleClose}
        visibility={open}
      />
    </>
  );
}

export default LoginPage;
