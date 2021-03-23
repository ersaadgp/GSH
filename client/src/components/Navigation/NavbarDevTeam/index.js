import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../../constant/action-types';

import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';

import Logo from '../../../assets/GSH.png';
import { unsetToken } from '../../../apis';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    marginRight: theme.spacing(10),
  },
  menuButton: {
    padding: theme.spacing(0.5, 3),
    margin: theme.spacing(0, 3),
    color: 'white',
    textDecoration: 'none !important',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: 'white',
      color: theme.palette.grey[900],
    },
  },
  navbar: {
    backgroundColor: theme.palette.grey[900],
  },
  navigationItem: {
    flexGrow: 1,
  },
  uppercase: {
    textTransform: 'uppercase',
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const logOut = () => {
    unsetToken();
    return (dispatch) => {
      dispatch({
        type: actionTypes.LOG_OUT,
      });
      dispatch({
        type: actionTypes.CLEAR_PROJECT,
      });
    };
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar className={classes.uppercase}>
          <img src={Logo} width={50} alt="gsh logo" className={classes.logo} />
          <div className={classes.navigationItem}>
            <Box display="flex">
              <Link to="/" className={classes.menuButton}>
                <Typography variant="h6">Home</Typography>
              </Link>
            </Box>
          </div>
          <div>Hai, {auth.userName}</div>
          <Link
            to="/"
            onClick={() => dispatch(logOut())}
            className={classes.menuButton}
          >
            <Typography variant="h6">Log out</Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
